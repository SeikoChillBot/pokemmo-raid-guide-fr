/* Cloudflare Pages Functions — suggestions publiques et lecture privée.
 * Stockage: liaison KV SUGGESTIONS_KV; accès admin: secret ADMIN_SUGGESTIONS_KEY.
 * Aucune donnée reçue n'est exposée dans le dépôt GitHub.
 */
const ORIGINS = new Set([
  "https://pokemmo-raids-fr.pages.dev",
  "https://seikochillbot.github.io"
]);
const CATEGORIES = new Set(["Amélioration", "Bug", "Stratégie", "Visuel", "Autre"]);
const enc = new TextEncoder();
function headers(request) {
  const origin = request.headers.get("Origin");
  const h = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store, private",
    "X-Content-Type-Options": "nosniff",
    "Vary": "Origin"
  };
  if (ORIGINS.has(origin)) {
    h["Access-Control-Allow-Origin"] = origin;
    h["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
    h["Access-Control-Allow-Headers"] = "Content-Type, X-Admin-Key";
    h["Access-Control-Max-Age"] = "600";
  }
  return h;
}
function reply(request, data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: headers(request) });
}
function allowed(request) {
  const origin = request.headers.get("Origin");
  return !origin || ORIGINS.has(origin);
}
function configured(env) {
  return Boolean(env.SUGGESTIONS_KV && env.ADMIN_SUGGESTIONS_KEY &&
    typeof env.ADMIN_SUGGESTIONS_KEY === "string" &&
    env.ADMIN_SUGGESTIONS_KEY.length >= 24);
}
async function validKey(provided, expected) {
  if (!provided || !expected) return false;
  const [a, b] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(provided)),
    crypto.subtle.digest("SHA-256", enc.encode(expected))
  ]);
  const left = new Uint8Array(a), right = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < left.length; i++) diff |= left[i] ^ right[i];
  return diff === 0;
}
export function onRequestOptions({ request }) {
  return allowed(request) ?
    new Response(null, { status: 204, headers: headers(request) }) :
    reply(request, { error: "Origine non autorisée." }, 403);
}
export async function onRequestPost({ request, env }) {
  if (!allowed(request)) return reply(request, { error: "Origine non autorisée." }, 403);
  if (!configured(env)) return reply(request,
    { error: "La boîte à suggestions n'est pas encore activée." }, 503);
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json"))
    return reply(request, { error: "Format JSON requis." }, 415);
  if (Number(request.headers.get("content-length") || 0) > 5000)
    return reply(request, { error: "Message trop long." }, 413);
  let body;
  try {
    const raw = await request.text();
    if (raw.length > 5000) return reply(request, { error: "Message trop long." }, 413);
    body = JSON.parse(raw);
  } catch (_) {
    return reply(request, { error: "Formulaire invalide." }, 400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body))
    return reply(request, { error: "Formulaire invalide." }, 400);
  // Champ invisible : ne pas donner de signal utile aux robots automatisés.
  if (typeof body.website === "string" && body.website.trim()) return reply(request, { ok: true });
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const category = typeof body.category === "string" ? body.category : "Amélioration";
  const nickname = typeof body.nickname === "string" ? body.nickname.trim() : "";
  if (message.length < 12 || message.length > 1200)
    return reply(request, { error: "Écris une suggestion entre 12 et 1 200 caractères." }, 400);
  if (!CATEGORIES.has(category))
    return reply(request, { error: "Catégorie invalide." }, 400);
  if (nickname.length > 40)
    return reply(request, { error: "Le pseudo est trop long (40 caractères maximum)." }, 400);
  const ip = request.headers.get("CF-Connecting-IP");
  let throttleKey = null;
  if (ip) {
    const buffer = await crypto.subtle.digest("SHA-256",
      enc.encode(env.ADMIN_SUGGESTIONS_KEY + ":" + ip));
    const fragment = Array.from(new Uint8Array(buffer)).slice(0, 12)
      .map(v => v.toString(16).padStart(2, "0")).join("");
    throttleKey = "cooldown:" + fragment;
    if (await env.SUGGESTIONS_KV.get(throttleKey))
      return reply(request, { error: "Merci de patienter une minute avant une autre suggestion." }, 429);
  }
  const id = String(Date.now()) + "-" + crypto.randomUUID();
  const now = new Date().toISOString();
  const item = { id, category, nickname, message, status: "pending",
    createdAt: now, updatedAt: now };
  try {
    await env.SUGGESTIONS_KV.put("suggestion:" + id, JSON.stringify(item));
  } catch (_) {
    return reply(request, { error: "Enregistrement indisponible, réessaie plus tard." }, 503);
  }
  // Le délai anti-spam commence uniquement après l'enregistrement réussi.
  // Une erreur de suivi anti-spam ne doit jamais masquer une suggestion sauvegardée.
  if (throttleKey) {
    try {
      await env.SUGGESTIONS_KV.put(throttleKey, "1", { expirationTtl: 60 });
    } catch (_) { /* suggestion déjà enregistrée */ }
  }
  return reply(request, { ok: true, id }, 201);
}
export async function onRequestGet({ request, env }) {
  if (!allowed(request)) return reply(request, { error: "Origine non autorisée." }, 403);
  if (!configured(env)) return reply(request,
    { error: "Stockage ou clé administrateur non configuré." }, 503);
  if (!(await validKey(request.headers.get("X-Admin-Key"),
    env.ADMIN_SUGGESTIONS_KEY)))
    return reply(request, { error: "Accès administrateur refusé." }, 401);
  const url = new URL(request.url);
  const cursor = url.searchParams.get("cursor");
  let listing;
  try {
    listing = await env.SUGGESTIONS_KV.list({
      prefix: "suggestion:", limit: 100, ...(cursor ? { cursor } : {})
    });
    const items = await Promise.all(listing.keys.map(async key =>
      await env.SUGGESTIONS_KV.get(key.name, { type: "json" })
    ));
    return reply(request, {
      items: items.filter(Boolean).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
      cursor: listing.list_complete ? null : listing.cursor
    });
  } catch (_) {
    return reply(request, { error: "Impossible de récupérer les suggestions." }, 503);
  }
}

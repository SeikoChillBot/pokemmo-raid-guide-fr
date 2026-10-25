/* Cloudflare Pages — statut des suggestions, réservé à l'administrateur.
 * Les visiteurs ne peuvent ni lire ni modifier une suggestion.
 */
const ORIGINS = new Set([
  "https://pokemmo-raids-fr.pages.dev",
  "https://seikochillbot.github.io"
]);
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
    h["Access-Control-Allow-Methods"] = "PATCH, DELETE, OPTIONS";
    h["Access-Control-Allow-Headers"] = "Content-Type, X-Admin-Key";
    h["Access-Control-Max-Age"] = "600";
  }
  return h;
}
function response(request, data, status=200) {
  return new Response(JSON.stringify(data), { status, headers: headers(request) });
}
function allowed(request) {
  const origin = request.headers.get("Origin");
  return !origin || ORIGINS.has(origin);
}
export function onRequestOptions({ request }) {
  return allowed(request) ?
    new Response(null, { status: 204, headers: headers(request) }) :
    response(request, { error: "Origine non autorisée." }, 403);
}
export async function onRequestPatch({ request, env, params }) {
  if (!allowed(request)) return response(request, { error: "Origine non autorisée." }, 403);
  if (!env.SUGGESTIONS_KV || typeof env.ADMIN_SUGGESTIONS_KEY !== "string" ||
    env.ADMIN_SUGGESTIONS_KEY.length < 24)
    return response(request, { error: "Accès administrateur non configuré." }, 503);
  const provided = request.headers.get("X-Admin-Key");
  if (!provided) return response(request, { error: "Authentification requise." }, 401);
  const enc = new TextEncoder();
  const [a,b] = await Promise.all([
    crypto.subtle.digest("SHA-256",enc.encode(provided)),
    crypto.subtle.digest("SHA-256",enc.encode(env.ADMIN_SUGGESTIONS_KEY))
  ]);
  const left = new Uint8Array(a), right = new Uint8Array(b);
  let different = 0;
  for(let i=0;i<left.length;i++)different|=left[i]^right[i];
  if(different!==0) return response(request, { error:"Accès administrateur refusé." }, 401);
  const id = params.id;
  if(typeof id!=="string" || !/^\d{13}-[a-f0-9-]{36}$/.test(id))
    return response(request, { error:"Identifiant invalide." }, 400);
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json"))
    return response(request, { error: "Format JSON requis." }, 415);
  let body;
  try{
    if(Number(request.headers.get("content-length")||0)>1000)
      return response(request,{error:"Requête trop longue."},413);
    const raw = await request.text();
    if(raw.length>1000)return response(request,{error:"Requête trop longue."},413);
    body=JSON.parse(raw);
  }catch(_){return response(request,{error:"Requête invalide."},400)}
  if(!body || !["pending","treated"].includes(body.status))
    return response(request,{error:"Statut invalide."},400);
  const key="suggestion:"+id;
  const item=await env.SUGGESTIONS_KV.get(key,{type:"json"});
  if(!item)return response(request,{error:"Suggestion introuvable."},404);
  item.status=body.status;
  item.updatedAt=new Date().toISOString();
  await env.SUGGESTIONS_KV.put(key,JSON.stringify(item));
  return response(request,{ok:true,item});
}

/** Permanently remove a treated suggestion. Pending suggestions cannot be deleted. */
export async function onRequestDelete({ request, env, params }) {
  if (!allowed(request)) return response(request, { error: "Origine non autorisée." }, 403);
  if (!env.SUGGESTIONS_KV || typeof env.ADMIN_SUGGESTIONS_KEY !== "string" ||
      env.ADMIN_SUGGESTIONS_KEY.length < 24)
    return response(request, { error: "Accès administrateur non configuré." }, 503);
  const provided = request.headers.get("X-Admin-Key");
  if (!provided) return response(request, { error: "Authentification requise." }, 401);
  const enc = new TextEncoder();
  const [a, b] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(provided)),
    crypto.subtle.digest("SHA-256", enc.encode(env.ADMIN_SUGGESTIONS_KEY))
  ]);
  const left = new Uint8Array(a), right = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < left.length; i++) diff |= left[i] ^ right[i];
  if (diff !== 0) return response(request, { error: "Accès administrateur refusé." }, 401);
  const id = params.id;
  if (typeof id !== "string" || !/^\\d{13}-[a-f0-9-]{36}$/.test(id))
    return response(request, { error: "Identifiant invalide." }, 400);
  const key = "suggestion:" + id;
  try {
    const item = await env.SUGGESTIONS_KV.get(key, { type: "json" });
    if (!item) return response(request, { error: "Suggestion introuvable." }, 404);
    if (item.status !== "treated") return response(request,
      { error: "Seules les suggestions traitées peuvent être supprimées." }, 409);
    await env.SUGGESTIONS_KV.delete(key);
    return response(request, { ok: true, id }, 200);
  } catch (_) {
    return response(request, { error: "Suppression momentanément indisponible." }, 503);
  }
}

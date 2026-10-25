/* RAID ATLAS — dépôt de suggestions, sans comptes utilisateurs.
 * API Cloudflare Pages. Le site GitHub Pages utilise la même API Cloudflare.
 */
(() => {
 "use strict";
 const section = document.getElementById("raid-suggestions");
 const form = document.getElementById("raid-suggestions-form");
 const toggle = document.getElementById("raid-suggestions-toggle");
 const feedback = document.getElementById("raid-suggestions-feedback");
 if (!section || !form || !toggle || !feedback) return;
 const endpoint = (location.hostname === "seikochillbot.github.io"
   ? "https://pokemmo-raids-fr.pages.dev"
   : location.origin) + "/api/suggestions";
 const submit = form.querySelector('button[type="submit"]');
 toggle.addEventListener("click", () => {
   const willShow = form.hidden;
   form.hidden = !willShow;
   toggle.setAttribute("aria-expanded", String(willShow));
   toggle.textContent = willShow ? "Masquer le formulaire" : "Déposer une suggestion";
   if (willShow) form.querySelector("select,textarea,input")?.focus();
 });
 form.addEventListener("submit", async event => {
   event.preventDefault();
   feedback.textContent = "";
   feedback.dataset.kind = "";
   const message = form.querySelector('[name="message"]').value.trim();
   const nickname = form.querySelector('[name="nickname"]').value.trim();
   const category = form.querySelector('[name="category"]').value;
   const website = form.querySelector('[name="website"]').value;
   if (message.length < 12 || message.length > 1200) {
     feedback.dataset.kind = "error";
     feedback.textContent = "Décris ton idée en 12 à 1 200 caractères.";
     return;
   }
   submit.disabled = true;
   const old = submit.textContent;
   submit.textContent = "Envoi en cours…";
   try {
     const result = await fetch(endpoint, {
       method:"POST",
       headers: { "Content-Type":"application/json" },
       body: JSON.stringify({ category, nickname, message, website }),
       mode:"cors",
       cache:"no-store"
     });
     let data={};
     try { data=await result.json(); } catch (_) {}
     if (!result.ok || !data.ok) throw new Error(
       data.error || "La boîte à suggestions est indisponible pour le moment."
     );
     form.reset();
     feedback.dataset.kind = "success";
     feedback.textContent = "Merci ! Ta suggestion a été enregistrée et sera examinée.";
   } catch (error) {
     feedback.dataset.kind = "error";
     feedback.textContent = error.message ||
       "Impossible de transmettre la suggestion. Réessaie ultérieurement.";
   } finally {
     submit.disabled = false;
     submit.textContent = old;
   }
 });
})();

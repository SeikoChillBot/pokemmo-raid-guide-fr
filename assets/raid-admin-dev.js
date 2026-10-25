/* RAID ATLAS / adminDev : espace privé des suggestions.
 * L'URL n'est pas une protection; toutes les données et modifications passent
 * par l'API Cloudflare authentifiée. Les textes visiteurs ne sont jamais HTML.
 */
(() => {
 "use strict";
 const $ = id => document.getElementById(id);
 const endpoint = (location.hostname === "seikochillbot.github.io"
   ? "https://pokemmo-raids-fr.pages.dev" : location.origin) + "/api/suggestions";
 const login = $("raid-admin-login");
 const workspace = $("raid-admin-workspace");
 const loginFeedback = $("raid-admin-login-feedback");
 const feedback = $("raid-admin-feedback");
 const pendingList = $("raid-admin-pending");
 const treatedList = $("raid-admin-treated");
 const pendingCount = $("raid-admin-pending-count");
 const treatedCount = $("raid-admin-treated-count");
 const totalCount = $("raid-admin-total-count");
 const moreBtn = $("raid-admin-more");
 if (!login || !workspace) return;
 const storageKey = "raid-atlas-admin-secret-tab-v1";
 let token = "";
 let items = [];
 let cursor = null;
 let busy = false;
 const say = (element, message) => { element.textContent = message; };
 const errorMessage = data => data?.error || "Une erreur est survenue.";
 function authHeaders() { return { "X-Admin-Key": token }; }
 function logout() {
   token = "";
   items = [];
   cursor = null;
   try { sessionStorage.removeItem(storageKey); } catch (_) {}
   workspace.hidden = true;
   login.hidden = false;
   login.reset();
   say(feedback, "");
 }
 async function api(url, options={}) {
   let response;
   try {
     response = await fetch(url, {
       mode:"cors", cache:"no-store",
       ...options,
       headers:{ ...authHeaders(), ...(options.headers || {}) }
     });
   } catch (_) {
     throw new Error("Connexion au serveur indisponible. Vérifie l'activation Cloudflare.");
   }
   let data = {};
   try { data = await response.json(); } catch (_) {}
   if (!response.ok) {
     if (response.status === 401) {
       logout();
       throw new Error("Clé invalide ou session expirée.");
     }
     throw new Error(errorMessage(data));
   }
   return data;
 }
 function textNode(type, content, cssClass="") {
   const el = document.createElement(type);
   el.textContent = String(content ?? "");
   if (cssClass) el.className = cssClass;
   return el;
 }
 function renderItem(item) {
   const article = document.createElement("article");
   article.className = "raid-admin-item" + (item.status==="treated"?" treated":"");
   const meta = document.createElement("div");
   meta.className = "raid-admin-item-meta";
   meta.append(textNode("span",item.category||"Autre","raid-admin-item-category"));
   if (item.nickname) meta.append(textNode("span","Pseudo : "+item.nickname));
   const date = new Date(item.createdAt);
   meta.append(textNode("time",
     Number.isNaN(date.getTime())?"Date inconnue":
     date.toLocaleString("fr-FR",{dateStyle:"medium",timeStyle:"short"})));
   article.append(meta);
   article.append(textNode("p",item.message||"","raid-admin-item-message"));
   const controls = document.createElement("div");
   controls.className = "raid-admin-item-actions";
   const action = textNode("button",item.status==="pending"?
     "Marquer comme traitée" : "Réouvrir la suggestion","raid-admin-btn");
   action.type = "button";
   action.addEventListener("click",async () => {
     const next = item.status==="pending"?"treated":"pending";
     action.disabled = true;
     say(feedback,"Enregistrement du statut…");
     try {
       const data = await api(endpoint+"/"+encodeURIComponent(item.id), {
         method:"PATCH",
         headers:{ "Content-Type":"application/json" },
         body:JSON.stringify({status:next})
       });
       items = items.map(row=>row.id===item.id?data.item:row);
       render();
       say(feedback,next==="treated"?
         "Suggestion classée dans « Suggestions traitées ».":
         "Suggestion replacée dans les éléments à traiter.");
     } catch(error) {
       say(feedback,error.message);
       action.disabled = false;
     }
   });
   controls.append(action);
   if (item.status === "treated") {
     const remove = textNode("button", "Supprimer", "raid-admin-btn danger");
     remove.type = "button";
     remove.setAttribute("aria-label", "Supprimer définitivement la suggestion traitée");
     remove.addEventListener("click", async () => {
       if (!window.confirm("Supprimer définitivement cette suggestion traitée ? Cette action est irréversible.")) return;
       remove.disabled = true;
       action.disabled = true;
       say(feedback, "Suppression en cours…");
       try {
         await api(endpoint + "/" + encodeURIComponent(item.id), { method: "DELETE" });
         items = items.filter(row => row.id !== item.id);
         render();
         say(feedback, "Suggestion supprimée définitivement.");
       } catch (error) {
         say(feedback, error.message);
         remove.disabled = false;
         action.disabled = false;
       }
     });
     controls.append(remove);
   }
   article.append(controls);
   return article;
 }
 function fill(container, rows, emptyText) {
   container.replaceChildren();
   if(!rows.length) {
     container.append(textNode("p",emptyText,"raid-admin-empty"));
     return;
   }
   for(const item of rows) container.append(renderItem(item));
 }
 function render() {
   items.sort((a,b)=>String(b.createdAt||"").localeCompare(String(a.createdAt||"")));
   const pending = items.filter(row=>row.status!=="treated");
   const treated = items.filter(row=>row.status==="treated");
   pendingCount.textContent = String(pending.length);
   treatedCount.textContent = String(treated.length);
   totalCount.textContent = String(items.length)+(cursor?" +":"");
   fill(pendingList,pending,"Aucune suggestion en attente.");
   fill(treatedList,treated,"Aucune suggestion traitée pour le moment.");
   moreBtn.hidden = !cursor;
 }
 async function loadPage(append=false) {
   if(busy)return;
   busy = true;
   moreBtn.disabled = true;
   const query = append&&cursor?"?cursor="+encodeURIComponent(cursor):"";
   try {
     const data=await api(endpoint+query);
     if (!append) items=[];
     const found = new Set(items.map(x=>x.id));
     for(const row of data.items||[])if(!found.has(row.id)){items.push(row);found.add(row.id)}
     cursor=data.cursor||null;
     workspace.hidden = false;
     login.hidden = true;
     render();
     say(feedback,"");
   }catch(error){
     say(login.hidden?feedback:loginFeedback,error.message);
   }finally{
     busy=false;moreBtn.disabled=false;
   }
 }
 login.addEventListener("submit",async event=>{
   event.preventDefault();
   token=$("raid-admin-key").value.trim();
   if(!token){say(loginFeedback,"Saisis ta clé administrateur.");return}
   const submit=login.querySelector('button[type="submit"]');
   submit.disabled=true;
   say(loginFeedback,"Vérification…");
   await loadPage(false);
   if(login.hidden){
     try { sessionStorage.setItem(storageKey, token); } catch (_) {}
     say(loginFeedback,"");
   }
   submit.disabled=false;
 });
 $("raid-admin-reload").addEventListener("click",()=>loadPage(false));
 $("raid-admin-logout").addEventListener("click",logout);
 moreBtn.addEventListener("click",()=>loadPage(true));
 try {
   const saved=sessionStorage.getItem(storageKey);
   if(saved){token=saved;loadPage(false)}
 } catch (_) {}
})();

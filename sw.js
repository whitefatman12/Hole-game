const V='hole-v1',A=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.hostname==='api.anthropic.com')return;
e.respondWith(caches.match(r).then(h=>h||fetch(r).then(n=>{if(n.ok&&(u.origin===location.origin||/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname))){const c=n.clone();caches.open(V).then(x=>x.put(r,c))}return n}).catch(()=>caches.match('./index.html'))))});

/* 离线缓存（只有用 http(s) 打开时才会注册，双击 html 文件时不会生效也不报错） */
const C='task-points-v1';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith((async()=>{
    const c=await caches.open(C);
    try{
      const r=await fetch(e.request);
      if(r&&r.ok)c.put(e.request,r.clone());
      return r;
    }catch(err){
      const m=await c.match(e.request);
      if(m)return m;
      throw err;
    }
  })());
});

const cacheName = 'v1';

self.addEventListener("install", e => {
    console.log(e);
})

self.addEventListener("activate", e => {
    console.log(e)
    e.waitUntil(
        caches.keys().then(cacheNames => {
            console.log(cacheNames)
            console.log(caches)
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
})

self.addEventListener("fetch", e => {
    console.log('fetching...');
    e.respondWith(
        fetch(e.request)
            .then(res => {
                const resClone = res.clone()
                caches
                    .open(cacheName)
                    .then(cache => {
                        cache.put(e.request, resClone);
                    })
                return res;
            }).catch(err => caches.match(e.request).then(res => response))
    )
})
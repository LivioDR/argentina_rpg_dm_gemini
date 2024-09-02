const debug = true
const deployUrl = "https://termoargentarpg.vercel.app"
// This code executes in its own worker or thread
self.addEventListener("install", event => {
   if(debug){
      console.log("SW installed")
   }
   self.skipWaiting()
});
self.addEventListener("activate", event => {
   if(debug){
      console.log("And activated!")
   }
   event.waitUntil(clients.claim())
});

// adding resources from PokeAPI to the cache
self.addEventListener('fetch', event => {

   // Caching the app shell files and skipping the chrome extensions and firebase functions
   if(!(event.request.url).startsWith('chrome-extension') && 
      !(event.request.url).startsWith(`${deployUrl}/api/`) && 
      !(event.request.url).startsWith('https://firestore.googleapis') && 
      !(event.request.url).startsWith('https://generativelanguage.googleapis.com') && 
      !(event.request.url).startsWith(`${deployUrl}/_vercel/speed-insights/vitals`) &&
      !(event.request.url).startsWith(`${deployUrl}/v1/speed-insights/`)
      ){
      event.respondWith(
         caches.match(event.request.url).then(response => {
            if(response != undefined){ // match always resolves, but only if succeed it will have a value
               return response
            }
            else{
               return fetch(event.request).then(response => {
                  let clone = response.clone() // cloning the response because I will put one copy on cache and return the other one

                  caches.open('app-shell').then(cache => {
                     cache.put(event.request.url, clone) // storing the clone of the response with the request as a key
                  })
                  return response
               })
            }
         })
         .catch(e => {
            console.error(e)
         })
      )
   }

 })
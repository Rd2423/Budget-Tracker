const APP_PREFIX = "budget_tracker-";
const VERSION = "version-01";
const CACHE_NAME = APP_PREFIX + VERSION;
const DATA_CACHE_NAME = "data-cache-v1";
const FILES_TO_CACHE = [
  "./index.html",
  "./css/styles.css",
  "./js/idb.js",
  "./js/index.js",
  "./icons/icon-192x192.png",
  "./icons/icon-72x72.png",
  "./icons/icon-96x96.png",
  "./icons/icon-144x144.png",
  "./icons/icon-152x152.png",
  "./icons/icon-384x384.png",
  "./icons/icon-512x512.png",
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("installing cache: " + CACHE_NAME);
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("deleting cache : " + key);
            return caches.delete(key);
          }else {
            console.log("error")
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  e.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        console.log("responding with cache : " + event.request.url);
        return response;
      }
      return fetch(event.request);
    })
  );
});

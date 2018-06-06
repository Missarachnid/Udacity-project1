const staticCacheName = 'restaurant-cache-v1';
const toCache = [
  '/',
  './index.html',
  './restaurant.html',
  './restaurant.html?id=1',
  './restaurant.html?id=2',
  './restaurant.html?id=3',
  './restaurant.html?id=4',
  './restaurant.html?id=5',
  './restaurant.html?id=6',
  './restaurant.html?id=7',
  './restaurant.html?id=8',
  './restaurant.html?id=9',
  './restaurant.html?id=10',
  './css/styles.css',
  './js/dbhelper.js',
  './js/main.js',
  './js/restaurant_info.js',
  './data/restaurants.json',
  './img/1-800_lg.jpg',
  './img/2-800_lg.jpg',
  './img/3-800_lg.jpg',
  './img/4-800_lg.jpg',
  './img/5-800_lg.jpg',
  './img/6-800_lg.jpg',
  './img/7-800_lg.jpg',
  './img/8-800_lg.jpg',
  './img/9-800_lg.jpg',
  './img/10-800_lg.jpg',
  './img/1-400.jpg',
  './img/2-400.jpg',
  './img/3-400.jpg',
  './img/4-400.jpg',
  './img/5-400.jpg',
  './img/6-400.jpg',
  './img/7-400.jpg',
  './img/8-400.jpg',
  './img/9-400.jpg',
  './img/10-400.jpg',

];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(staticCacheName)
    .then((cache) => {
      console.log("the cache is open");
      return cache.addAll(toCache);
    }));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
    .then((res) => {
      return res || fetch(event.res);
    })
    .catch((err) => {
      console.log('Error with service worker', err);
    })
  );
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['restaurant-cache-v1'];

  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});

/* I was greatly helped with this by the old files from the "Introducing the Service Worker" lessons from earlier in the course and 
this page from Google https://developers.google.com/web/fundamentals/primers/service-workers/*/
let cacheName = 'mwsrs1',
	cacheFiles = [
		'index.html',
		'restaurant.html',
		'css/styles.css',
		'js/dbhelper.js',
		'js/main.js',
		'js/restaurant_info.js',
		'img/1.jpg',
		'img/2.jpg',
		'img/3.jpg',
		'img/4.jpg',
		'img/5.jpg',
		'img/6.jpg',
		'img/7.jpg',
		'img/8.jpg',
		'img/9.jpg',
		'img/10.jpg'
	];

self.addEventListener('install', (event) => {
	console.log('Installing cache...');
	event.waitUntil(
		caches.open(cacheName).then((cache) => {
			return cache.addAll(cacheFiles);
		})
	)
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			if(response){
				return response;
			} else {
				return fetch(event.request);
			}
		})
	)
});

self.addEventListener('activate', (event)=>{
	event.waitUntil(
		caches.keys().then((keysArr)=>{
			Promise.all(keysArr.map(key=>{
				if(key !== cacheName){
					console.log('removing old cache: ', key);
					return caches.delete(key);
				}				
			}));
		})
	);
});



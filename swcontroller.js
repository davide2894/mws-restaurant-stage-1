let cacheName = 'mwsrs1',
	cacheFiles = [
		'index.html',
		'css/styles.css',
		'js/dbhelper.js',
		'js/main.js',
		'js/restaurant_info.js'
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



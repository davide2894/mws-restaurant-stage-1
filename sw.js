/*
	Check if service worker is supported in the browser,
	If yes: 
		* register
		* if registration fails: catch error
	If not: log it to the browser's console
*/
if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('swcontroller.js')
		.then( (registration) => {
			console.log('Service Worker registered successfully', registration);
		})
		.catch( (error) => {
			console.log('Registration error: ', error);
		})
} else {
	console.log("Your browser doesn't support service workers.");
}
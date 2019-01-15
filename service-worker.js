const console = (({ log }, label) => ({
    log: (...args) => log(`%c${label}`, 'color: purple', ...args),
    error: (...args) => log(label, ...args)
}))(self.console, '[Service Worker]');

console.log('Hello world');

const CACHE_NAME = 'test-app';
const CACHED_FILES = [
    '/',
    '/scripts/@not-used-file.js',
];

// -----------------------------------------------------------------------------

self.addEventListener('install', (/* InstallEvent */ evt) => {
    console.log('Event: install', { evt });
    evt.waitUntil(handleInstall());
});

async function handleInstall() {
    // Create bin
    const cache = await caches.open(CACHE_NAME);

    // Append bin by list of files to cache
    await cache.addAll(CACHED_FILES);

    // Terminate current subscription,
    // and create new instance immediately
    return self.skipWaiting();
}

// -----------------------------------------------------------------------------

self.addEventListener('activate', (/* ExtendableEvent */ evt) => {
    console.log('Event: activate', { evt });

});

// -----------------------------------------------------------------------------

self.addEventListener('fetch', (/* FetchEvent */ evt) => {
    console.log('Event: fetch', { evt });
    evt.respondWith(handleFetch(evt));
});

async function handleFetch(evt) {
    const request = evt.request;

    // Get reference to created bin
    const cache = await caches.open(CACHE_NAME);

    // Check, that bin includes a resource
    const resource = await cache.match(request);

    // When resource is available return them
    if (resource) {
        return resource;
    }

    // Otherwise, make HTTP request
    // WARNING: clone request to create new reference
    const response = await fetch(request.clone());

    // Save response into cache, it will be use in future
    // WARNING: clone request to create new reference
    await cache.put(request, response.clone());

    // Returns fresh response
    return response;
}

// -----------------------------------------------------------------------------

self.addEventListener('message', (evt) => {
    console.log('Event: message', evt);

});

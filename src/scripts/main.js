const SERVICE_WORKER_PATH = 'service-worker.js';

async function bootstrap() {
    const isServiceWorkerFeatureEnabled = ('serviceWorker' in navigator);

    if (isServiceWorkerFeatureEnabled) {
        registerServiceWorker();
    }

    const component = new window.AppComponent();
    component.render();
}

async function registerServiceWorker() {
    try {
        await navigator.serviceWorker.register(SERVICE_WORKER_PATH);
        // console.log('OK: Service Worker installed correctly');
    } catch (err) {
        console.error('ERROR: Service Worker installation failed');
        console.error(err);
    }
}

async function unregisterServiceWorkers() {
    const registrations = await navigator.serviceWorker.getRegistrations();

    for (let registration of registrations) {
        registration.unregister();
    }
}

bootstrap().catch((err) => console.error(err));

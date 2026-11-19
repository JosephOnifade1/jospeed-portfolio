// No real messages, analytics beacons or external services during the journey tests.
export async function mockExternalServices({ page, baseURL }) {
  await page.route('**/*', (route) => {
    const url = new URL(route.request().url());
    return url.origin === new URL(baseURL).origin && !url.pathname.startsWith('/_vercel/')
      ? route.continue()
      : route.abort();
  });
  await page.addInitScript(() => {
    window.folioEvents = [];
    window.va = (type, event) => {
      if (type === 'event') window.folioEvents.push(event);
    };
  });
}

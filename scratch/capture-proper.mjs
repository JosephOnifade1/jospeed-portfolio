import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

async function main() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--hide-scrollbars',
    'http://localhost:4173/'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const tabs = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve(JSON.parse(d)));
    }).on('error', reject);
  });

  const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
  await new Promise(r => { ws.onopen = r; });

  let idCounter = 1;
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = idCounter++;
    const handler = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id === id) {
        ws.removeEventListener('message', handler);
        if (data.error) {
          console.error('CDP Error for ' + method + ':', data.error);
          reject(new Error(data.error.message));
        } else {
          resolve(data.result);
        }
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });

  await send('Page.enable');

  // 1. Desktop Screenshot (1440 x 900)
  console.log('Capturing desktop...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  await new Promise(r => setTimeout(r, 1200));

  const desktopShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:/Users/HP/.gemini/antigravity/brain/6fec37eb-7639-42fd-a1fa-be1071e93ea1/desktop-hero-preview.png', Buffer.from(desktopShot.data, 'base64'));
  console.log('Desktop captured!');

  // 2. Mobile Screenshot (390 x 844)
  console.log('Capturing mobile...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 1200));

  const mobileShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:/Users/HP/.gemini/antigravity/brain/6fec37eb-7639-42fd-a1fa-be1071e93ea1/mobile-hero-preview.png', Buffer.from(mobileShot.data, 'base64'));
  console.log('Mobile captured!');

  ws.close();
  chrome.kill();
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

async function capture() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless',
    '--remote-debugging-port=9222',
    '--hide-scrollbars',
    'http://localhost:4173/'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const tabs = await new Promise(resolve => {
    http.get('http://127.0.0.1:9222/json', res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    });
  });

  const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);

  await new Promise(r => { ws.onopen = r; });

  const send = (method, params = {}) => new Promise(resolve => {
    const id = Math.floor(Math.random() * 100000);
    const handler = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id === id) {
        ws.removeEventListener('message', handler);
        resolve(data.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
  });

  // 1. Desktop Screenshot (1440 x 900)
  console.log('Capturing desktop...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });
  await new Promise(r => setTimeout(r, 1000));
  const desktopData = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:/Users/HP/.gemini/antigravity/brain/6fec37eb-7639-42fd-a1fa-be1071e93ea1/desktop-hero-preview.png', Buffer.from(desktopData.data, 'base64'));
  console.log('Desktop captured!');

  // 2. Mobile Screenshot (390 x 844, true mobile emulation)
  console.log('Capturing mobile...');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await new Promise(r => setTimeout(r, 1000));
  const mobileData = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('C:/Users/HP/.gemini/antigravity/brain/6fec37eb-7639-42fd-a1fa-be1071e93ea1/mobile-hero-preview.png', Buffer.from(mobileData.data, 'base64'));
  console.log('Mobile captured!');

  ws.close();
  chrome.kill();
  process.exit(0);
}

capture();


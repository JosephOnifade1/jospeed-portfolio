import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

const chrome = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless',
  '--remote-debugging-port=9222',
  '--hide-scrollbars',
  'http://localhost:4173/'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9222/json', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      const tabs = JSON.parse(data);
      const wsUrl = tabs[0]?.webSocketDebuggerUrl;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        // 1. Set mobile emulation: 390 x 844, scale 2
        ws.send(JSON.stringify({
          id: 1,
          method: 'Emulation.setDeviceMetricsOverride',
          params: {
            width: 390,
            height: 844,
            deviceScaleFactor: 2,
            mobile: true
          }
        }));

        setTimeout(() => {
          // 2. Capture screenshot
          ws.send(JSON.stringify({
            id: 2,
            method: 'Page.captureScreenshot',
            params: {
              format: 'png',
              captureBeyondViewport: false
            }
          }));
        }, 1200);
      };

      ws.onmessage = (msg) => {
        const parsed = JSON.parse(msg.data);
        if (parsed.id === 2 && parsed.result?.data) {
          const buffer = Buffer.from(parsed.result.data, 'base64');
          fs.writeFileSync('C:/Users/HP/.gemini/antigravity/brain/6fec37eb-7639-42fd-a1fa-be1071e93ea1/mobile-hero-preview.png', buffer);
          console.log('Saved pixel-perfect mobile screenshot via CDP!');
          ws.close();
          chrome.kill();
          process.exit(0);
        }
      };
    });
  });
}, 2200);

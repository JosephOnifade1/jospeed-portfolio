import { spawn } from 'child_process';
import http from 'http';

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--headless',
  '--remote-debugging-port=9222',
  '--window-size=412,915',
  'http://localhost:4173/'
]);

setTimeout(() => {
  http.get('http://127.0.0.1:9222/json', (res) => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => {
      const wsUrl = JSON.parse(d)[0]?.webSocketDebuggerUrl;
      const ws = new WebSocket(wsUrl);
      ws.onopen = () => {
        // Wait 3 seconds for React hydration, then evaluate
        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 1,
            method: 'Runtime.evaluate',
            params: {
              expression: 'document.querySelector("header")?.outerHTML',
              returnByValue: true
            }
          }));
        }, 3000);
      };
      ws.onmessage = (msg) => {
        console.log('Header HTML:', JSON.parse(msg.data).result.result.value);
        ws.close();
        chrome.kill();
        process.exit(0);
      };
    });
  });
}, 2000);

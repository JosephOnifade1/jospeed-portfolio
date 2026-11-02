import { spawn } from 'child_process';
import http from 'http';

const chrome = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
  '--headless',
  '--remote-debugging-port=9222',
  '--window-size=390,844',
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
        ws.send(JSON.stringify({
          id: 1,
          method: 'Runtime.evaluate',
          params: {
            expression: `
              (() => {
                const overflowEls = [];
                document.querySelectorAll('*').forEach(el => {
                  const r = el.getBoundingClientRect();
                  if (r.right > 395) {
                    overflowEls.push({ tag: el.tagName, id: el.id, class: el.className, right: Math.round(r.right), width: Math.round(r.width) });
                  }
                });
                return {
                  scrollW: document.documentElement.scrollWidth,
                  overflowCount: overflowEls.length,
                  sample: overflowEls.slice(0, 10)
                };
              })()
            `,
            returnByValue: true
          }
        }));
      };
      ws.onmessage = (msg) => {
        console.log('Result:', JSON.stringify(JSON.parse(msg.data).result.result.value, null, 2));
        ws.close();
        chrome.kill();
        process.exit(0);
      };
    });
  });
}, 2500);


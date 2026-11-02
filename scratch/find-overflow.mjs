import { spawn } from 'child_process';
import http from 'http';

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
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
                const results = [];
                document.querySelectorAll('*').forEach(el => {
                  const r = el.getBoundingClientRect();
                  if (r.right > 400) {
                    results.push({
                      tag: el.tagName,
                      id: el.id,
                      className: typeof el.className === 'string' ? el.className : '',
                      right: Math.round(r.right),
                      width: Math.round(r.width)
                    });
                  }
                });
                return results;
              })()
            `,
            returnByValue: true
          }
        }));
      };

      ws.onmessage = (msg) => {
        const val = JSON.parse(msg.data).result?.result?.value;
        console.log('Overflowing elements count:', val?.length);
        if (val?.length > 0) {
          console.log('Sample overflowing elements:', JSON.stringify(val.slice(0, 10), null, 2));
        }
        ws.close();
        chrome.kill();
        process.exit(0);
      };
    });
  });
}, 2500);


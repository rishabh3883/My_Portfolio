import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'portfolio-api-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method === 'POST' && req.url === '/api/save-portfolio') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const data = JSON.parse(body);
                const filePath = path.resolve(__dirname, 'src/data/portfolioData.json');
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
              } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: error.message }));
              }
            });
          } else if (req.method === 'POST' && req.url === '/api/upload-file') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const { fileName, base64Data } = JSON.parse(body);
                if (!fileName || !base64Data) {
                  res.writeHead(400, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: false, error: 'Missing fileName or base64Data' }));
                  return;
                }
                
                // base64Data is like: "data:application/pdf;base64,..." or similar
                const base64Content = base64Data.split(';base64,').pop();
                const buffer = Buffer.from(base64Content, 'base64');
                
                // Save it to public directory
                const destPath = path.resolve(__dirname, 'public', fileName);
                
                // Ensure public directory exists
                const publicDir = path.resolve(__dirname, 'public');
                if (!fs.existsSync(publicDir)) {
                  fs.mkdirSync(publicDir, { recursive: true });
                }
                
                fs.writeFileSync(destPath, buffer);
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, url: `/${fileName}` }));
              } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: error.message }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ],
})


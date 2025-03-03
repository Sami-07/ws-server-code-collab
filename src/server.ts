import * as WebSocket from 'ws';
import { WebSocketServer } from 'ws';
import * as http from 'http';
const { setupWSConnection } = require('y-websocket/bin/utils');
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.WEBSOCKET_PORT ? parseInt(process.env.WEBSOCKET_PORT, 10) : 1235;
const HOST = process.env.WEBSOCKET_HOST || 'localhost';

const server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('WebSocket server for Code Collab\n');
});

const wss = new WebSocketServer({ server });

wss.on('connection', (conn: WebSocket, req: http.IncomingMessage) => {
  
  setupWSConnection(conn, req, { gc: true });
  console.log('Client connected');
  
  conn.onclose = () => {
    console.log('Client disconnected');
  };
});

server.listen(PORT, HOST, () => {
  console.log(`WebSocket server running at http://${HOST}:${PORT}`);
  console.log('Ready for connections');
});

process.on('SIGINT', () => {
  console.log('Shutting down WebSocket server');
  wss.close();
  server.close();
  process.exit(0);
}); 
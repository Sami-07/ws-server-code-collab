import * as WebSocket from 'ws';
import { WebSocketServer } from 'ws';
import * as http from 'http';
import express from 'express';
const { setupWSConnection } = require('y-websocket/bin/utils');
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.WEBSOCKET_PORT ? parseInt(process.env.WEBSOCKET_PORT, 10) : 1235;
const HOST = process.env.WEBSOCKET_HOST || 'localhost';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('WebSocket server for Code Collab');
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const server = http.createServer(app);
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

  process.exit(0);
}); 
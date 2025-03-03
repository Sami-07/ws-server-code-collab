# Code Collab WebSocket Server

This is a WebSocket server for the Code Collab application that enables real-time collaboration using Yjs.

## Setup

1. Install dependencies:

```bash
cd websocket-server
npm install
```

2. Build the TypeScript code:

```bash
npm run build
```

3. Start the server:

```bash
npm start
```

For development with automatic reloading:

```bash
npm run dev
```

## Configuration

The server can be configured using environment variables in the `.env` file at the root of the project:

- `WEBSOCKET_PORT`: The port on which the WebSocket server will run (default: 1234)
- `WEBSOCKET_HOST`: The host on which the WebSocket server will run (default: localhost)
- `NEXT_PUBLIC_WEBSOCKET_URL`: The WebSocket URL that the client will use to connect (default: ws://localhost:1234)

## Production Deployment

For production deployment, you should:

1. Set up the WebSocket server on a reliable host with a static IP or domain name
2. Configure proper security (TLS/SSL) for secure WebSocket connections (wss://)
3. Update the `.env` file with the production values:

```
WEBSOCKET_PORT=1234
WEBSOCKET_HOST=0.0.0.0  # Listen on all interfaces
NEXT_PUBLIC_WEBSOCKET_URL=wss://your-domain.com:1234
```

## How It Works

This server uses the y-websocket package to handle WebSocket connections for Yjs documents. When clients connect, they can collaborate in real-time on the same document, with changes being synchronized across all connected clients. 
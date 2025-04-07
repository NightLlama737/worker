import { WebSocketServer } from 'ws';
import { NextRequest, NextResponse } from 'next/server';
import { createServer } from 'http';


const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log('Received message:', message.toString());

        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

export async function GET(request: NextRequest) {
    if (!request.headers.get("upgrade")?.includes("websocket")) {
        return new NextResponse("Expected a WebSocket request", { status: 426 });
    }

    // Create an HTTP server to handle the WebSocket upgrade
    const server = createServer();

    server.on('upgrade', (req, socket, head) => {
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit('connection', ws, req);
        });
    });

    server.listen(0, () => {
        console.log('WebSocket server is running');
    });

    return new NextResponse(null, { status: 101 });
}
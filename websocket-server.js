require('dotenv').config();
const WebSocket = require('ws');
const fetch = require('node-fetch');
const http = require('http');

// Create HTTP server for WebSocket
const server = http.createServer();
const PORT = process.env.PORT || 8080;

// Initialize WebSocket server with the HTTP server
const wss = new WebSocket.Server({ 
    server,
    perMessageDeflate: false // Disable per-message deflate to prevent memory leaks
});

// Get the Vercel URL from environment variables
const VERCEL_URL = process.env.VERCEL_URL || 'localhost:3000';

wss.on('connection', (ws, req) => {
    console.log('Client connected from:', req.socket.remoteAddress);

    ws.on('message', async (message) => {
        try {
            const messageData = JSON.parse(message.toString());
            console.log('Received message:', messageData);
            
            const API_URL = process.env.NODE_ENV === 'production'
                ? `https://${VERCEL_URL}`
                : 'http://localhost:3000';

            const response = await fetch(`${API_URL}/api/addMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const savedMessage = await response.json();
            console.log('Message saved successfully:', savedMessage);
            
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(savedMessage));
                }
            });
        } catch (error) {
            console.error('Error handling message:', error);
            ws.send(JSON.stringify({ error: error.message }));
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`WebSocket server is running on port ${PORT}`);
});
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
    perMessageDeflate: false
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

            // Add more detailed logging
            console.log('Sending message to API:', {
                url: `${API_URL}/api/addMessage`,
                data: messageData
            });

            const response = await fetch(`${API_URL}/api/addMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(messageData)
            });

            const responseText = await response.text();
            console.log('API Response:', responseText);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
            }

            const savedMessage = JSON.parse(responseText);
            console.log('Message saved successfully:', savedMessage);
            
            // Broadcast to all connected clients
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(savedMessage));
                }
            });
        } catch (error) {
            console.error('Error handling message:', error);
            ws.send(JSON.stringify({ 
                error: error.message,
                timestamp: new Date().toISOString()
            }));
        }
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`WebSocket server is running on port ${PORT}`);
});
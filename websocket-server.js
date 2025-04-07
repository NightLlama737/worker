const WebSocket = require('ws');
const fetch = require('node-fetch');
const https = require('https');
const fs = require('fs');

// In production, you'll need SSL certificates
const server = process.env.NODE_ENV === 'production' 
  ? https.createServer({
      cert: fs.readFileSync('/path/to/cert.pem'),
      key: fs.readFileSync('/path/to/key.pem')
    })
  : null;

const wss = process.env.NODE_ENV === 'production'
  ? new WebSocket.Server({ server })
  : new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => {
    console.log('Client connected from:', req.socket.remoteAddress);

    ws.on('message', async (message) => {
        try {
            const messageData = JSON.parse(message.toString());
            console.log('Received message:', messageData);
            
            const API_URL = process.env.NODE_ENV === 'production'
                ? 'https://your-vercel-app.vercel.app'
                : 'http://localhost:3000';

            const response = await fetch(`${API_URL}/api/addMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to save message: ${errorData.error || response.statusText}`);
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
});

if (process.env.NODE_ENV === 'production') {
    const PORT = process.env.PORT || 8080;
    server.listen(PORT, () => {
        console.log(`WebSocket server is running on port ${PORT}`);
    });
} else {
    console.log('WebSocket server is running on ws://localhost:8080');
}
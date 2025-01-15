import { decodeWithKey } from "./app/lib/utils";

// lib/websocket.js
export function createWebSocket(clientCode, feedToken, apiKey) {
  console.log(clientCode, feedToken, apiKey);
  if (clientCode && feedToken && apiKey) {
    clientCode = decodeWithKey(clientCode);
    feedToken = feedToken;
    apiKey = decodeWithKey(apiKey);
  }
  const url = `wss://smartapisocket.angelone.in/smart-stream?clientCode=${clientCode}&feedToken=${feedToken}&apiKey=${apiKey}`;
  console.log("test1");

  const ws = new WebSocket(url);
  ws.onopen = () => {
    console.log("WebSocket connection established.");
  };

  ws.onmessage = (event) => {
    console.log("Message received:", event.data);
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  ws.onclose = () => {
    console.log("WebSocket connection closed.");
  };

  return ws;
}

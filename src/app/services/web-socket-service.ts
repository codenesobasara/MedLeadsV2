import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  constructor(private ws: WebSocket) {}
  
  connect(){
    this.ws = new WebSocket('ws://localhost:8080');
    this.ws.onopen = () => console.log('WS connected');
    this.ws.onclose = () => console.log('WS disconnected');
    this.ws.onerror = (err) => console.log('WS error', err);

}

onMessage(handler: (msg: any) => void) {
  if (!this.ws) return;
  this.ws.onmessage = (event) => {
    try {
      handler(JSON.parse(event.data));
    } catch {
      console.log('Non-JSON WS message:', event.data);
    }
  };
}

send(data: any) {
  if (this.ws?.readyState === WebSocket.OPEN) {
    this.ws.send(JSON.stringify(data));
  }
}}
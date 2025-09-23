# Blog Post: The Art of Real-Time: Our WebSocket and Pub/Sub Architecture

**Series:** From Engine to Enterprise: Building Meeting Ops

---

## The Magic of "Live"

One of the most compelling features of **Meeting Ops** is watching your words appear on the screen just moments after you've spoken them. This "live" experience feels like magic, but it's the result of a carefully designed real-time data pipeline. A standard request-response REST API could never achieve this level of immediacy.

This post dives deep into the architecture we built using WebSockets and a Redis pub/sub model to make that magic happen.

## The Challenge: A Two-Way, Multi-Client Conversation

Our real-time needs were complex:

1.  We needed to stream audio data *from* a single recording client *to* the server continuously.
2.  We needed to stream transcription results *from* the server *to* potentially many clients (e.g., a whole team watching the meeting live).

Handling this with simple, direct WebSocket connections would create a tangled mess. If 10 people were watching, would the transcription service have to manage 10 separate connections? What if the transcription service crashed? This approach isn't scalable or robust.

## The Solution: Decoupling with Redis Pub/Sub

Our architectural breakthrough was to decouple the data producers from the data consumers using Redis as a high-speed message bus.

Here's the data flow:

1.  **Audio Ingestion:** The recording client opens a dedicated WebSocket to the backend. Its only job is to stream raw audio chunks. The backend service that receives this audio is simple: it takes the audio and immediately publishes it to a Redis channel, like `audio-stream:session-123`.

2.  **The AI Engine (The Subscriber):** Our **Unicorn Amanuensis** engine is subscribed to that same Redis channel. As soon as a new audio chunk is published, Redis delivers it to the engine. The engine transcribes the chunk and then publishes the result to a *different* Redis channel, like `transcription-stream:session-123`.

3.  **The Frontend (The Broadcaster):** A separate WebSocket service in our backend is subscribed to the `transcription-stream` channel. When it receives a new transcript segment, its only job is to broadcast that JSON payload to every single client connected to the WebSocket endpoint for `session-123`.

This pub/sub model is incredibly powerful:

-   **Scalability:** 1 or 100 users can watch the live transcript. The load on the AI engine is exactly the same. The broadcasting service handles the fan-out.
-   **Resilience:** If the transcription engine needs to be restarted, it can simply re-subscribe to the Redis stream. The audio ingestion and WebSocket broadcasting services are unaffected.
-   **Flexibility:** We can easily add new services. Want to add a live sentiment analysis engine? Just have it subscribe to the `transcription-stream` and publish its results to a `sentiment-stream`. No other part of the system needs to change.

## The Code in Practice

Here's a simplified look at our FastAPI WebSocket endpoint for broadcasting results. Notice it doesn't do any transcription itself; it just listens to Redis.

```python
# A simplified broadcast endpoint
@app.websocket("/ws/listen/{session_id}")
async def websocket_listen_endpoint(websocket: WebSocket, session_id: str):
    await manager.connect(websocket, session_id)
    try:
        # The Redis pub/sub client
        pubsub = redis_client.pubsub()
        await pubsub.subscribe(f"transcription-stream:{session_id}")
        
        # Loop forever, waiting for messages from Redis
        while True:
            message = await pubsub.get_message(ignore_subscribe_messages=True)
            if message:
                # Broadcast the message to all clients in the room
                await manager.broadcast(session_id, message['data'])
    except WebSocketDisconnect:
        manager.disconnect(websocket, session_id)
```

## Conclusion

Building real-time AI applications requires thinking beyond simple REST APIs. By using WebSockets for persistent connections and a message broker like Redis for decoupling our internal services, we created a system that is not only fast and responsive but also scalable, resilient, and flexible enough to grow with our future ambitions for **Meeting Ops**.
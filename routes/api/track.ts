
import { newTracker, buildPageView } from '@snowplow/node-tracker';

const tracker = newTracker(
    {
        namespace: "thedenogatar",
        appId: "denogatar",
    },
    {
        endpoint: Deno.env.get("SNOWPLOW_COLLECTOR_URL"),
        eventMethod: "post",
        bufferSize: 1,
    }
);

interface TrackingPayload {
    type: string;
    metadata: {
        anonymousId: string;
        sessionId?: string;
        url: string;
        title?: string;
        timestamp: string;
    };
}

export async function handler(req: Request): Promise<Response> {
    console.log('Incoming request:', req.method, req.url);

    if (req.method !== "POST") {
        return new Response("Method not allowed", { status: 405 });
    }

    let payload: TrackingPayload;
    try {
        payload = await req.json();
        console.log('Parsed payload:', payload);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
    }

    if (!payload.metadata.anonymousId || !payload.metadata.sessionId) {
        console.error('Missing metadata:', payload.metadata);
        return new Response(JSON.stringify({ error: 'Missing required metadata' }), { status: 400 });
    }

    try {
        switch (payload.type) {
            case 'pageview':
                console.log('Tracking pageview...');
                await tracker.track(buildPageView({
                    pageUrl: payload.metadata.url,
                    pageTitle: payload.metadata.title || 'Home',
                }));
                console.log('Snowplow tracking succeeded');
                break;
            default:
                console.warn(`Unknown event type: ${payload.type}`);
                return new Response(JSON.stringify({ error: 'Unknown event type' }), { status: 400 });
        }
    } catch (error) {
        console.error('Error sending event to Snowplow:', error);
        return new Response(JSON.stringify({ error: 'Snowplow tracking failed' }), { status: 500 });
    }

    return new Response(JSON.stringify({ status: 'success' }), {
        headers: { "Content-Type": "application/json" },
    });
}

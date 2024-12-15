// utils/analytics.server.ts

import { getCookies } from "https://deno.land/std@0.208.0/http/cookie.ts";
import { getOrCreateUser } from "./db.ts";

interface TrackingMetadata {
    pathParams?: Record<string, string>;
}

export async function trackPageView(req: Request, metadata?: TrackingMetadata) {
    const { session_id } = getCookies(req.headers);

    if (!session_id) {
        throw new Error('Missing required tracking metadata: session_id');
    }

    const user = await getOrCreateUser(session_id);
    const { url } = req;
    const title = metadata?.pathParams?.slug || 'Home';

    try {
        const apiUrl = new URL('/api/track', req.url).toString();
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'pageview',
                metadata: {
                    anonymousId: user.anonymous_id,
                    sessionId: session_id,
                    url,
                    title,
                    timestamp: new Date().toISOString(),
                },
            }),
        });

        if (!response.ok) {
            console.error(`Failed to track page view: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error sending tracking data:', error);
    }
}

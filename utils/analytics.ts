// utils/analytics.ts
interface AnalyticsEvent {
  event_id: string;
  event_type: string;
  pathname?: string | null;
  referrer?: string | null;
  userAgent?: string | null;
  session_id: string;
  anonymous_id: string;
  user_id?: string | null;
  timestamp: number;
}


export async function trackEvent(event: AnalyticsEvent) {
  try {
    const response = await fetch("https://g0im2ut056.execute-api.us-east-1.amazonaws.com/gata-stage/gatar-event-consumer", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(event)
    });
    return response.ok;
  } catch (error) {
    console.error('Failed to track event:', error);
    return false;
  }
}
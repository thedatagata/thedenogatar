// utils/analytics.browser.ts
export interface AnalyticsEvent {
  event_type: string;
  pathname?: string;
  referrer?: string;
  user_agent?: string;
  session_id?: string;
  anonymous_id?: string;
  name?: string;
  email?: string;
  message?: string;
  timestamp: number;
  data_element?: string;
}

export async function trackClientEvent(eventData: AnalyticsEvent) {
  try {
    const response = await fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('API response:', result);
    return result;
  } catch (error) {
    console.error("Failed to track event:", error);
    throw error;
  }
}
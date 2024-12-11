// islands/Analytics.tsx
import { useEffect } from "preact/hooks";
import { trackClientEvent } from "../utils/analytics.browser.ts";

export default function WebAnalytics() {
  useEffect(() => {
    // Parse cookies on client-side
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=").map((c) => c.trim());
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    const session_id = cookies["session_id"];
    const anonymous_id = cookies["anonymous_id"];

    if (!session_id || !anonymous_id) {
      console.error("Missing required cookies");
      return;
    }

    // Track pageview
    trackClientEvent({
      event_type: "pageview",
      pathname: globalThis.location.pathname,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      session_id,
      anonymous_id,
      timestamp: Date.now(),
    });

    // Track clicks
    const handleClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest("[data-element]");
      if (!target) return;

      trackClientEvent({
        event_type: "click",
        data_element: target.getAttribute("data-element") || "",
        pathname: globalThis.location.pathname,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        session_id,
        anonymous_id,
        timestamp: Date.now(),
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null; // This component doesn't render anything
}
import { Head } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";
import Hero from "../components/Hero.tsx";
import Services from "../components/Services.tsx";
import Contact from "../components/Contact.tsx";
import Footer from "../components/Footer.tsx";

import { Handlers } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.208.0/http/cookie.ts";
import { trackEvent } from "../utils/analytics.ts";
import { getOrCreateUser, recordSession } from "../utils/db.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const cookies = getCookies(req.headers);
    let session_id = cookies.session_id;
    let anonymous_id = cookies.anonymous_id;

    // Generate new session ID if none exists
    if (!session_id) {
      session_id = crypto.randomUUID();
    }

    if (!anonymous_id) {
      anonymous_id = crypto.randomUUID();
    }

    const user = await getOrCreateUser(anonymous_id);
    await recordSession(anonymous_id, session_id);

    // Track pageview
    await trackEvent({
      event_id: crypto.randomUUID(),
      event_type: "pageview",
      session_id,
      anonymous_id,
      user_id: user.user_id, // Include if exists
      timestamp: Date.now(),
      pathname: url.pathname,
      referrer: req.headers.get("referer"),
      userAgent: req.headers.get("user-agent"),
    });

    // Render the page
    const resp = await ctx.render();

    // Session cookie
    const sessionExpiry = new Date(Date.now() + 30 * 60 * 1000);
    resp.headers.append(
      "Set-Cookie",
      `session_id=${session_id}; Path=/; Expires=${sessionExpiry.toUTCString()}; SameSite=Lax`
    );

    // Anonymous ID cookie
    if (!cookies.anonymous_id) {
      const anonymousExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
      resp.headers.append(
        "Set-Cookie",
        `anonymous_id=${anonymous_id}; Path=/; Expires=${anonymousExpiry.toUTCString()}; SameSite=Lax`
      );
    }

    return resp;
  },
};



function Layout({ children }: { children: ComponentChildren }) {
  return (
    <>
      <Head>
        <title>Data Gator LLC - Modern Data Solutions</title>
        <link rel="stylesheet" href="/main.css" />
      </Head>
      {children}
    </>
  );
}

export default function Home() {
  return (
    <Layout>
      <div class="min-h-screen bg-white">
        <nav class="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-200">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex items-center">
                <img src="/dasgata.jpg" alt="Data Gator" class="h-8 w-auto" />
              </div>
              <div class="hidden md:flex items-center space-x-8">
                <a href="#about" class="text-gray-900 hover:text-gator-green">About</a>
                <a href="#services" class="text-gray-900 hover:text-gator-green">Services</a>
                <a href="#contact" class="text-gray-900 hover:text-gator-green">Contact</a>
              </div>
            </div>
          </div>
        </nav>

        <Hero />
        <Services />
        <Contact />
        <Footer />
      </div>
    </Layout>
  );
}
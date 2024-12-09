// routes/index.tsx
import { Head } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.208.0/http/cookie.ts";
import { trackEvent } from "../utils/analytics.ts";
import { getOrCreateUser, recordSession } from "../utils/db.ts";

import Nav from "../components/Nav.tsx";
import Hero from "../components/Hero.tsx";
import Services from "../components/Services.tsx";
import Technologies from "../components/Technologies.tsx"; 
import Expertise from "../components/Expertise.tsx";  
import Contact from "../components/Contact.tsx";

export const handler: Handlers = {
 async GET(req, ctx) {
   const url = new URL(req.url);
   const cookies = getCookies(req.headers);
   let session_id = cookies.session_id;
   let anonymous_id = cookies.anonymous_id;

   if (!session_id) {
     session_id = crypto.randomUUID();
   }
   
   if (!anonymous_id) {
     anonymous_id = crypto.randomUUID();
   }

   // Get or create user in KV store
   const user = await getOrCreateUser(anonymous_id);
   await recordSession(anonymous_id, session_id);

   // Track pageview
   await trackEvent({
     event_type: 'pageview',
     event_id: crypto.randomUUID(),
     session_id,
     anonymous_id,
     user_id: user.user_id,
     timestamp: Date.now(),
     pathname: url.pathname,
     referrer: req.headers.get('referer'),
     user_agent: req.headers.get('user-agent')
   });

   const resp = await ctx.render();
   
   const sessionExpiry = new Date(Date.now() + 30 * 60 * 1000);
   resp.headers.append(
     'Set-Cookie', 
     `session_id=${session_id}; Path=/; Expires=${sessionExpiry.toUTCString()}; SameSite=Lax; HttpOnly`
   );
   
   if (!cookies.anonymous_id) {
     const anonymousExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
     resp.headers.append(
       'Set-Cookie', 
       `anonymous_id=${anonymous_id}; Path=/; Expires=${anonymousExpiry.toUTCString()}; SameSite=Lax; HttpOnly`
     );
   }
   
   return resp;
 }
};

export default function Home() {
 return (
   <>
     <Head>
       <title>DATA_GATA - Modern Data Stack Solutions</title>
       <link rel="stylesheet" href="/main.css" />
     </Head>
     <div class="min-h-screen bg-[#F8F6F0]">
       <Nav />
       <Hero />
       <Services /> 
       <Expertise /> 
       <Technologies />
       <Contact />
     </div>
   </>
 );
}
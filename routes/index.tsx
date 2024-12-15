// routes/index.tsx
import { Head } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import { getCookies, setCookie } from "https://deno.land/std@0.208.0/http/cookie.ts";
import { recordSession } from "../utils/db.ts";

import Nav from "../components/Nav.tsx";
import Hero from "../components/Hero.tsx";
import Solutions from "../components/Solutions.tsx";
import Technologies from "../components/Technologies.tsx";
import Expertise from "../components/Expertise.tsx";
import Footer from "../components/Footer.tsx";

export const handler: Handlers = {
  async GET(req, ctx) {
    const cookies = getCookies(req.headers);
    let session_id = cookies.session_id;

    if (!session_id) {
      session_id = crypto.randomUUID();
      recordSession(session_id);
    }

    const resp = await ctx.render();

    setCookie(resp.headers, {
      name: "session_id",
      value: session_id,
      path: "/",
      expires: new Date(Date.now() + 30 * 60 * 1000),
      sameSite: "Lax",
    });

    return resp;
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>DATA_GATA - Modern Data Stack Solutions</title>
      </Head>
      <div class="min-h-screen bg-[#F8F6F0]">
        <Nav />
        <Hero />
        <Solutions />
        <Expertise />
        <Technologies />
        <Footer />
      </div>
    </>
  );
}
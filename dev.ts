#!/usr/bin/env -S deno run -A --watch=static/,routes/
import { load } from "https://deno.land/std/dotenv/mod.ts";
await load({ export: true });

import dev from "$fresh/dev.ts";
await dev(import.meta.url, "./main.ts");

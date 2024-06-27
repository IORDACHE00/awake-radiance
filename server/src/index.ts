import { Hono } from "hono";
import { cors } from "hono/cors";
import { createClient } from "@supabase/supabase-js";

import notes from "./routes/notes";
import auth from "./routes/auth";

const app = new Hono();

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

app.use(
  "/api/*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.route("/api/v1", auth);
app.route("/api/v1", notes);

app.get("/healthcheck", (c) => {
  return c.json({ status: "ok" }, 200);
});

export default app;

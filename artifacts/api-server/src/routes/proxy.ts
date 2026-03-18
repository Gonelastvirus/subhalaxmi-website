import { Router, type IRouter } from "express";
import type { Request, Response } from "express";

const router: IRouter = Router();

const EXTERNAL_API = "https://replit-sample-app-draft.onrender.com";

async function forwardRequest(req: Request, res: Response): Promise<void> {
  const targetUrl = `${EXTERNAL_API}${req.originalUrl}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    headers["x-forwarded-for"] = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  }

  try {
    const fetchOptions: RequestInit = {
      method: req.method,
      headers,
    };

    if (req.method !== "GET" && req.method !== "HEAD") {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const upstream = await fetch(targetUrl, fetchOptions);

    const contentType = upstream.headers.get("content-type") ?? "application/json";
    res.status(upstream.status).set("Content-Type", contentType);

    const text = await upstream.text();
    res.send(text);
  } catch (err) {
    console.error(`Proxy error forwarding to ${targetUrl}:`, err);
    res.status(502).json({ error: "Bad Gateway — upstream API unavailable" });
  }
}

router.get("/properties", forwardRequest);
router.get("/services", forwardRequest);
router.get("/about", forwardRequest);

export default router;

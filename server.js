import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
  app.use(express.json({ limit: "35mb" }));
  app.use(express.urlencoded({ extended: true, limit: "35mb" }));
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      hasApiKey: !!process.env.GEMINI_API_KEY,
      videoModel: "gemini-omni-1.2-flash"
    });
  });
  app.post("/api/animate-video", async (req, res) => {
    try {
      const { image, mimeType = "image/jpeg", aspectRatio = "16:9", prompt } = req.body;
      if (!image) {
        return res.status(400).json({
          error: "Image data is required to animate into video."
        });
      }
      if (aspectRatio !== "16:9" && aspectRatio !== "9:16") {
        return res.status(400).json({
          error: "Invalid aspect_ratio. Supported aspect ratios are '16:9' (landscape) or '9:16' (portrait)."
        });
      }
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "GEMINI_API_KEY is not configured on the server. Please add your Gemini API key in AI Studio Secrets."
        });
      }
      const ai = new GoogleGenAI({ apiKey });
      let cleanBase64 = image;
      let detectedMime = mimeType;
      if (typeof image === "string" && image.startsWith("data:")) {
        const matches = image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
        if (matches) {
          detectedMime = matches[1];
          cleanBase64 = matches[2];
        } else {
          const parts = image.split(",");
          if (parts.length > 1) {
            cleanBase64 = parts[1];
          }
        }
      }
      const motionPrompt = prompt && prompt.trim().length > 0 ? prompt.trim() : "Animate this photo with smooth, cinematic camera motion, gentle natural lighting shifts, and realistic movement.";
      console.log(`[Omni-Flash] Starting video generation with model: gemini-omni-1.2-flash (${aspectRatio})...`);
      const interaction = await ai.interactions.create({
        model: "gemini-omni-1.2-flash",
        input: [
          {
            type: "image",
            mime_type: detectedMime,
            data: cleanBase64
          },
          {
            type: "text",
            text: motionPrompt
          }
        ],
        background: false,
        store: false,
        stream: false,
        response_format: {
          type: "video",
          aspect_ratio: aspectRatio
        }
      }, { timeout: 3e5 });
      const videoPart = interaction.output_video;
      if (videoPart && videoPart.data) {
        console.log(`[Omni-Flash] Successfully generated video (${videoPart.mime_type || "video/mp4"})!`);
        return res.json({
          success: true,
          videoData: videoPart.data,
          mimeType: videoPart.mime_type || "video/mp4",
          aspectRatio
        });
      }
      console.warn("[Omni-Flash] Video part not present in output_video. Inspecting steps...");
      return res.status(502).json({
        error: "Video generation completed but did not produce output video bytes.",
        steps: interaction.steps
      });
    } catch (err) {
      console.error("[Omni-Flash] Error generating video:", err);
      const errorMessage = err?.message || "Failed to animate image with gemini-omni-1.2-flash.";
      return res.status(500).json({
        error: errorMessage
      });
    }
  });
  const isProduction = process.env.NODE_ENV === "production";
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Portfolio dev server running at http://0.0.0.0:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

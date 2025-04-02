const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const shortid = require("shortid");
const QRCode = require("qrcode");
const prisma = new PrismaClient();
const axios = require("axios");

const baseUrl = process.env.BASE_URL || "http://localhost:8000";

router.get("/test", (req, res) => {
  res.send("API is working");
});

router.get("/listUrl", async (req, res) => {
  try {
    const Urls = await prisma.shortUrl.findMany({
      orderBy: {
        clicks: "desc", // Order by clicks in descending order
      },
      // take: 5, // Limit to 5 records
    });
    if(!Urls){
      return res.status(404).json("Not found Urls")
    }
    return res.status(201).json(Urls);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl || !originalUrl.match(/^https?:\/\/.+/)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    // ตรวจสอบว่า originalUrl มีอยู่ในฐานข้อมูลหรือไม่
    const existingUrl = await prisma.shortUrl.findFirst({
      where: { originalUrl },
    });
    // console.log("existingUrl",existingUrl);

    if (existingUrl) {
      // ถ้ามีอยู่แล้ว ใช้ shortCode เดิม
      console.log("has originalURL", existingUrl);

      const fullShortUrl = `${baseUrl}/${existingUrl.shortCode}`;
      const qrCode = await QRCode.toDataURL(fullShortUrl);
      return res.status(200).json({
        shortUrl: fullShortUrl,
        qrCode,
        totalClick: existingUrl.clicks,
      });
    }

    let shortCode = shortid.generate();
    while (await prisma.shortUrl.findUnique({ where: { shortCode } })) {
      shortCode = shortid.generate();
    }

    const shortUrl = await prisma.shortUrl.create({
      data: {
        originalUrl,
        shortCode,
      },
    });

    const fullShortUrl = `${baseUrl}/${shortUrl.shortCode}`;
    const qrCode = await QRCode.toDataURL(fullShortUrl);

    res.status(201).json({ shortUrl: fullShortUrl, qrCode });
  } catch (error) {
    console.error("Error in shorten:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/clicks/:shortCode", async (req, res) => {
  const { shortCode } = req.params;

  try {
    const shortCodeData = await prisma.shortUrl.findUnique({
      where: { shortCode },
    });

    console.log("Found shortCodeData:", shortCodeData);

    res.status(200).json(shortCodeData);
  } catch (error) {
    console.error("Error in GET /:shortCode:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/check", async (req, res) => {
  let { originalUrl } = req.body;

  // ✅ เช็คว่ามี http:// หรือ https:// หรือไม่
  if (!originalUrl.startsWith("http://") && !originalUrl.startsWith("https://")) {
    return res.status(400).json({ error: "Invalid URL: must start with http:// or https://" });
  }

  try {
    const response = await axios.get(originalUrl);
    res.status(200).json({ reachable: true, status: response.status });
  } catch (error) {
    console.error("Error checking URL:", error.message);
    res.status(400).json({ reachable: false, error: error.message });
  }
});



router.get("/:shortCode", async (req, res) => {
  const { shortCode } = req.params;
  console.log("GET /api/:shortCode called with:", shortCode);

  try {
    const shortUrl = await prisma.shortUrl.findUnique({
      where: { shortCode },
    });

    console.log("Found shortUrl:", shortUrl);

    if (!shortUrl) {
      console.log("ShortCode not found:", shortCode);
      return res.status(404).json({ error: "Link not found" });
    }

    await prisma.shortUrl.update({
      where: { shortCode },
      data: { clicks: shortUrl.clicks + 1 },
    });

    console.log("Redirecting to:", shortUrl.originalUrl);
    res.redirect(shortUrl.originalUrl);
  } catch (error) {
    console.error("Error in GET /:shortCode:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

import express from "express";

const router = express.Router();

const HEADLINE_TEMPLATES = [
  "{name} is the best spot in {location}!",
  "Discover {name} in {location}—highly rated by locals.",
  "Why everyone in {location} is talking about {name}.",
  "{name}: The top choice for quality service in {location}.",
  "Experience the excellence of {name} in {location}.",
  "Find out why {name} leads the way in {location}.",
  "{name}—trusted by thousands in {location}.",
  "The ultimate guide to {name} in {location}.",
  "{name}: A must-visit place in {location}.",
  "See what makes {name} the favorite in {location}.",
  "Explore {name}—where {location} comes for the best.",
  "{name}: Setting the standard for excellence in {location}.",
  "Discover top-rated services at {name} in {location}.",
  "{location}'s hidden gem: {name}.",
  "{name}: Your go-to destination in {location}.",
  "Unlock the secrets of {name} in {location}.",
  "Why {name} stands out among competitors in {location}.",
  "Get to know {name}: {location}'s trusted choice.",
  "Top reasons to choose {name} in {location}.",
  "Make the most of your experience at {name} in {location}.",
];

const generateRandomHeadline = (businessName, businessLocation) => {
  const template =
    HEADLINE_TEMPLATES[Math.floor(Math.random() * HEADLINE_TEMPLATES.length)];
  return template
    .replace("{name}", businessName)
    .replace("{location}", businessLocation);
};

const generateRating = () => {
  const rating = Math.random() * 1.7 + 3.3;
  return Math.round(rating * 10) / 10;
};

const generateReviews = () => {
  return Math.floor(Math.random() * 470) + 31;
};

// API 1: /business-data
router.post("/business-data", (req, res) => {
  const { name, location } = req.body;
  try {
    if (!name || !location) {
      return res
        .status(400)
        .json({ message: "Business name or location is missing!" });
    }

    const rating = generateRating();
    const reviews = generateReviews();
    const seoHeadline = generateRandomHeadline(name, location);

    // Set lastHeadline cookie
    res.cookie("lastHeadline", seoHeadline, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const businessData = {
      rating,
      reviews,
      headline: seoHeadline,
    };

    res.status(200).json({ businessData });
  } catch (err) {
    console.log("Error in business-data route", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API 2: /regenrate-headlilne
router.get("/regenerate-headline", (req, res) => {
  const { name, location } = req.query;
  const lastHeadline = req.cookies.lastHeadline;
  try {
    if (!name || !location) {
      return res
        .status(400)
        .json({ message: "Business name or location is missing!" });
    }

    let newHeadline;
    let attempts = 0;
    do {
      newHeadline = generateRandomHeadline(name, location);
      attempts++;
    } while (newHeadline === lastHeadline && attempts < 10);

    // Update the cookie with the new headline
    res.cookie("lastHeadline", newHeadline, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ headline: newHeadline });
  } catch (err) {
    console.log("Error in regenerate-headline route", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

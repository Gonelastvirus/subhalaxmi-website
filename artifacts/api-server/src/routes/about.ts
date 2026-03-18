import { Router, type IRouter } from "express";
import { GetAboutResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const ABOUT_DATA = {
  mission:
    "To connect Nepali families and businesses with their dream properties through a trusted, transparent, and technology-driven platform that empowers buyers, sellers, and builders alike.",
  vision:
    "To become Nepal's most trusted real estate and construction services platform, making property ownership and quality construction accessible to every Nepali citizen.",
  contactPhone: "9841000000",
  contactEmail: "info@slproperty.com.np",
  address: "Naxal, Kathmandu, Nepal",
  establishedYear: "2019",
  socialLinks: {
    facebook: "https://facebook.com/slproperty",
    instagram: "https://instagram.com/slproperty",
    youtube: "https://youtube.com/@slproperty",
    twitter: "https://twitter.com/slproperty",
  },
};

router.get("/about", async (_req, res): Promise<void> => {
  const response = GetAboutResponse.parse(ABOUT_DATA);
  res.json(response);
});

export default router;

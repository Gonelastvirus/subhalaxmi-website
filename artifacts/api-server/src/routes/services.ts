import { Router, type IRouter } from "express";
import { GetServicesQueryParams, GetServicesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

function maskPhone(phone: string): string {
  if (phone.length >= 7) {
    return phone.slice(0, 2) + "****" + phone.slice(-3);
  }
  return phone;
}

const SERVICES = [
  {
    id: "1",
    businessName: "Sharma Plumbing Works",
    serviceType: "Plumber",
    district: "Kathmandu",
    description: "Expert plumbing services including pipe fitting, water tank installation, and drainage repair.",
    phone: maskPhone("9841234567"),
    experience: "10+ years",
    rating: 4.8,
  },
  {
    id: "2",
    businessName: "Nepal Electric Solutions",
    serviceType: "Electrician",
    district: "Kathmandu",
    description: "Licensed electricians for wiring, panel upgrades, solar installation, and emergency repairs.",
    phone: maskPhone("9852345678"),
    experience: "8 years",
    rating: 4.6,
  },
  {
    id: "3",
    businessName: "Poudel Construction Co.",
    serviceType: "Builder",
    district: "Lalitpur",
    description: "Full-service construction company specializing in residential and commercial buildings.",
    phone: maskPhone("9813456789"),
    experience: "15+ years",
    rating: 4.9,
  },
  {
    id: "4",
    businessName: "Sunrise Plumbing & Sanitation",
    serviceType: "Plumber",
    district: "Bhaktapur",
    description: "Professional plumbing for new construction and renovation projects.",
    phone: maskPhone("9864567890"),
    experience: "6 years",
    rating: 4.5,
  },
  {
    id: "5",
    businessName: "Pokhara Electric Services",
    serviceType: "Electrician",
    district: "Kaski",
    description: "Residential and commercial electrical work including smart home installations.",
    phone: maskPhone("9875678901"),
    experience: "12 years",
    rating: 4.7,
  },
  {
    id: "6",
    businessName: "Himalayan Builders Group",
    serviceType: "Builder",
    district: "Kaski",
    description: "Award-winning construction firm known for earthquake-resistant building techniques.",
    phone: maskPhone("9886789012"),
    experience: "20+ years",
    rating: 4.9,
  },
  {
    id: "7",
    businessName: "Tharu Interior & Construction",
    serviceType: "Builder",
    district: "Chitwan",
    description: "Interior design and construction services for homes and offices.",
    phone: maskPhone("9847890123"),
    experience: "9 years",
    rating: 4.4,
  },
  {
    id: "8",
    businessName: "Quick Fix Plumbing",
    serviceType: "Plumber",
    district: "Rupandehi",
    description: "24/7 emergency plumbing services at affordable rates.",
    phone: maskPhone("9858901234"),
    experience: "5 years",
    rating: 4.3,
  },
  {
    id: "9",
    businessName: "Volt Master Electric",
    serviceType: "Electrician",
    district: "Morang",
    description: "Industrial and residential electrical installations in eastern Nepal.",
    phone: maskPhone("9819012345"),
    experience: "7 years",
    rating: 4.6,
  },
];

router.get("/services", async (req, res): Promise<void> => {
  const query = GetServicesQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const { district, serviceType } = query.data;

  let filtered = SERVICES;

  if (district) {
    filtered = filtered.filter((s) => s.district.toLowerCase().includes(district.toLowerCase()));
  }
  if (serviceType) {
    filtered = filtered.filter((s) => s.serviceType.toLowerCase().includes(serviceType.toLowerCase()));
  }

  const response = GetServicesResponse.parse({
    services: filtered,
    total: filtered.length,
  });

  res.json(response);
});

export default router;

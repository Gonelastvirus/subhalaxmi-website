import { Router, type IRouter } from "express";
import { GetPropertiesQueryParams, GetPropertiesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const PROPERTIES = [
  {
    id: "1",
    title: "Modern Villa in Kathmandu",
    district: "Kathmandu",
    price: 25000000,
    priceUnit: "NPR",
    propertyType: "House",
    listingType: "sale" as const,
    bedrooms: 4,
    area: "8 Anna",
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format",
    description: "Spacious modern villa with premium finishes, 4 bedrooms, 3 bathrooms, and a garden.",
    location: "Banasthali, Kathmandu",
  },
  {
    id: "2",
    title: "Cozy Apartment Near Thamel",
    district: "Kathmandu",
    price: 35000,
    priceUnit: "NPR/month",
    propertyType: "Apartment",
    listingType: "rent" as const,
    bedrooms: 2,
    area: "850 sqft",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format",
    description: "Fully furnished apartment close to Thamel, ideal for professionals.",
    location: "Thamel, Kathmandu",
  },
  {
    id: "3",
    title: "Commercial Plot in Pokhara",
    district: "Kaski",
    price: 8000000,
    priceUnit: "NPR",
    propertyType: "Land",
    listingType: "sale" as const,
    bedrooms: 0,
    area: "4 Ropani",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format",
    description: "Prime commercial plot in Pokhara city with road access.",
    location: "Lakeside, Pokhara",
  },
  {
    id: "4",
    title: "Luxury Bungalow in Lalitpur",
    district: "Lalitpur",
    price: 45000000,
    priceUnit: "NPR",
    propertyType: "House",
    listingType: "sale" as const,
    bedrooms: 5,
    area: "12 Anna",
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format",
    description: "Luxury bungalow with swimming pool, 5 bedrooms, and premium interiors.",
    location: "Sanepa, Lalitpur",
  },
  {
    id: "5",
    title: "Studio Apartment in Biratnagar",
    district: "Morang",
    price: 15000,
    priceUnit: "NPR/month",
    propertyType: "Apartment",
    listingType: "rent" as const,
    bedrooms: 1,
    area: "450 sqft",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format",
    description: "Clean studio apartment with modern amenities in Biratnagar.",
    location: "Traffic Chowk, Biratnagar",
  },
  {
    id: "6",
    title: "Twin House in Bhaktapur",
    district: "Bhaktapur",
    price: 18000000,
    priceUnit: "NPR",
    propertyType: "House",
    listingType: "sale" as const,
    bedrooms: 3,
    area: "5 Anna",
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format",
    description: "Twin house in a peaceful area of Bhaktapur with traditional architecture.",
    location: "Suryabinayak, Bhaktapur",
  },
  {
    id: "7",
    title: "Residential Plot in Chitwan",
    district: "Chitwan",
    price: 3500000,
    priceUnit: "NPR",
    propertyType: "Land",
    listingType: "sale" as const,
    bedrooms: 0,
    area: "8 Dhur",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format",
    description: "Residential plot near main road in Bharatpur, Chitwan.",
    location: "Bharatpur, Chitwan",
  },
  {
    id: "8",
    title: "Furnished Flat in Pokhara",
    district: "Kaski",
    price: 28000,
    priceUnit: "NPR/month",
    propertyType: "Apartment",
    listingType: "rent" as const,
    bedrooms: 2,
    area: "900 sqft",
    imageUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&auto=format",
    description: "Fully furnished flat with beautiful mountain view, near Lakeside.",
    location: "Lakeside, Pokhara",
  },
  {
    id: "9",
    title: "3BHK Duplex in New Baneshwor",
    district: "Kathmandu",
    price: 32000000,
    priceUnit: "NPR",
    propertyType: "House",
    listingType: "sale" as const,
    bedrooms: 3,
    area: "6 Anna",
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format",
    description: "Beautiful duplex house in prime location of New Baneshwor.",
    location: "New Baneshwor, Kathmandu",
  },
  {
    id: "10",
    title: "Office Space in Butwal",
    district: "Rupandehi",
    price: 45000,
    priceUnit: "NPR/month",
    propertyType: "Commercial",
    listingType: "rent" as const,
    bedrooms: 0,
    area: "1200 sqft",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format",
    description: "Modern office space with parking, ideal for businesses in Butwal.",
    location: "Traffic Chowk, Butwal",
  },
  {
    id: "11",
    title: "Farm Land in Ilam",
    district: "Ilam",
    price: 1200000,
    priceUnit: "NPR",
    propertyType: "Land",
    listingType: "sale" as const,
    bedrooms: 0,
    area: "2 Bigha",
    imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format",
    description: "Tea garden land in scenic Ilam with road access.",
    location: "Ilam Bazar, Ilam",
  },
  {
    id: "12",
    title: "Row House in Bhimdatta",
    district: "Kanchanpur",
    price: 9500000,
    priceUnit: "NPR",
    propertyType: "House",
    listingType: "sale" as const,
    bedrooms: 3,
    area: "4 Anna",
    imageUrl: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&auto=format",
    description: "Affordable row house in Bhimdatta with modern design.",
    location: "Bhimdatta, Kanchanpur",
  },
];

router.get("/properties", async (req, res): Promise<void> => {
  const query = GetPropertiesQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const { district, listingType, propertyType, minPrice, maxPrice, bedrooms, limit = 12, offset = 0 } = query.data;

  let filtered = PROPERTIES;

  if (district) {
    filtered = filtered.filter((p) => p.district.toLowerCase().includes(district.toLowerCase()));
  }
  if (listingType) {
    filtered = filtered.filter((p) => p.listingType === listingType);
  }
  if (propertyType) {
    filtered = filtered.filter((p) => p.propertyType.toLowerCase().includes(propertyType.toLowerCase()));
  }
  if (minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= minPrice);
  }
  if (maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= maxPrice);
  }
  if (bedrooms !== undefined) {
    filtered = filtered.filter((p) => p.bedrooms >= bedrooms);
  }

  const total = filtered.length;
  const paginated = filtered.slice(offset, offset + limit);

  const response = GetPropertiesResponse.parse({
    properties: paginated,
    total,
    offset,
    limit,
  });

  res.json(response);
});

export default router;

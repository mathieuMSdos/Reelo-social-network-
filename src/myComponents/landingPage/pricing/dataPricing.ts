import { PricingPlan } from "@/src/types/pricingTypes";

export const defaultPlans: PricingPlan[] = [
  {
    id: "plus",
    name: "Plus",
    description: "For personal use",
    monthlyPrice: "$19",
    yearlyPrice: "$15",
    features: [
      { text: "Up to 5 team members" },
      { text: "Basic components library" },
      { text: "Community support" },
      { text: "1GB storage space" },
    ],
    button: {
      text: "Start free trial",
      url: "https://example.com",
    },
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals",
    monthlyPrice: "$49",
    yearlyPrice: "$35",
    features: [
      { text: "Unlimited team members" },
      { text: "Advanced components" },
      { text: "Priority support" },
      { text: "Unlimited storage" },
    ],
    button: {
      text: "Start free trial",
      url: "https://example.com",
    },
  },
];
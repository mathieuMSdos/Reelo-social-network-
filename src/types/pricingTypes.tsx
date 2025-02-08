export interface PricingFeature {
  text: string;
}

export interface PricingButton {
  text: string;
  url: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: string;
  yearlyPrice: string;
  features: PricingFeature[];
  button: PricingButton;
}


import { Timestamp } from "firebase/firestore";

export interface Products {
  [key: string]: Plan | Option;
}

export interface Price {
  account: number | null;
  id: string;
  interval: string;
  interval_count: number;
  name: string | null;
  trial_period_day: number | null;
  unit_amount: number;
}

export interface Plan {
  id: string;
  desc: string | null;
  name: string;
  type: string;
  prices: Price[];
}

export interface Option {
  id: string;
  desc: string | null;
  name: string;
  type: string;
  prices: Price[];
}

export interface CheckoutSession {
  allow_promotion_codes: boolean;
  billing_address_collection: string;
  cancel_url: string;
  created: Timestamp;
  line_items: { price: string; quantity: number }[];
  sessionId: string;
  success_url: string;
  tax_rates: string[];
  trial_from_plan: boolean;
  url: string;
  error?: string;
}

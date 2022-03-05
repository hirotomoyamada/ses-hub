import { Timestamp } from "firebase/firestore";

export interface Company {
  uid?: string;
  type: string;
  icon: string;
  cover: string;
  provider: string[];
  agree: string;
  status: string;
  profile: {
    name: string;
    person: string | null;
    body: string | null;
    position: string | null;
    postal: string | null;
    address: string | null;
    email: string;
    tel: string | null;
    more: string[];
    region: string[];
    url: string | null;
    social: {
      twitter: string | null;
      instagram: string | null;
      line: string | null;
      linkedIn: string | null;
    };
  };
  posts: { matters: string[]; resources: string[] };
  entries: {
    matters: string[];
    resources: string[];
    persons: string[];
  };
  likes: {
    matters: string[];
    resources: string[];
    persons: string[];
  };
  outputs: { matters: string[]; resources: string[] };
  follows: string[];
  home: string[];
  payment: {
    status: string;
    trial: boolean;
    limit: number;
    notice: boolean;
    id?: string;
    option?: { freelanceDirect?: boolean };
    link?: string;
    cancel?: boolean;
    load?: boolean;
    parent?: string;
    account?: number | null;
    children?: string[];
    start?: number | null;
    end?: number | null;
    price?: string | null;
  };
  createAt: number;

  updateAt?: number;
  lastLogin?: number;
  application?: boolean;
}

export interface Person {
  uid?: string;
  icon: string;
  cover: string;
  provider: string[];
  status: string;
  agree: string;
  profile: {
    nickName: string | null;
    name: string;
    state: string;
    position: string;
    body: string | null;
    age: number;
    sex: string;
    email: string;
    location: string;
    period: {
      year: number | null;
      month: number | null;
    };
    costs: {
      display: "public" | "private";
      type: string;
      min: number | null;
      max: number | null;
    };
    handles: string[];
    tools: string[];
    skills: string[];
    urls: string[];
    clothes: string | null;
    working: number | null;
    resident: string | null;
  };
  likes: string[];
  entries: string[];
  histories: string[];
  follows: string[];
  requests: {
    enable: string[];
    hold: string[];
    disable: string[];
  };
  home: string[];
  resume: {
    key: string | null;
    url: string | null;
  };
  createAt: number;
  updateAt?: number;
  lastLogin?: number;
}

export interface Data {
  agree: {
    body: string;
    status: string;
    title: string;
    updateAt: number;
  };

  information: {
    body: string;
    title: string;
    updateAt: number;
  };

  mail: {
    body: string;
    index: string;
    target: string | null;
    title: string;
    updateAt: number;
  };

  maintenance: {
    status: string;
    updateAt: number;
  };
}

export interface Customer {
  email: string;
  stripeId: string;
  stripeLink: string;
}

export interface Price {
  active: boolean;
  billing_scheme: string;
  currency: string;
  description: string | null;
  interval: string;
  interval_count: number;
  metadata: {
    account?: string;
  };
  recurring: {
    aggregate_usage: null;
    interval: string;
    interval_count: number;
    trial_period_days: number | null;
    usage_type: string;
  };
  tax_behavior: string;
  tiers: null;
  tiers_mode: null;
  transform_quantity: null;
  trial_period_days: number | null;
  type: string;
  unit_amount: number;
}

export interface Product {
  active: boolean;
  description: string | null;
  images: string[];
  metadata: { name?: string; type?: string };
  name: string;
  role: string | null;
  tax_code: string | null;
}

export interface TaxRates {
  active: boolean;
  country: string | null;
  created: number;
  description: string | null;
  display_name: string | null;
  id: string;
  inclusice: boolean;
  jurisdiction: null;
  livemode: boolean;
  object: string;
  percentage: number;
  state: null;
  tax_type: null;
}

export interface CheckoutSession {
  allow_promotion_codes: boolean;
  billing_address_collection: string;
  cancel_url: string;
  line_items: { price: string; quantity: number }[];
  success_url: string;
  tax_rates: string[];
  trial_from_plan: boolean;
  created?: Timestamp;
  sessionId?: string;
  url?: string;
  error?: string;
}

export interface Subscription {
  cancel_at: Timestamp | null;
  cancel_at_period_end: boolean;
  canceled_at: Timestamp | null;
  created: Timestamp;
  current_period_end: Timestamp;
  current_period_start: Timestamp;
  ended_at: Timestamp | null;
  items: {
    billing_thresholds: null;
    created: number;
    id: string;
    metadata: unknown;
    object: string;
    plan: {
      active: boolean;
      aggregate_usage: null;
      amount: number;
      amount_decimal: string;
      billing_scheme: string;
      created: number;
      currency: string;
      id: string;
      interval: string;
      interval_count: number;
      livemode: boolean;
      metadata: unknown;
      nickname: string;
      object: string;
      product: string;
      tiers_mode: null;
      transform_usage: null;
      trial_period_days: number | null;
      usage_type: string;
    };
    price: {
      active: boolean;
      billing_scheme: string;
      created: number;
      currency: string;
      id: string;
      livemode: boolean;
      lookup_key: null;
      metadata: {
        account?: string;
      };
      nickname: string;
      object: string;
      product: {
        active: boolean;
        attributes: string[];
        created: number;
        description: string | null;
        id: string;
        images: string[];
        livemode: boolean;
        metadata: {
          name: string;
          type: string;
        };
        name: string;
        object: string;
        package_dimensions: null;
        tax_code: null;
        type: string;
        unit_lavel: null;
        updated: number;
        url: string | null;
      };
      recurring: {
        aggregate_usage: null;
        interval: string;
        interval_count: number;
        trial_period_days: number | null;
        usage_type: string;
        tax_behavior: string;
        tiers_mode: null;
        transform_quantity: null;
        type: string;
        unit_amount: number | null;
        unit_amount_decimal: string | null;
      };
      tax_behavior: string;
      tiers_mode: null;
      transform_quantity: null;
      type: string;
      unit_amount: number | null;
      unit_amount_decial: string | null;
    };
    quantity: number;
    subscription: string;
    tax_rates: string[];
  }[];
  metadeta?: unknown;
  price: string;
  prices: string[];
  product: string;
  quantity: number;
  role: null;
  status: string;
  stripeLink: string;
  trial_end: Timestamp | null;
  trial_start: Timestamp | null;
}

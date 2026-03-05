// types/subscription.ts
export type PlanType = "CORE" | "GROWTH" | "PLUS";
export type IntervalType = "MONTHLY" | "SEMIANNUAL" | "ANNUAL";
export type PeriodType = "monthly" | "semiannual" | "annual";
export type FeatureType = "check" | "minus";

export interface BackendSubscriptionPlan {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  plan: PlanType;
  interval: IntervalType;
  price: string;
}

export interface BackendResponse {
  success: boolean;
  message: string;
  data: BackendSubscriptionPlan[];
}

export interface Plan {
  id: number;
  title: PlanType;
  prices: Record<PeriodType, number>;
  desc: Record<PeriodType, number>;
  features: { text: string; type: FeatureType }[];
  glow?: boolean;
  isPopular?: boolean;
}

export interface PlanUpdateModalProps {
  plan: Plan | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedPlan: Plan, period: PeriodType, newPrice: number) => void;
  currentPeriod: PeriodType;
  currentPrice: number;
}
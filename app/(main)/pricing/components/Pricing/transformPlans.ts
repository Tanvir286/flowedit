// utils/transformPlans.ts

import { BackendResponse, Plan, PlanType, PeriodType } from "./subscription";

// Static UI data for features and descriptions
export const staticPlanData: Plan[] = [
  {
    id: 1,
    title: "CORE",
    desc: {
      monthly: 409,
      semiannual: 627,
      annual: 865,
    },
    prices: {
      monthly: 409,
      semiannual: 627,
      annual: 865,
    },
    features: [
      { text: "Parturient sed nunc neque", type: "minus" },
      { text: "Vel enim ultrices et ornare", type: "minus" },
      { text: "Aenean cursus nec amet", type: "minus" },
      { text: "Adipiscing accumsan ut", type: "minus" },
      { text: "Parturient imperdiet id urna", type: "minus" },
      { text: "Mollis porta bibendum", type: "minus" },
      { text: "Vel nec dapibus sem feugiat", type: "check" },
      { text: "Elementum pretium sed", type: "check" },
      { text: "Ridiculus urna habitasse", type: "check" },
    ],
  },
  {
    id: 2,
    title: "GROWTH",
    desc: {
      monthly: 582,
      semiannual: 765,
      annual: 978,
    },
    prices: {
      monthly: 582,
      semiannual: 765,
      annual: 978,
    },
    glow: true,
    isPopular: true,
    features: Array(9).fill({ text: "Full premium access", type: "check" }),
  },
  {
    id: 3,
    title: "PLUS",
    desc: {
      monthly: 820,
      semiannual: 956,
      annual: 980,
    },
    prices: {
      monthly: 820,
      semiannual: 956,
      annual: 980,
    },
    features: Array(9).fill({ text: "Advanced premium access", type: "check" }),
  },
];
export const transformBackendToPlans = (backendData: BackendResponse): Plan[] => {
  if (!backendData?.data || backendData.data.length === 0) {
    return staticPlanData;
  }

  // Group prices by plan
  const groupedPrices = backendData.data.reduce((acc, item) => {
    const planName = item.plan;
    const interval = item.interval.toLowerCase() as PeriodType;
    
    if (!acc[planName]) {
      acc[planName] = {} as Record<PeriodType, number>;
    }
    
    acc[planName][interval] = Number(item.price);
    return acc;
  }, {} as Record<PlanType, Record<PeriodType, number>>);

  // Merge with static data
  return staticPlanData.map((staticPlan) => ({
    ...staticPlan,
    prices: {
      monthly: groupedPrices[staticPlan.title]?.monthly ?? 0,
      semiannual: groupedPrices[staticPlan.title]?.semiannual ?? 0,
      annual: groupedPrices[staticPlan.title]?.annual ?? 0,
    },
  }));
};

// For testing/development without API
export const mockBackendResponse: BackendResponse = {
  success: true,
  message: "Subscription plans retrieved successfully",
  data: [
    { id: "cmmbtwsfq0002027o2xr2gval", created_at: "2026-03-04T09:23:08.150Z", updated_at: "2026-03-04T09:23:08.150Z", deleted_at: null, plan: "PLUS", interval: "ANNUAL", price: "5500" },
    { id: "cmmbtwf050001027ottnainjx", created_at: "2026-03-04T09:22:50.742Z", updated_at: "2026-03-04T09:22:50.742Z", deleted_at: null, plan: "PLUS", interval: "SEMIANNUAL", price: "4500" },
    { id: "cmmbtw0w60000027of2wk98fk", created_at: "2026-03-04T09:22:32.453Z", updated_at: "2026-03-04T09:22:32.453Z", deleted_at: null, plan: "PLUS", interval: "MONTHLY", price: "2200" },
    { id: "cmmbtt4zg0004029smqsr2di9", created_at: "2026-03-04T09:20:17.763Z", updated_at: "2026-03-04T09:20:17.763Z", deleted_at: null, plan: "GROWTH", interval: "ANNUAL", price: "2500" },
    { id: "cmmbtrzsc0003029smq3ux5iz", created_at: "2026-03-04T09:19:24.396Z", updated_at: "2026-03-04T09:19:24.396Z", deleted_at: null, plan: "GROWTH", interval: "SEMIANNUAL", price: "2500" },
    { id: "cmmbtrl650002029s9rpfkipn", created_at: "2026-03-04T09:19:05.453Z", updated_at: "2026-03-04T09:19:05.453Z", deleted_at: null, plan: "GROWTH", interval: "MONTHLY", price: "1500" },
    { id: "cmmbtr1u20001029sub25wvcz", created_at: "2026-03-04T09:18:40.395Z", updated_at: "2026-03-04T09:18:40.395Z", deleted_at: null, plan: "CORE", interval: "ANNUAL", price: "3000" },
    { id: "cmmbtqsos0000029s4vljcqeg", created_at: "2026-03-04T09:18:28.540Z", updated_at: "2026-03-04T09:18:28.540Z", deleted_at: null, plan: "CORE", interval: "SEMIANNUAL", price: "434" },
    { id: "cmmbtmajc000002nk85hsm6hd", created_at: "2026-03-04T09:14:58.371Z", updated_at: "2026-03-04T09:14:58.371Z", deleted_at: null, plan: "CORE", interval: "MONTHLY", price: "2000" }
  ]
};
// components/PricingCard.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BsCurrencyDollar } from "react-icons/bs";
import { toast } from "sonner";
import DiamondIcon from "@/components/shared/DiamondCheckIcon";
import { useCreateTrileMutation } from "@/redux/features/payment/paymentApi";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/features/auth/authSlice";

import { useGetSubcriptionQuery } from "@/redux/features/payment/subscription";
import { transformBackendToPlans, mockBackendResponse } from "./transformPlans";
import { Plan, PeriodType, PlanType } from "./subscription";
import PriceUpdateModal from "./PricingUpdateModal";

export default function PricingCard() {
    const { data: apiData, isLoading: isLoadingPlans, error } = useGetSubcriptionQuery({});
    const [planType, setPlanType] = useState<PeriodType>("monthly");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [plans, setPlans] = useState<Plan[]>([]);

    const role = useAppSelector((state) => state.auth.role);
    const isAdmin = role === "ADMIN";
    const { token, isTrial, isSubscribed } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [createTrial, { isLoading: isTrialLoading }] = useCreateTrileMutation();
    const router = useRouter();

    // Transform backend data when it arrives
    useEffect(() => {
        if (apiData) {
            const transformed = transformBackendToPlans(apiData);
            setPlans(transformed);
        } else if (error) {
            console.error("Failed to fetch plans:", error);
            // Fallback to mock data if API fails
            setPlans(transformBackendToPlans(mockBackendResponse));
        }
    }, [apiData, error]);

    // For development/testing without API
    // useEffect(() => {
    //   setPlans(transformBackendToPlans(mockBackendResponse));
    // }, []);

    const handleEditClick = (plan: Plan) => {
        setSelectedPlan(plan);
        setIsOpen(true);
    };

    
    const handleSavePlan = (updatedPlan: Plan, period: PeriodType, newPrice: number) => {
        setPlans((prev) =>
            prev.map((p) =>
                p.id === updatedPlan.id
                    ? {
                        ...p,
                        prices: {
                            ...p.prices,
                            [period]: newPrice,
                        },
                    }
                    : p
            )
        );
    };

    const handleSubscribe = async (planTitle: PlanType) => {
      
        if (!token) {
            return router.push("/signup?redirect=/pricing");
        }

        
        if (!isTrial && !isSubscribed) {
            try {
                await createTrial({
                    plan: planTitle,
                    interval: planType.toUpperCase(),
                }).unwrap();

                toast.success("Trial started successfully!");

                dispatch(setCredentials({
                    isTrial: true,
                    isSubscribed: false,
                }));

                return;
            } catch (error) {
                console.log("Trial failed:", error);
                return;
            }
        }

     
        if (isTrial && !isSubscribed) {
            return router.push("/subscribe");
        }

       
        if (isSubscribed) {
            return router.push("https://flow-edit-one.vercel.app/dashboard");
        }
    };

    const getButtonText = (planTitle: PlanType) => {
        if (!isTrial && !isSubscribed) return `Start 14 Days Free Trial`;
        if (isTrial && !isSubscribed) return `Subscribe Now `;
        if (isSubscribed) return "Go to Dashboard";
        return "Select Plan";
    };

    const getDiscountPercent = (planTitle: PlanType, type: PeriodType) => {
        if (planTitle === "CORE") return 0;
        if (type === "semiannual") return 15;
        if (type === "annual") return 20;
        return 0;
    };

    if (isLoadingPlans) {
        return (
            <div className="flex justify-center items-center min-h-[500px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading subscription plans...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative py-20 w-full">
            {/* Plan Type Toggle */}
            <div className="flex justify-center mb-16">
                <div className="inline-flex bg-[#a1b8f4] gap-2 rounded-full p-1.5">
                    {(["monthly", "semiannual", "annual"] as PeriodType[]).map((type) => (
                        <button
                            key={type}
                            onClick={() => setPlanType(type)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all capitalize ${planType === type
                                    ? "bg-white text-gray-900 shadow-lg"
                                    : "text-white/90 hover:text-white hover:bg-white/10"
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
                {plans.map((plan) => {
                    const price = plan.prices[planType];
                    const desc = plan.desc[planType];
                    const discountPercent = getDiscountPercent(plan.title, planType);
                    const showDiscount = plan.title !== "CORE" && planType !== "monthly" && discountPercent > 0;

                    return (
                        <div
                            key={plan.id}
                            className={`relative overflow-hidden px-8 py-8 border rounded-2xl bg-white/50 backdrop-blur-sm flex flex-col gap-6 transition-all duration-300 hover:scale-105 ${plan.glow
                                    ? "shadow-2xl"
                                    : "shadow-lg hover:shadow-xl border-gray-200"
                                }`}
                        >
                            {/* Background Glow */}
                            <Image
                                src="/images/price-page/card-glow.png"
                                alt="card glow"
                                width={350}
                                height={300}
                                className="absolute -top-5 -right-7 opacity-30 z-0"
                            />

                            {/* Popular Badge */}
                            {plan.isPopular && (
                                <div className="absolute rotate-45 translate-x-12 -right-10 text-center bg-blue-500 text-white text-xs font-semibold w-[280px] py-1 shadow-lg z-20">
                                    MOST POPULAR
                                </div>
                            )}

                            {/* Discount Badge */}
                            {showDiscount && (
                                <div className="absolute top- left-1/2 transform top-4 -translate-x-1/2 -translate-y-1/2 font-bold text-lg text-red-500 px-3 py-1 rounded">
                                    <p className="text-center">SAVE {discountPercent}%</p>
                                </div>
                            )}

                            <div className="relative z-10 text-center">
                                {/* Admin Edit Button */}
                                {isAdmin && (
                                    <button
                                        onClick={() => handleEditClick(plan)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 transition-colors shadow-md"
                                    >
                                     Edit Price
                                    </button>
                                )}

                                <h2 className="text-2xl text-gray-800 font-bold mb-4">{plan.title}</h2>

                                <div className="flex justify-center items-start gap-1 mt-2">
                                    <BsCurrencyDollar className="text-3xl mt-2 text-gray-600" />
                                    <div>
                                        <p className="text-5xl font-extrabold text-gray-900">{price}</p>
                                        <sup className="text-sm text-gray-500 capitalize">per video</sup>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 mt-2 bg-gray-50 py-2 px-4 rounded-full inline-block">
                                    ${desc} <span className="capitalize">per month</span>
                                </p>

                                <ul className="space-y-4 mt-8 text-left">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex gap-3 items-start">
                                            <DiamondIcon type={feature.type} />
                                            <span className="text-sm text-gray-700">{feature.text}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleSubscribe(plan.title)}
                                    disabled={isTrialLoading || (isTrial && isSubscribed)}
                                    className={`w-full mt-9 py-3.5 rounded-xl font-medium transition-all duration-200 ${plan.glow
                                            ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                                            : "bg-blue-600 hover:bg-blue-700 text-white"
                                        } disabled:opacity-60 disabled:cursor-not-allowed`}
                                >
                                    {isTrialLoading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="animate-spin">⚪</span>
                                            Processing...
                                        </span>
                                    ) : (
                                        getButtonText(plan.title)
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Edit Modal */}
            <PriceUpdateModal
                plan={selectedPlan}
                currentPeriod={planType}
                currentPrice={selectedPlan?.prices[planType] || 0}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSave={handleSavePlan}
            />
        </div>
    );
}
"use client";

import { useState } from "react";
import ComparePlans from "./components/Editing/ComparePlans/ComparePlans";
import { PlanType } from "@/components/shared/ToggleSwitch";
import PriceBanner from "./components/PriceCarosel/PriceBanner";

const PricingPage = () => {
  const [planType, setPlanType] = useState<PlanType>("monthly");

  return (
    <div className='w-full relative lg:pb-24 overflow-hidden'>
      <div className='relative z-10 flex flex-col space-y-12 lg:space-y-0'>
        <PriceBanner value={planType} onToggleChange={setPlanType} />
        <ComparePlans />
      </div>
    </div>
  );
};

export default PricingPage;


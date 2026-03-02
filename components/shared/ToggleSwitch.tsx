"use client";

import { useState } from "react";

export type PlanType = "monthly" | "semiannual" | "annual";

interface ToggleSwitchProps {
  value?: PlanType;
  onChange?: (value: PlanType) => void;
}

const ToggleSwitch = ({ value = "monthly", onChange }: ToggleSwitchProps) => {
  const [active, setActive] = useState < PlanType > (value);

  const handleChange = (plan: PlanType) => {
    setActive(plan);
    onChange?.(plan);
  };

  const baseClass =
    "px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer";
  const activeClass = "bg-white text-black shadow";
  const inactiveClass = "text-white/80";

  return (
    <div className="inline-flex bg-[#a1b8f4] gap-2 rounded-full p-2">
      <button
        onClick={() => handleChange("monthly")}
        className={`${baseClass} ${active === "monthly" ? activeClass : inactiveClass
          }`}
      >
        Monthly
      </button>

      <button
        onClick={() => handleChange("semiannual")}
        className={`${baseClass} ${active === "semiannual" ? activeClass : inactiveClass
          }`}
      >
        Semiannual
      </button>

      <button
        onClick={() => handleChange("annual")}
        className={`${baseClass} ${active === "annual" ? activeClass : inactiveClass
          }`}
      >
        Annual
      </button>
    </div>
  );
};

export default ToggleSwitch;




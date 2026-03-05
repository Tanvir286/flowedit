// components/PlanUpdateModal.tsx
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateSubPlanMutation } from "@/redux/features/payment/subscription";
import { Plan, PeriodType, PlanUpdateModalProps } from "./subscription";

export default function PriceUpdateModal({
    plan,
    isOpen,
    onClose,
    onSave,
    currentPeriod,
    currentPrice,
}: PlanUpdateModalProps) {
    const [updatePlan, { isLoading: isUpdating }] = useUpdateSubPlanMutation();
    const [price, setPrice] = useState(currentPrice || 0);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (plan) {
            setPrice(currentPrice || 0);
        }
    }, [plan, currentPrice, currentPeriod]);

    const handleSave = async () => {
        if (!plan) return;

        setIsSaving(true);
        try {
            // Find the correct subscription ID from backend
            // This is a simplified version - you'll need to implement proper ID lookup
            const subscriptionId = getSubscriptionId(plan.title, currentPeriod);

            if (!subscriptionId) {
                toast.error("Could not find subscription ID");
                return;
            }



            await updatePlan({
                id: subscriptionId,
                data: { price: price.toString() }
            }).unwrap();

            onSave(plan, currentPeriod, price);
            toast.success(`${plan.title} ${currentPeriod} price updated to $${price}!`);
            onClose();
        } catch (err: any) {
            console.error("Failed to update plan:", err);
            toast.error(err?.data?.message || "Failed to update plan");
        } finally {
            setIsSaving(false);
        }
    };

    // Helper function to get subscription ID (implement based on your data structure)
    const getSubscriptionId = (planTitle: string, period: PeriodType): string | null => {
        // This should be implemented to return the correct ID from your data
        // For now, return a mock ID
        const mockIds: Record<string, string> = {
            "CORE_monthly": "cmmbtmajc000002nk85hsm6hd",
            "CORE_semiannual": "cmmbtqsos0000029s4vljcqeg",
            "CORE_annual": "cmmbtr1u20001029sub25wvcz",
            "GROWTH_monthly": "cmmbtrl650002029s9rpfkipn",
            "GROWTH_semiannual": "cmmbtrzsc0003029smq3ux5iz",
            "GROWTH_annual": "cmmbtt4zg0004029smqsr2di9",
            "PLUS_monthly": "cmmbtw0w60000027of2wk98fk",
            "PLUS_semiannual": "cmmbtwf050001027ottnainjx",
            "PLUS_annual": "cmmbtwsfq0002027o2xr2gval",
        };

        return mockIds[`${planTitle}_${period}`] || null;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg w-full">
                <DialogHeader>
                    <DialogTitle className="text-xl">
                        Edit {plan?.title} - <span className="capitalize">{currentPeriod}</span> Price
                    </DialogTitle>
                </DialogHeader>

                <div className="mt-6 space-y-4">
                    <div className="flex items-center gap-4">
                        <label htmlFor="price" className="w-24 font-medium text-gray-700">
                            Price ($):
                        </label>
                        <Input
                            id="price"
                            type="number"
                            min="0"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="flex-1"
                            placeholder="Enter price"
                        />
                    </div>

                    {price !== currentPrice && (
                        <p className="text-sm text-amber-600 ml-28">
                            Current price: ${currentPrice}
                        </p>
                    )}
                </div>

                <DialogFooter className="mt-8 flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isSaving || isUpdating}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isSaving || isUpdating || price === currentPrice}
                        className="bg-blue-600 hover:bg-blue-700 min-w-[100px]"
                    >
                        {isSaving || isUpdating ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-spin">⚪</span>
                                Saving...
                            </span>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
"use client";

import { useMemo } from "react";
import Row from "./Row";
import Cell from "./Cell";
import { useAppSelector } from "@/redux/hooks";
import { useGetPlansQuery } from "@/redux/features/plansApi";
import ComparePlansModal from "../UpdateComparism";
import Image from "next/image";

export interface PlanType {
  id: string;
  name: string;
  price: number;
  unlimitedVideos: boolean;
  branding: boolean;
  thumbnails: boolean;
  seo: number;
}

export default function ComparePlans() {

  const { data, isLoading } = useGetPlansQuery(undefined);
  const role = useAppSelector((state) => state.auth.role);
  const isAdmin = role === "ADMIN";


  const plans: PlanType[] = useMemo(() => {
    if (!data?.data) return [];

    return data.data.map((item: any) => ({
      id: item.id,
      name: item.type,
      price: item.per_video,
      unlimitedVideos: item.unlimited_videos,
      branding: item.branding,
      thumbnails: item.custom_thumbnail,
      seo: item.seo_optimization,
    }));
  }, [data]);

  const renderBool = (value: boolean) => (value ? "✓" : "—");


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative overflow-hidden py-10">
      <div
        className='pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-[800px] z-0'
        style={{
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #7FCCE9 30.29%, #57b2fc 66.53%, #D6E1EA 88.26%, #FFFFFF 100%)",
        }}
      />
          <Image
               src='/images/compareblur.png'
              alt='faq'
             height={400}
              width={500}
            className='absolute w-full h-[700px] '></Image>
      <div className="relative z-20">
        <h2 className="text-center text-4xl font-semibold mb-16">
          Compare Plans
        </h2>

        <div className="container rounded-3xl bg-[#89cceb]/25 p-4 lg:p-16 ">

          <div className="flex justify-end mb-6">
            {isAdmin && <ComparePlansModal plans={plans} />}
          </div>

          <div className="grid grid-cols-5 border-b border-white/40 gap-[15px]">
            <div />
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="py-6 pl-5 text-center font-medium rounded-t-2xl bg-white/30"
              >
                {plan.name}
              </div>
            ))}
          </div>

          <Row>
            <Cell left>Per video</Cell>
            {plans.map((plan) => (
              <Cell key={plan.id}>${plan.price}</Cell>
            ))}
          </Row>

          <Row>
            <Cell left>Unlimited Videos</Cell>
            {plans.map((plan) => (
              <Cell key={plan.id}>
                {renderBool(plan.unlimitedVideos)}
              </Cell>
            ))}
          </Row>

          <Row>
            <Cell left>Branding Included</Cell>
            {plans.map((plan) => (
              <Cell key={plan.id}>
                {renderBool(plan.branding)}
              </Cell>
            ))}
          </Row>

          <Row>
            <Cell left>Custom Thumbnails</Cell>
            {plans.map((plan) => (
              <Cell key={plan.id}>
                {renderBool(plan.thumbnails)}
              </Cell>
            ))}
          </Row>

          <Row last>
            <Cell left>SEO Optimization</Cell>
            {plans.map((plan) => (
              <Cell key={plan.id}>{plan.seo} days</Cell>
            ))}
          </Row>

        </div>
     </div>
    </section>
  );
}


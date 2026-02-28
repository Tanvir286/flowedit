/** @format */

import Banner from "@/components/homePage/Banner/Banner";
import Faq from "@/components/homePage/Faq/Faq";
// import LovedByCreatorsSection from "@/components/homePage/LoveCreation/LoveCreation";
import WorkFlowSection from "@/components/homePage/WorkFlow/WorkFlow";
import WorkflowSection from "@/components/homePage/WorkFlow/WorkFlow";
import Head from "next/head";
import LovedByCreatorsSection from "./portfolio/components/LoveCreator";
import Duies2ndPart from "@/components/homePage/Duies2ndPart/Duies2ndPart";
import GetStarted from "@/components/homePage/GetStarted/Getstarted";

// import Navbar from "@/components/shared/navbar/Navbar";

export default function HomePage() {
  return (
    <div className='w-full  -mt-32 md:mt-0 lg:pb-20'>
      <div className='flex flex-col space-y-12 lg:space-y-0'>
        {/* <Navbar /> */}
        <Banner />
        {/* <WorkFlowSection /> */}
        <WorkflowSection />
        <Duies2ndPart />
        <LovedByCreatorsSection />
        {/* <LovedByCreatorsSection /> */}
        <Faq />

        {/* <Footer /> */}
      </div>
    </div>
  );
}

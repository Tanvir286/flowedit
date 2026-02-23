/** @format */

"use client";

import PortfolioBanner from "./components/PortfolioBanner";
// import Footer from "@/components/shared/Footer/Footer";
// import Navbar from "@/components/shared/Navbar/Navbar";
import Image from "next/image";
import Head from "next/head";
import { useEffect } from "react";
import Faq from "@/components/homePage/Faq/Faq";
import PortfolioShowcase from "./components/PortfolioShowcase";
import LovedByCreatorsSection from "./components/LoveCreator";
import ProjectShowcase from "./components/DuisConvalish";
import GetStarted from "@/components/homePage/GetStarted/Getstarted";

const PortfolioPage = () => {
  
  return (
    <div className='relative bg-white w-full'>
      <div className='w-full '>
        <div className=''>
          {/* <Navbar /> */}
          <PortfolioBanner />
          <ProjectShowcase />
          {/* <PortfolioShowcase /> */}
          <LovedByCreatorsSection />
          <Faq />
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;

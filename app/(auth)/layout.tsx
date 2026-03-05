/** @format */

import { ReactNode } from "react";
import FluidContainer from "@/components/layout/FluidContainer";
import AuthSync from "../(main)/pricing/components/AuthAsync";

const PublicLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className='font-inter'>
      <main>
     
        {children}</main>
    </div>
  );
};

export default PublicLayout;

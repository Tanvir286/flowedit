/** @format */

import { ReactNode } from "react";


const PublicLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className='font-inter'>
      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;

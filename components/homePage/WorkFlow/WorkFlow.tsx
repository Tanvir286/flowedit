/** @format */

"use client";

import SiteButton from "@/components/shared/SiteButton";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Project Name",
    description:
      "Share your footage and any relevant media assets via the upload portal",
    imageSrc: "/images/upload (2).png",
  },
  {
    id: 2,
    title: "Project Name",
    description:
      "Your video is given an eye-catching thumbnail, tags, optimized for success and posted using our full service process.",
    imageSrc: "/images/home-page/workflow-3.png",
  },
  {
    id: 3,
    title: "Project Name",
    description:
      "Our team of editors cuts, polishes, and optimizes a video to match your goals and audience.",
    imageSrc: "/images/home-page/workflow-2.png",
  },
];

export default function WorkFlowSection() {
  return (
    <section
      className='relative py-10 lg:py-16'
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #7EA7CC 37.29%, rgba(255, 255, 255, 0) 100%)",
      }}>
      <Image
        src='/images/back/border.svg'
        alt='sdf'
        height={500}
        width={500}
        className='h-full w-full absolute '></Image>
      <Image
        src='/images/back/dhew.png'
        alt='sdf'
        height={500}
        width={500}
        className='h-full w-full absolute '></Image>
      <p className='text-center text-3xl container md:text-4xl lg:text-[54px] font-semibold  pb-[42px]'>
        A Simple Powerful Workflow
      </p>

      {/* Top cards */}
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-20'>
        {projects.map(({ id, title, description, imageSrc }) => (
          <div
            key={id}
            className='bg-[#e4ebf4] border bg-opacity-50 backdrop-blur-md rounded-xl shadow-lg p-2.5 flex flex-col'>
            <div className='relative w-full h-40 rounded-lg overflow-hidden mb-6'>
              <Image
                src={imageSrc}
                alt={title}
                width={369}
                height={241}
                className='object-cover w-full'
              />
            </div>
            <h3 className='font-semibold text-2xl md:text-3xl mb-2.5 leading-100%'>
              {title}
            </h3>
            <p className='text-[#000000B2] text-base font-normal'>
              {description}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom section */}
      <div className='container mx-auto flex flex-col lg:flex-row items-center gap-[108px]'>
        <div className='relative w-full lg:w-1/2 h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg'>
          <Image
            src='/images/back/glack.png'
            alt='Large project'
            fill
            className=' rounded-xl'
          />
        </div>

        <div className='w-full lg:w-1/2'>
          <h2 className='text-3xl md:text-4xl lg:text-[54px] font-semibold  mb-5.5 '>
            Duis convallis elit blandit turpis
          </h2>
          <p className='text-[#000000B2] font-normal text-lg mb-5.5 leading-relaxed'>
            Tellus fermentum laoreet dignissim risus scelerisque pretium
            ullamcorper pretium. Sapien ut tellus ut hendrerit mauris. Varius
            dui sed vestibulum quis tellus egestas dolor eget magna. Dui
            imperdiet interdum parturient vitae. Nunc gravida lobortis ut ut in
            nisl facilisis amet. Aenean feugiat ultrices mauris gravida iaculis.
            Amet sem.
          </p>
          <div className='w-full sm:w-fit shadow-2xl'>
            <SiteButton className='bg-[#B6C7F5]/30 w-full hover:bg-[#B6C7F5]/30'>
              Start for Free
            </SiteButton>
          </div>
        </div>
      </div>
    </section>
  );
}



// // export default WorkflowSection;

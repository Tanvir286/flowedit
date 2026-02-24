/** @format */

import SiteButton from "@/components/shared/SiteButton";
import Image from "next/image";

// app/components/PortfolioSection.jsx
// or pages/components/PortfolioSection.jsx

const portfolioItems = [
  {
    id: 1,
    title: "Project Name",
    desc: "Share your footage and any relevant media assets via the upload portal",
    bg: "/images/upload (2).png",
  },
  {
    id: 2,
    title: "Project Name",
    desc: "Our team of editors cuts, polishes, and optimizes a video to match your goals and audience.",
    bg: "/images/home-page/workflow-3.png",
  },
  {
    id: 3,
    title: "Project Name",
    desc: "Your video is given an eye-catching thumbnail, tags, optimized for success and posted using our full service process. ",
    bg: "/images/home-page/workflow-2.png",
  },
  {
    id: 4,
    title: "Project Name",
    desc: "Our team of editors cuts, polishes, and optimizes a video to match your goals and audience.",
    bg: "/images/home-page/workflow-3.png",
  },
  {
    id: 5,
    title: "Project Name",
    desc: "Share your footage and any relevant media assets via the upload portal",
    bg: "/images/upload (2).png",
  },
  {
    id: 6,
    title: "Project Name",
    desc: "Your video is given an eye-catching thumbnail, tags, optimized for success and posted using our full service process. ",
    bg: "/images/home-page/workflow-2.png",
  },
];

export default function PortfolioBanner() {
  return (
    <section className='relative w-full  pt-24 pb-6'>
      <div
        className='
        absolute inset-0
        bg-gradient-to-b from-[#6386f1] to-[rgba(255,255,255,0)]
        z-0
      '
      />
      <div
        className='absolute -top-20 block lg:hidden left-0 right-0 bottom-0 w-full h-screen z-0  bg-contain'
        style={{
          backgroundImage: "url('/images/smallBg.png')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // maskImage:
          //   "linear-gradient(to bottom, black 0%, black 50%, black 70%, rgba(0,0,0,0.5) 85%, rgba(0,0,0,0.1) 95%, transparent 100%)",
          // WebkitMaskImage:
          //   "linear-gradient(to bottom, black 0%, black 50%, black 70%, rgba(0,0,0,0.5) 85%, rgba(0,0,0,0.1) 95%, transparent 100%)",
        }}
      />
      <Image
        src='/images/back/border.svg'
        alt='fdf'
        height={500}
        width={500}
        className='absolute w-full h-full lg:-top-20'></Image>
      <Image
        src='/images/back/dhew.png'
        alt='fdf'
        height={500}
        width={500}
        className='absolute hidden lg:block w-full h-full'></Image>
      <Image
        src='/images/back/Wallpaper Blur.png'
        alt='fdf'
        height={500}
        width={500}
        className='absolute w-full h-full -top-30'></Image>

      {/* Content */}
      <div className='relative z-10 container mx-auto  px-6 text-center pt-25 lg:pt-20'>
        {/* Header */}
        <h2 className='text-4xl md:text-5xl font-bold text-white mb-4'>
          Check out our portfolio
        </h2>

        <p className='max-w-2xl mx-auto text-white/80 mb-8 text-sm md:text-base'>
          Nullam egestas et in tristique faucibus. Mauris quis posuere lorem
          tincidunt phasellus auctor tortor. Sit id neque tincidunt ac nibh
          varius aliquam tincidunt. Habitant egestas donec diam scelerisque
          donec aenean odio mattis. Lacus tempus est congue ultricies in
          vestibulum aenean. Enim aliquet nunc hac eget.
        </p>

        <div className='w-full  lg:flex justify-center items-center mx-auto mb-[128px]'>
          <SiteButton className='bg-[#B6C7F5]/30 w-full hover:bg-[#B6C7F5]/30'>
            Start for Free
          </SiteButton>
        </div>

        {/* Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left '>
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className='bg-[#e9e8f6] rounded-xl shadow-md overflow-hidden p-2.5'>
              {/* Image Placeholder */}
              <Image
                src={item.bg}
                alt='dsafads'
                height={241}
                width={369}
                className='w-full'
              />

              {/* Card Content */}
              <div className='p-5'>
                <h3 className='font-semibold text-2xl md:text-3xl mb-2.5 leading-100%'>
                  {item.title}
                </h3>
                <p className='text-[#000000B2] text-base font-normal'>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


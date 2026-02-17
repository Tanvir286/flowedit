"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BsCurrencyDollar } from "react-icons/bs";
import { toast } from "sonner";
import DiamondIcon from "@/components/shared/DiamondCheckIcon";
import { useCreateTrileMutation } from "@/redux/features/payment/paymentApi";
import { useAppSelector } from "@/redux/hooks";

export type FeatureType = "check" | "minus";

interface Feature {
  text: string;
  type: FeatureType;
}

interface PriceCardProps {
  id: number;
  title: string;
  price: number;
  features: Feature[];
  glow?: boolean;
  desc?: string;
  packageType?: string;
  monthlyPakage?: string;
  isPopular?: boolean;
  discount?: boolean;
}

export default function PriceCard({
  title,
  desc,
  price,
  packageType,
  monthlyPakage,
  features,
  glow = false,
  isPopular = false,
  discount = false,
}: PriceCardProps) {
  const token = useAppSelector((state) => state.auth.token);
  const [createTrial, { isLoading }] = useCreateTrileMutation();
  const router = useRouter();

  const handleSubscribe = async () => {
    try {
      const response = await createTrial({ plan: title, interval: packageType }).unwrap();
      if (response.success) {
        toast.success("Trial started successfully");
        setTimeout(() => router.push("/"), 500);
        return;
      }
      toast.warning("You need to subscribe to continue");
      setTimeout(() => router.push("/subscribe"), 800);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong. Please subscribe.");
      setTimeout(() => router.push("/"), 800);
    }
  };

  const redirectUrl = !token ? "/signup" : "/subscribe";

  return (
    <div className={`relative overflow-hidden px-10 py-8 border rounded-lg bg-white/40 flex flex-col gap-6 ${glow ? "shadow-xl" : ""}`}>
      <Image src="/images/price-page/card-glow.png" alt="card glow" width={350} height={300} className="absolute -top-5 -right-7 transform opacity-30 z-0" />
      <div className="relative z-10 text-center">
        {isPopular && (
          <div className="absolute rotate-45 translate-x-12 -right-20 origin-center bg-blue-500 text-white text-xs font-semibold w-[280px] py-1 shadow-lg z-20">
            MOST POPULAR
          </div>
        )}

        <h2 className="text-sm text-gray-600">{title}</h2>
   <div className="flex justify-center items-center gap-1">
  <BsCurrencyDollar />
  <p className="text-5xl font-bold">{price}</p>
  
    {(title === "GROWTH" || title === "PLUS") && discount && packageType === "MONTHLY" && (
    <div className=" px-2 py-1 rounded text-sm inline-block ml-2 font-bold">
      15% 
    </div>
  )}
</div>

        <p className="text-sm text-gray-500">{desc}</p>
        {/* <p className="text-xs">{monthlyPakage}</p> */}

        <ul className="space-y-5 mt-5">
          {features.map((f, i) => (
            <li key={i} className="flex gap-3">
              <DiamondIcon type={f.type} />
              <span>{f.text}</span>
            </li>
          ))}
        </ul>

        {token ? (
          <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white text-center mt-9 py-2 rounded-xl disabled:opacity-60"
          >
            {isLoading ? "Please wait..." : "Start 14 Days Trial"}
          </button>
        ) : (
          <Link href={redirectUrl} className="w-full bg-blue-600 text-white text-center mt-9 py-2 rounded block">
            Start 14 Days Trial
          </Link>
        )}
      </div>
    </div>
  );
}


// "use client";
// import { useRouter } from "next/navigation";
// import { BsCurrencyDollar } from "react-icons/bs";
// import DiamondIcon from "@/components/shared/DiamondCheckIcon";
// import Link from "next/link";
// import { useAppSelector } from "@/redux/hooks";
// import { useCreateTrileMutation } from "@/redux/features/payment/paymentApi";

// export type FeatureType = "check" | "minus";

// interface Feature {
//   text: string;
//   type: FeatureType;
// }

// interface PriceCardProps {
//   id: number;
//   title: string;
//   price?: number;
//   features: Feature[];
//   glow?: boolean;
//   desc?: string;
//   packageType?: string;
//   monthlyPakage?: string;
// }

// export default function PriceCard({
//   title,
//   desc,
//   price,
//   packageType,
//   monthlyPakage,
//   features,
//   glow = false,
// }: PriceCardProps) {

//   const token = useAppSelector((state) => state.auth.token);

//   // const subscription = useAppSelector(
//   //   (state) => state.auth.subscription
//   // );

//   console.log(" price card",title, monthlyPakage);
//   const [createTrial, { isLoading }] = useCreateTrileMutation();

//   const router = useRouter();
//   const handleSubscribe = async () => {
//     console.log("Subscribe button clicked");

//     console.log("plan and interval", title, packageType);
//     // Implement subscription logic here


//     // try {
//     //   const response = await createTrial({
//     //     plan: title,
//     //     interval: packageType,
//     //   }).unwrap();

//     //   // ✅ THIS is your response
//     //   console.log("API RESPONSE 👉", response.data);

//     //   // example usage

//     // } catch (error) {
//     //   console.error("Create trial failed ❌", error);
//     // }
//     // const result = await createTrial({
//     //   plan: title,
//     //   interval: packageType,
//     // });

//     // if ("data" in result) {
//     //   console.log(result.data);
//     // }
//     try {
//       const response = await createTrial({
//         plan: title,
//         interval: packageType,
//       }).unwrap();

//       console.log("API RESPONSE 👉", response);

//       // ❌ success false → subscription page
//       if (response.success === false) {
//         toast.error("You already used your free trial. Please subscribe.");
//         router.push("/pricing");
//         return;
//       }

//       toast.success("Trial started successfully 🎉");
//       // ✅ success true → backend decides
//       if (response.redirectUrl) {
//         router.push(response.redirectUrl);
//       } else {
//         router.push("/dashboard");
//       }

//     } catch (error) {
//       console.error("Create trial failed ❌", error);
//       router.push("/pricing");
//     }


//   }

//   // console.log("token in price card",token)

//   const hasActiveSubscription = false;

//   const redirectUrl = !token ? "/signup" : "/trial-create";

//   return (
//     <div className="relative p-6 border rounded-lg bg-white flex flex-col gap-6">
//       <div className="text-center">
//         <h2 className="text-sm text-gray-600">{title}</h2>
//         <div className="flex justify-center items-center gap-1">
//           <BsCurrencyDollar />
//           <span className="text-5xl font-bold">{price}</span>
//         </div>
//         <p className="text-sm text-gray-500">{desc}</p>
//         <p className="text-xs">{monthlyPakage}</p>
//       </div>

//       <ul className="space-y-3">
//         {features.map((f, i) => (
//           <li key={i} className="flex gap-3">
//             <DiamondIcon type={f.type} />
//             <span>{f.text}</span>
//           </li>
//         ))}
//       </ul>

//       {/* CTA */}
//       {hasActiveSubscription ? (
//         <button
//           disabled
//           className="bg-gray-400 text-white py-2 rounded cursor-not-allowed"
//         >
//           Subscription Active
//         </button>
//       ) : (

//           // <button className="w-full bg-blue-600 text-white cursor-pointer py-2 rounded">
//           //   {token ? "Start 14 Days Trial" : "Sign up to Start Trial"}
//           // </button>

//          <>
//             {
//               token ? (
//                 <button onClick={handleSubscribe} className="w-full bg-blue-600 text-white text-center py-2 rounded block">
//                   Start 14 Days Trial
//                 </button>
//             ) : (
//             <Link href={redirectUrl} className="w-full bg-blue-600 text-white text-center py-2 rounded block">
//               Sign up to Start Trial

//             </Link>
//             )
//           }

//           </>

//       )}

//       {hasActiveSubscription && (
//         <p className="text-xs text-red-500 text-center">
//           You already have an active subscription.
//         </p>
//       )}
//     </div>
//   );
// }


// /** @format */

// "use client";

// import Image from "next/image";
// import { BsCurrencyDollar } from "react-icons/bs";
// import { GoCreditCard } from "react-icons/go";
// import DiamondIcon from "@/components/shared/DiamondCheckIcon";
// import Link from "next/link";
// import { useAppSelector } from "@/redux/hooks";

// export type FeatureType = "check" | "minus";

// interface Feature {
//   text: string;
//   type: FeatureType;
// }

// interface PriceCardProps {
//   id: number;
//   title: string;
//   price: number;
//   features: Feature[];
//   glow?: boolean;
//   desc?: string;
//   monthlyPakage?: string;
// }

// const PriceCard = ({
//   id,
//   title,
//   desc,
//   price,
//   monthlyPakage,
//   features,
//   glow = false,
// }: PriceCardProps) => {
//   const token = useAppSelector((state) => state.auth.token);

//   // ✅ destination decide
//   const redirectUrl = token ? "/subscribe" : "/singup";



//    const tokenss =  localStorage.getItem("token")



//    console.log("token from price card",tokenss)

//   // const redirectUrl =
//   //   token ?
//   //     `/subscribe?price=${price}&plan=${title}`
//   //   : `/signup?price=${price}&plan=${title}`;

//   return (
//     <div className='relative py-6 lg:py-12 px-4 lg:px-12 shadow-lg border border-white/25 rounded-[10px] bg-white/50 overflow-hidden flex flex-col items-center gap-8'>
//       {glow && (
//         <div className='absolute inset-0 pointer-events-none -top-10 z-10 opacity-40' />
//       )}
//       <div className='absolute inset-0 pointer-events-none -top-10 z-10 opacity-30'>
//         <Image
//           src='/images/price-page/card-glow.png'
//           alt='card glow bg'
//           fill
//           className='object-cover'
//         />
//       </div>

//       <div className='flex flex-col items-center relative z-20'>
//         <h1 className='font-medium text-sm text-black/70'>{title}</h1>

//         <div className='flex items-center gap-1'>
//           <BsCurrencyDollar className='text-3xl text-black/70' />
//           <h1 className='font-semibold text-6xl -tracking-[0.04em] text-black'>
//             {price}
//           </h1>
//         </div>

//         <h1 className='font-medium text-sm text-black/70'>{desc}</h1>
//         <button>{monthlyPakage}</button>
//       </div>

//       <div className='h-px w-[95%] bg-black/15' />

//       <ul className='flex flex-col gap-6 relative z-20'>
//         {features.map((f, i) => (
//           <li key={i} className='flex items-center gap-4'>
//             <DiamondIcon type={f.type} />
//             <p className='text-base text-black/70 leading-[154%]'>{f.text}</p>
//           </li>
//         ))}
//       </ul>

//       <div className='h-px w-[95%] bg-black/15' />

//       {/* ✅ Conditional navigation */}
//       <div className='w-fit shadow-xl relative z-20 rounded-lg'>
//         <Link href={redirectUrl}>
//           <div className='flex items-center gap-2 bg-[#3495fd] text-white py-1.5 px-4 rounded-lg cursor-pointer'>
//             <span>
//               {token ? "Start 14 Days Trial" : "Start 14 Days Trial"}
//             </span>
//             <GoCreditCard />
//           </div>
//         </Link>
//         {/* <Link href={redirectUrl}>
//           <div className='flex items-center gap-2 bg-[#3495fd] text-white py-1.5 px-4 rounded-lg cursor-pointer'>
//             <span>
//               {token ? "Proceed to Payment" : "Sign up to Start Trial"}
//             </span>
//             <GoCreditCard />
//           </div>
//         </Link> */}
//       </div>
//     </div>
//   );
// };

// export default PriceCard;

// /** @format */

// import Image from "next/image";
// import { BsCurrencyDollar } from "react-icons/bs";
// import { GoCreditCard } from "react-icons/go";
// import SiteButton from "@/components/shared/SiteButton";
// import DiamondIcon from "@/components/shared/DiamondCheckIcon";
// import Link from "next/link";
// import { Toaster } from '@/components/ui/sonner';
// import { toast } from "sonner";
// import Image from "next/image";

// export type FeatureType = "check" | "minus";

// interface Feature {
//   text: string;
//   type: FeatureType;
// }

// interface PriceCardProps {
//   title: string;
//   price: number;
//   features: Feature[];
//   glow?: boolean;
//   desc?: string;
//   monthlyPakage?: string;
// }

// const PriceCard = ({
//   title,
//   desc,
//   price,
//   monthlyPakage,
//   features,
//   glow = false,
// }: PriceCardProps) => {
//   return (
//     <div className='relative py-6 lg:py-12 px-4 lg:px-12 shadow-lg border border-white/25 rounded-[10px] bg-white/50 overflow-hidden flex flex-col items-center gap-8'>
//       {glow && (
//         <div className='absolute inset-0 pointer-events-none -top-10 z-10 opacity-40'>
//           {/* <Image
//             src='/images/back/Wallpaper Blur.png'
//             alt='card glow bg'
//             fill
//             className='object-cover'
//           /> */}
//         </div>
//       )}

//       <div className='absolute inset-0 pointer-events-none -top-10 z-10 opacity-30'>
//         <Image
//           src='/images/price-page/card-glow.png'
//           alt='card glow bg'
//           fill
//           className='object-cover'
//         />
//       </div>
//       <div className='flex flex-col items-center relative z-20'>
//         <h1 className='font-medium text-sm text-black/70'>{title}</h1>

//         <div className='flex items-center gap-1'>
//           <BsCurrencyDollar className='text-3xl text-black/70' />
//           <h1 className='font-semibold text-6xl -tracking-[0.04em] text-black'>
//             {price}
//           </h1>
//         </div>

//         <h1 className='font-medium text-sm text-black/70'>{desc}</h1>
//         <button>{monthlyPakage}</button>
//       </div>

//       <div className='h-px w-[95%] bg-black/15' />

//       <ul className='flex flex-col gap-6 relative z-20'>
//         {features.map((f, i) => (
//           <li key={i} className='flex items-center gap-4'>
//             <DiamondIcon type={f.type} />
//             <p className='text-base text-black/70 leading-[154%]'>{f.text}</p>
//           </li>
//         ))}
//       </ul>

//       <div className='h-px w-[95%] bg-black/15' />

//       <div className='w-fit shadow-xl relative z-20 rounded-lg'>
//         <Link href='/stripe-payment'>
//           {" "}
//           <div className='flex items-center gap-2 bg-[#3495fd] text-white py-1.5 px-4 rounded-lg'>
//             <span>Start 14 Days Trial</span>
//             <GoCreditCard />
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PriceCard;

import Link from "next/link";

import { SparklesIcon, TrophyIcon } from "lucide-react";

import Gap from "@/components/Reusables/Gap";

export default function AreYouReady() {
  return (
    <section
      role="group"
      className="maxContainer flexCenter flex-col py-20 pSm"
    >
      <TrophyIcon size={40} className="text-primary" />
      <Gap height={4} />
      <div className="flexCenter flex-col text-center">
        <h2 className="font-bold text-3xl md:text-4xl tracking-tight">
          Are you ready to get started?
        </h2>
        <p className="dark:text-neutral-200 text-neutral-800 md:text-lg text-pretty leading-5">
          Start your journey with LazyReader today and unlock the power of audio
          summary for your eBooks.
        </p>
      </div>
      <Gap height={4} />
      <Link href={"/dashboard"} className="linkButton">
        <SparklesIcon size={14} />
        Get Started
      </Link>
    </section>
  );
}

import Link from "next/link";

import { SparklesIcon } from "lucide-react";

import Gap from "@/components/Reusables/Gap";
import { buttonVariants } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section
      role="group"
      className="maxContainer flexCenter flex-col py-20 pSm"
    >
      <h1 className="font-black md:text-5xl text-4xl tracking-tighter">
        Get audio summary of any eBook
      </h1>
      <Gap height={4} />
      <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-xl">
        Transform your reading experience with concise summaries and audio
        read-aloud features.
      </p>
      <Gap height={4} />
      <Link
        href="/dashboard"
        className={`${buttonVariants({
          variant: "default",
        })} animate-in fade-in slide-in-from-bottom-6 duration-500`}
      >
        <SparklesIcon className="mr-2 h-4 w-4" />
        Get Started
      </Link>
    </section>
  );
}

import Link from "next/link";

import { SparklesIcon } from "lucide-react";

import Gap from "@/components/Reusables/Gap";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      role="group"
      className="maxContainer flexCenter flex-col py-20 pSm"
    >
      <h1 className="font-black md:text-5xl text-4xl tracking-tighter text-center">
        Get audio summary of any eBook
      </h1>
      <Gap height={4} />
      <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-xl text-center">
        Transform your reading experience with concise summaries and audio
        read-aloud features.
      </p>
      <Gap height={4} />
      <Link
        href="/dashboard"
        className={`linkButton animate-in fade-in slide-in-from-bottom-6 duration-500`}
      >
        <SparklesIcon className="h-4 w-4" />
        Get Started
      </Link>
      <Gap height={10} />
      <Image
        src="/hero-img.webp"
        alt="Hero Image"
        width={600}
        height={500}
        sizes="(max-width: 1200px) 600px, 400px"
      />
    </section>
  );
}

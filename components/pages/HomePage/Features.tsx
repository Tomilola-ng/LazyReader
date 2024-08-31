/* eslint-disable react/no-unescaped-entities */
import Gap from "@/components/Reusables/Gap";
import { UploadCloudIcon } from "lucide-react";
import HowItWorksSection from "./HowItWorks";

export default function FeaturesSection() {
  return (
    <section role="group" className="textBg flexCenter flex-col py-20 pSm">
      <div className="flexCenter flex-col max-w-screen-sm text-center">
        <h2 className="font-bold text-3xl md:text-4xl tracking-tight">
          Struggling to Find Time to Read?
        </h2>
        <Gap height={4} />
        <p className="text-neutral-200 md:text-lg text-pretty leading-5">
          LazyReader helps you stay informed and inspired without sacrificing
          hours of your time.
        </p>
      </div>
      <Gap height={16} />
      <HowItWorksSection />
    </section>
  );
}

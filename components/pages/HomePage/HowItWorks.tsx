"use client";

import Gap from "@/components/Reusables/Gap";
import {
  ArrowDownIcon,
  PlayIcon,
  SparkleIcon,
  UploadCloudIcon,
} from "lucide-react";
import { motion } from "framer-motion";

function Step({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <motion.figure
      className="flexCenter flex-col gap-y-4 w-full md:w-fit"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-primary/25 rounded-full w-16 h-16 text-primary flexCenter text-3xl">
        <Icon />
      </div>
      <p className="text-neutral-800 md:text-lg text-pretty leading-5">
        {text}
      </p>
    </motion.figure>
  );
}

function DirectionArrow() {
  return (
    <motion.figure
      className="w-full md:w-fit flexCenter my-8 md:my-0"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <ArrowDownIcon className="md:-rotate-90" />
    </motion.figure>
  );
}

export default function HowItWorksSection() {
  return (
    <section
      role="group"
      id="how-it-works"
      className="flexBetween rounded p-6 md:py-8 bg-white text-neutral-800 flex-col w-full max-w-screen-lg text-center"
    >
      <h2 className="font-bold text-3xl md:text-4xl tracking-tight">
        How it works?
      </h2>
      <Gap height={10} />

      <div className="flexBetween flex-wrap w-full">
        <Step icon={UploadCloudIcon} text="Upload your eBooks" />
        <DirectionArrow />
        <Step icon={SparkleIcon} text="Generate Summary with AI" />
        <DirectionArrow />
        <Step icon={PlayIcon} text="Play the Audio Summary" />
      </div>
    </section>
  );
}

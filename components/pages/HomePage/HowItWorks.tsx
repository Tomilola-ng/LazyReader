import Gap from "@/components/Reusables/Gap";
import { UploadCloudIcon } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section
      role="group"
      className="flexCenter rounded p-3 bg-white text-neutral-800 flex-col max-w-screen-lg text-center"
    >
      <h2 className="font-bold text-3xl md:text-4xl tracking-tight">
        How it works?
      </h2>
      <Gap height={4} />

      <div className="flexBetween">
        <figure className="flexCenter flex-col gap-y-4 w-fit">
          <UploadCloudIcon />
          <p className="text-neutral-200 md:text-lg text-pretty leading-5">
            Upload your eBooks
          </p>
        </figure>
        <figure className="flexCenter flex-col gap-y-4 w-fit">
          <UploadCloudIcon />
          <p className="text-neutral-200 md:text-lg text-pretty leading-5">
            Upload your eBooks
          </p>
        </figure>
        <figure className="flexCenter flex-col gap-y-4 w-fit">
          <UploadCloudIcon />
          <p className="text-neutral-200 md:text-lg text-pretty leading-5">
            Upload your eBooks
          </p>
        </figure>
      </div>
    </section>
  );
}

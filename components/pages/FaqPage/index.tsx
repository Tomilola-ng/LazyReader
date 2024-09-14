"use client";
import Header from "@/components/Header";
import Gap from "@/components/Reusables/Gap";
import { FAQList } from "../../Reusables/FAQList";

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="flexCenter flex-col py-20 pSm" role="main">
        <h2 className="font-bold text-3xl md:text-4xl tracking-tight">
          Frequently Asked Questions
        </h2>
        <Gap height={20} />

        <div className="flexBetween flex-wrap max-w-screen-sm w-full">
          <FAQList />
        </div>
      </main>
    </>
  );
}

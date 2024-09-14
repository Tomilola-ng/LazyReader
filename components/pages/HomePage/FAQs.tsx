import Gap from "@/components/Reusables/Gap";
import { FAQList } from "../../Reusables/FAQList";

export default function FAQs() {
  return (
    <main
      role="main"
      id="faqs"
      className="maxContainer flexCenter flex-col py-20 pSm"
    >
      <h2 className="font-bold text-3xl md:text-4xl tracking-tight">
        Frequently Asked Questions
      </h2>
      <Gap height={10} />

      <div className="flexBetween flex-wrap max-w-screen-sm w-full">
        <FAQList />
      </div>
    </main>
  );
}

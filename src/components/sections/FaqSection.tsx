import { useState } from "react";
import { faqItems as localFaqItems } from "@/lib/navigation";

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  items?: FaqItem[];
}

function MinusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#535862" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 12H16" stroke="#535862" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#535862" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 12H16" stroke="#535862" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8V16" stroke="#535862" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function FaqSection({ items }: Props) {
  const faqItems = items?.length ? items : localFaqItems;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="relative z-[2] px-4 py-2 bg-brand-800">
      <div className="max-w-[1920px] mx-auto bg-bg-quaternary rounded-3xl py-16 lg:py-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-8 flex flex-wrap gap-10 lg:gap-16">
          {/* Left */}
          <div className="flex-1 min-w-0 lg:min-w-[480px] lg:max-w-[768px] flex flex-col gap-5">
            <h2 className="font-display text-4xl font-medium leading-[44px] tracking-[-0.72px] text-text-primary">
              Frequent Asked Questions
            </h2>
            <p className="text-lg font-normal leading-7 text-text-tertiary">
              Everything you need to know about the product and billing. Can't find the answer you're looking for? Please{" "}
              <a href="#" className="underline text-text-tertiary hover:text-text-primary transition-colors">
                chat to our friendly team
              </a>.
            </p>
          </div>

          {/* Right */}
          <div className="flex-1 min-w-0 lg:min-w-[480px] flex flex-col gap-4">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="cursor-pointer"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-base font-semibold leading-6 text-text-primary">
                    {item.question}
                  </span>
                  {openIndex === i ? <MinusIcon /> : <PlusIcon />}
                </div>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: openIndex === i ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="text-base font-normal leading-6 text-text-tertiary mt-1 pr-10">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

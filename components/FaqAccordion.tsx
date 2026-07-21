"use client";

import { useState } from "react";

interface Faq {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: Faq[];
  categoryName: string;
}

export default function FaqAccordion({ faqs, categoryName }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="mt-16 border-t pt-12">
      <p className="text-red-700 font-semibold uppercase tracking-[0.3em] mb-2 text-sm">
        Common Questions
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold mb-8">
        FAQs about {categoryName}
      </h2>

      <div className="space-y-3 max-w-3xl">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.question}
              className="border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                id={`faq-question-${index}`}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-gray-800 text-sm sm:text-base">
                  {faq.question}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`w-5 h-5 text-red-700 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                aria-hidden={!isOpen}
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

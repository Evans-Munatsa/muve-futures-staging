import React, { useState } from 'react';
import { FAQS_DATA } from '@/app/data/content';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const ReferralFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = ['All', 'Referrals & Commissioning', 'Curriculum & Delivery', 'Safeguarding & Reporting'];

  const filteredFaqs = activeTab === 'All'
    ? FAQS_DATA
    : FAQS_DATA.filter((f) => f.category === activeTab);

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="referral-faq" className="scroll-mt-24 py-16 lg:py-24 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <Badge variant="navy" className="text-xs uppercase tracking-widest font-extrabold">
            FREQUENTLY ASKED QUESTIONS
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#092233]">
            Commissioning & Provision Answers
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Common questions from Headteachers, SENCOs, Local Authority caseworkers, and families.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === cat
                  ? 'bg-[#092233] text-white shadow-sm'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Card
                key={faq.id}
                className="overflow-hidden border-neutral-200 bg-white transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                >
                  <span className="font-bold text-base text-[#092233]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#f05a28]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-0 text-neutral-600 text-sm leading-relaxed border-t border-neutral-100 mt-1">
                    <p className="pt-3">{faq.answer}</p>
                    <div className="mt-3">
                      <Badge variant="outline" className="text-[10px] text-neutral-400">
                        {faq.category}
                      </Badge>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

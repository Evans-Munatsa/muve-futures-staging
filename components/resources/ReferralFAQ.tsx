import React, { useMemo, useState } from 'react';
import type { ResourcesContent } from '@/lib/content/pages';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown } from 'lucide-react';

export const ReferralFAQ: React.FC<{ content: ResourcesContent['faqs'] }> = ({ content }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<string>('All');

  // Tabs come from the questions' own categories, so every tab has answers.
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(content.items.map((f) => f.category).filter(Boolean)))],
    [content.items]
  );

  const filteredFaqs = activeTab === 'All' ? content.items : content.items.filter((f) => f.category === activeTab);

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="referral-faq" className="scroll-mt-24 py-16 lg:py-24 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <Badge variant="navy" className="text-xs uppercase tracking-widest font-extrabold">
            {content.eyebrow}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink">
            {content.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            {content.intro}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveTab(cat);
                setOpenIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === cat
                  ? 'bg-brand-ink text-white shadow-sm'
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
                key={faq.question}
                className="overflow-hidden border-neutral-200 bg-white transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                >
                  <span className="font-bold text-base text-brand-ink">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-orange' : ''
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

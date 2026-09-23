import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { PageId } from '@/app/types';
import type { SiteChrome } from '@/lib/content/chrome-types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
  /** Opens a service's dedicated page. */
  onOpenService: (slug: string) => void;
  /** What can be searched: services, policies and FAQs from the CMS. */
  index: SiteChrome['search'];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenService,
  index,
}) => {
  const [query, setQuery] = useState('');

  const filteredServices = useMemo(() => {
    if (!query.trim()) return index.services.slice(0, 4);
    const q = query.toLowerCase();
    return index.services.filter(
      (s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    );
  }, [query, index]);

  const filteredPolicies = useMemo(() => {
    if (!query.trim()) return index.policies.slice(0, 3);
    const q = query.toLowerCase();
    return index.policies.filter(
      (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }, [query, index]);

  const filteredFaqs = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return index.faqs.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [query, index]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-lg font-bold text-brand-ink">Search Muve Futures Hub</DialogTitle>
        </DialogHeader>

        {/* Search Input Bar */}
        <div className="p-4 border-b border-neutral-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <Input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search provision (EOTAS, EBSNA, SEND, 1:1, Policies)..."
            className="border-0 shadow-none focus-visible:ring-0 text-base"
          />
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-6">
          
          {/* Services Matches */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              <Layers className="w-3.5 h-3.5 text-brand-green" />
              <span>Alternative Provision Services</span>
            </div>
            {filteredServices.length > 0 ? (
              <div className="space-y-2">
                {filteredServices.map((service) => (
                  <div
                    key={service.slug}
                    onClick={() => {
                      onClose();
                      onOpenService(service.slug);
                    }}
                    className="p-3 rounded-xl border border-neutral-100 hover:border-brand-green hover:bg-brand-green/5 transition flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-brand-ink group-hover:text-brand-green">
                          {service.title}
                        </h4>
                      </div>
                      <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                        {service.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-brand-green shrink-0" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-400 italic">No matching services found.</p>
            )}
          </div>

          {/* Statutory Documents & Policies */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-brand-orange" />
              <span>Policies & Commissioning Guidance</span>
            </div>
            <div className="space-y-2">
              {filteredPolicies.map((pol) => (
                <div
                  key={pol.title}
                  onClick={() => {
                    onClose();
                    onNavigate('resources');
                  }}
                  className="p-3 rounded-xl border border-neutral-100 hover:border-orange-300 hover:bg-orange-50/40 transition flex items-center justify-between cursor-pointer group"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                      {pol.category}
                    </span>
                    <h4 className="font-bold text-sm text-brand-ink">
                      {pol.title}
                    </h4>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-orange-500 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* FAQs Matches if query exists */}
          {filteredFaqs.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                Frequently Asked Questions
              </div>
              <div className="space-y-2">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.question}
                    onClick={() => {
                      onClose();
                      onNavigate('resources');
                    }}
                    className="p-3 rounded-xl border border-neutral-100 bg-neutral-50/50 hover:bg-neutral-100 transition cursor-pointer"
                  >
                    <p className="text-sm font-semibold text-brand-ink">{faq.question}</p>
                    <p className="text-xs text-neutral-600 mt-1 line-clamp-2">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Quick Links */}
        <div className="bg-neutral-50 px-6 py-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
          <span>Explore pages:</span>
          <div className="flex gap-3 font-semibold text-brand-ink">
            <button
              onClick={() => {
                onClose();
                onNavigate('who-we-support');
              }}
              className="hover:text-brand-green cursor-pointer"
            >
              Who We Support
            </button>
            <button
              onClick={() => {
                onClose();
                onNavigate('services');
              }}
              className="hover:text-brand-green cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => {
                onClose();
                onNavigate('contact');
              }}
              className="hover:text-brand-green cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
};

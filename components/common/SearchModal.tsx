import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { SERVICES_DATA, FAQ_ITEMS, POLICY_DOCUMENTS } from '../../data/content';
import { ServiceItem, PageId } from '@/app/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
// import { Badge } from '@/app/components/ui/badge';
import{ Badge } from "../ui/badge"

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (service: ServiceItem) => void;
  onNavigate: (page: PageId) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectService,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  const filteredServices = useMemo(() => {
    if (!query.trim()) return SERVICES_DATA.slice(0, 4);
    const q = query.toLowerCase();
    return SERVICES_DATA.filter(
      (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredPolicies = useMemo(() => {
    if (!query.trim()) return POLICY_DOCUMENTS.slice(0, 3);
    const q = query.toLowerCase();
    return POLICY_DOCUMENTS.filter(
      (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredFaqs = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return FAQ_ITEMS.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-lg font-bold text-[#092233]">Search Muve Futures Hub</DialogTitle>
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
              <Layers className="w-3.5 h-3.5 text-[#8cc63f]" />
              <span>Alternative Provision Services</span>
            </div>
            {filteredServices.length > 0 ? (
              <div className="space-y-2">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => {
                      onClose();
                      onSelectService(service);
                    }}
                    className="p-3 rounded-xl border border-neutral-100 hover:border-[#8cc63f] hover:bg-[#8cc63f]/5 transition flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-[#092233] group-hover:text-[#8cc63f]">
                          {service.name}
                        </h4>
                        {service.ageRange && (
                          <Badge variant="greenSoft" className="text-[10px] px-2 py-0.5">
                            {service.ageRange}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                        {service.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-[#8cc63f] shrink-0" />
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
              <BookOpen className="w-3.5 h-3.5 text-[#f05a28]" />
              <span>Policies & Commissioning Guidance</span>
            </div>
            <div className="space-y-2">
              {filteredPolicies.map((pol) => (
                <div
                  key={pol.id}
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
                    <h4 className="font-bold text-sm text-[#092233]">
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
                    key={faq.id}
                    onClick={() => {
                      onClose();
                      onNavigate('resources');
                    }}
                    className="p-3 rounded-xl border border-neutral-100 bg-neutral-50/50 hover:bg-neutral-100 transition cursor-pointer"
                  >
                    <p className="text-sm font-semibold text-[#092233]">{faq.question}</p>
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
          <div className="flex gap-3 font-semibold text-[#092233]">
            <button
              onClick={() => {
                onClose();
                onNavigate('who-we-support');
              }}
              className="hover:text-[#8cc63f] cursor-pointer"
            >
              Who We Support
            </button>
            <button
              onClick={() => {
                onClose();
                onNavigate('services');
              }}
              className="hover:text-[#8cc63f] cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => {
                onClose();
                onNavigate('contact');
              }}
              className="hover:text-[#8cc63f] cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
};

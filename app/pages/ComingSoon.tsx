import React, { useState } from 'react';
import {
  Sparkles,
  Mail,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  Users,
  Compass,
  ArrowLeft,
  Bell,
  Check,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { PageId } from '@/app/types';
import { SITE_CONFIG } from '@/app/constants';

interface ComingSoonProps {
  onNavigate: (page: PageId, sectionId?: string) => void;
  onOpenReferral: () => void;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  onNavigate,
  onOpenReferral,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('School Leader / SENCO');
  const [preferences, setPreferences] = useState<string[]>([
    'Digital Portal Beta Access',
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const togglePreference = (item: string) => {
    setPreferences((prev) =>
      prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your work or personal email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address format.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#fcfbfa] pt-32 pb-24 text-[#092233]">
      {/* Decorative Brand Accents */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <button
            type="button"
            id="btn-back-home"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-[#092233] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#8cc63f]" />
            <span>Return to Main Website</span>
          </button>
        </div>

        {/* Hero Banner Card */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-8 sm:p-12 lg:p-16 relative overflow-hidden mb-12">
          {/* Subtle brand geometry */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#8cc63f]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#f05a28]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8cc63f]/15 border border-[#8cc63f]/30 text-[#092233] text-xs font-black uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#8cc63f]" />
              <span>In Active Development • Autumn 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#092233] tracking-tight leading-[1.15] mb-6">
              The Muve Futures{' '}
              <span className="text-[#f05a28]">Digital Portal</span> &amp;{' '}
              <span className="text-[#8cc63f]">East Birmingham Hub</span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-8">
              We are expanding our specialist alternative provision infrastructure.
              Soon, commissioners, school leaders, and families will have direct access
              to real-time attendance telemetry, digital portfolio tracking, and our
              new multi-sensory STEM innovation hub.
            </p>

            {/* Email Notification Form */}
            <div className="bg-[#f8f7f5] rounded-2xl p-6 sm:p-8 border border-neutral-200">
              {submitted ? (
                <div className="text-center py-4 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#8cc63f]/20 text-[#8cc63f] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#092233]">
                    You&apos;re on the priority notification list!
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto">
                    Thank you, <strong className="text-[#092233]">{name || 'colleague'}</strong>.
                    We have registered <strong className="text-[#092233]">{email}</strong>.
                    You will receive exclusive early access and invitations to our open days.
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <Button
                      id="btn-portal-done-home"
                      onClick={() => onNavigate('home')}
                      className="bg-[#092233] text-white hover:bg-[#133c57] rounded-xl px-5 py-2.5 text-xs font-bold"
                    >
                      Back to Overview
                    </Button>
                    <Button
                      id="btn-portal-done-referral"
                      onClick={onOpenReferral}
                      className="bg-[#8cc63f] text-[#092233] hover:bg-[#76aa33] rounded-xl px-5 py-2.5 text-xs font-bold"
                    >
                      Submit a Current Referral
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-2 pb-2 border-b border-neutral-200">
                    <Bell className="w-4 h-4 text-[#f05a28]" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#092233]">
                      Join Priority Access &amp; Launch Alerts
                    </h3>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-xl">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#092233] mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        id="portal-input-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rachel Adams"
                        className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#092233] mb-1.5">
                        Your Stakeholder Role <span className="text-[#f05a28]">*</span>
                      </label>
                      <select
                        id="portal-select-role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent transition"
                      >
                        <option value="School Leader / SENCO">School Leader / SENCO</option>
                        <option value="Local Authority Inclusion Officer">Local Authority Inclusion Officer</option>
                        <option value="Parent / Carer">Parent / Carer</option>
                        <option value="Social Worker / Health Professional">Social Worker / Health Professional</option>
                        <option value="Educational Psychologist">Educational Psychologist</option>
                        <option value="Prospective Specialist Educator">Prospective Specialist Educator</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#092233] mb-1.5">
                      Professional / Personal Email <span className="text-[#f05a28]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        id="portal-input-email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. r.adams@birmingham-school.ac.uk"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-neutral-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8cc63f] focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  {/* Notification Topics */}
                  <div>
                    <span className="block text-xs font-bold text-[#092233] mb-2">
                      What would you like to receive updates about?
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        'Digital Portal Beta Access',
                        'East Hub Open Day',
                        'Quarterly EBSNA Research',
                      ].map((item) => {
                        const isChecked = preferences.includes(item);
                        return (
                          <button
                            type="button"
                            key={item}
                            onClick={() => togglePreference(item)}
                            className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs text-left transition cursor-pointer ${
                              isChecked
                                ? 'bg-white border-[#8cc63f] text-[#092233] font-semibold shadow-xs'
                                : 'bg-white/60 border-neutral-200 text-neutral-600 hover:bg-white'
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded flex items-center justify-center border transition ${
                                isChecked
                                  ? 'bg-[#8cc63f] border-[#8cc63f] text-[#092233]'
                                  : 'border-neutral-300'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="truncate">{item}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <Button
                      type="submit"
                      id="btn-submit-coming-soon"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-[#8cc63f] text-[#092233] hover:bg-[#76aa33] rounded-xl px-7 py-3 text-sm font-black transition flex items-center justify-center gap-2"
                    >
                      <span>{isSubmitting ? 'Registering...' : 'Notify Me at Launch'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <p className="text-[11px] text-neutral-500">
                      Zero spam. We respect GDPR. Unsubscribe at any time.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Feature Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#8cc63f]/15 text-[#8cc63f] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#092233] mb-2">
              Live Statutory MIS Sync
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Automated morning and afternoon attendance synchronization designed to integrate
              with SIMS, Arbor, and Bromcom for immediate commissioner compliance.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#f05a28]/15 text-[#f05a28] flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#092233] mb-2">
              Parent &amp; Carer Pastoral Portal
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Transparent, daily celebratory highlights and emotional regulation progress notes
              empowering families with clear visibility of their child’s well-being.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#d93c8c]/15 text-[#d93c8c] flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#092233] mb-2">
              Solihull &amp; East Hub Suite
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Adding 4 low-arousal sensory learning suites, a digital creative lab, and an
              adapted indoor horticulture area for hands-on vocational credentials.
            </p>
          </div>
        </div>

        {/* Support & Current Needs Callout */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-[#092233]">
              Need immediate student provision right now?
            </h4>
            <p className="text-xs text-neutral-600">
              Our 1:1 specialist education and EBSNA micro-stepping services are active across the West Midlands.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              id="btn-comingsoon-urgent-referral"
              onClick={onOpenReferral}
              className="bg-[#092233] text-white hover:bg-[#133c57] rounded-xl px-5 py-2 text-xs font-bold whitespace-nowrap"
            >
              Make an Urgent Referral
            </Button>
            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="text-xs font-bold text-[#8cc63f] hover:underline whitespace-nowrap"
            >
              Call {SITE_CONFIG.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

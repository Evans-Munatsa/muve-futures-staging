import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ContactHero } from '@/components/contact/ContactHero';
import { DirectReferralForm } from '@/components/contact/DirectReferralForm';
import { GeneralContactForm } from '@/components/contact/GeneralContactForm';
import { LocationsMap } from '@/components/contact/LocationsMap';

export const ContactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'referral' | 'enquiry'>('referral');
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#general-enquiry') {
      setActiveTab('enquiry');
    } else if (location.hash === '#referral-form') {
      setActiveTab('referral');
    }
  }, [location.hash]);

  return (
    <div className="flex flex-col w-full">
      <ContactHero />

      <section id="contact-forms" className="scroll-mt-24 py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Tabs header switching between Learner Referral and General Enquiry */}
          <div className="flex justify-center">
            <div className="bg-neutral-100 p-1.5 rounded-full inline-flex">
              <button
                type="button"
                id="tab-btn-referral"
                onClick={() => setActiveTab('referral')}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  activeTab === 'referral'
                    ? 'bg-[#f05a28] text-white shadow-md'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Make a Learner Referral
              </button>
              <button
                type="button"
                id="tab-btn-enquiry"
                onClick={() => setActiveTab('enquiry')}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                  activeTab === 'enquiry'
                    ? 'bg-[#092233] text-white shadow-md'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                General Enquiry / Booking
              </button>
            </div>
          </div>

          <div id={activeTab === 'referral' ? 'referral-form' : 'general-enquiry'} className="scroll-mt-28">
            {activeTab === 'referral' ? (
              <DirectReferralForm />
            ) : (
              <div className="max-w-2xl mx-auto">
                <GeneralContactForm />
              </div>
            )}
          </div>
        </div>
      </section>

      <LocationsMap />
    </div>
  );
};

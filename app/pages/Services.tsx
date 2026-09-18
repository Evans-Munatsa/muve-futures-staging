import React, { useState } from 'react';
import { ServicesHero } from '@/app/components/services/ServicesHero';
import { ServiceDirectory } from '@/app/components/services/ServiceDirectory';
import { DeliveryModels } from '@/app/components/services/DeliveryModels';
import { CommissioningGuide } from '@/app/components/services/CommissioningGuide';
import { SERVICES_DATA } from '@/app/data/content';
import { ServiceItem } from '@/app/types';

interface ServicesPageProps {
  onSelectService: (service: ServiceItem) => void;
  onMakeReferral: (serviceName: string) => void;
  onBookIntro: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onSelectService,
  onMakeReferral,
  onBookIntro,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'SEND & Specialist', 'SEMH & Wellbeing', 'Medical & Reintegration', 'Post-16 & Vocational'];

  const filteredServices = selectedCategory === 'All'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.category === selectedCategory);

  return (
    <div className="flex flex-col w-full">
      <ServicesHero
        onOpenReferral={() => onMakeReferral('General Provision')}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={categories}
      />

      <ServiceDirectory
        services={filteredServices}
        onSelectService={onSelectService}
        onMakeReferral={onMakeReferral}
      />

      <DeliveryModels />

      <CommissioningGuide
        onOpenReferral={() => onMakeReferral('Commissioning Pathway')}
        onBookIntro={onBookIntro}
      />
    </div>
  );
};

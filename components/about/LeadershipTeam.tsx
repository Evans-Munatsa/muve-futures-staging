import React, { useState } from 'react';
import { TEAM_MEMBERS } from '@/app/data/content';
import { TeamMember } from '@/app/types';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Mail, GraduationCap, CheckCircle2 } from 'lucide-react';

export const LeadershipTeam: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#f05a28]">
            OUR LEADERSHIP & SPECIALIST TEAM
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#092233] leading-tight">
            Practitioners Dedicated to Learner Transformation
          </h2>
          <p className="text-base text-neutral-600">
            Our multi-disciplinary team brings together qualified teachers, trauma-informed SEND specialists, designated safeguarding leads, and clinical mentors.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <Card
              key={member.id}
              className="overflow-hidden border-neutral-200 hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image */}
              <div className="relative aspect-[4/4] overflow-hidden bg-neutral-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="font-bold text-base">{member.name}</p>
                  <p className="text-xs text-white/90 font-medium">{member.role}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <GraduationCap className="w-3.5 h-3.5 text-[#f05a28]" />
                    <span className="truncate">{member.credentials}</span>
                  </div>

                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {member.specialisms.slice(0, 2).map((spec, i) => (
                      <Badge key={i} variant="outline" className="text-[10px] py-0">
                        {spec}
                      </Badge>
                    ))}
                    {member.specialisms.length > 2 && (
                      <Badge variant="outline" className="text-[10px] py-0 text-neutral-400">
                        +{member.specialisms.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedMember(member)}
                  className="w-full text-xs font-bold"
                >
                  View Profile & Background
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Member Profile Modal */}
        <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
          <DialogContent className="max-w-xl p-0 overflow-hidden">
            {selectedMember && (
              <div>
                <div className="bg-[#092233] text-white p-6 relative">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-[#8cc63f]"
                    />
                    <div>
                      <DialogTitle className="text-xl font-extrabold text-white">
                        {selectedMember.name}
                      </DialogTitle>
                      <DialogDescription className="text-xs text-[#8cc63f] font-semibold mt-0.5">
                        {selectedMember.role} • {selectedMember.credentials}
                      </DialogDescription>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-5 text-sm">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Biography & Professional Background
                    </h4>
                    <p className="text-neutral-700 leading-relaxed">
                      {selectedMember.bio}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Areas of Specialism:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedMember.specialisms.map((spec, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-neutral-800">
                          <CheckCircle2 className="w-4 h-4 text-[#8cc63f] shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <Mail className="w-3.5 h-3.5" />
                      <span>Direct commissioning enquiry via contact</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedMember(null)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </section>
  );
};

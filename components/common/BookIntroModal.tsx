import React, { useState } from 'react';
import { Calendar, CheckCircle, Send, User, Mail, Building, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface BookIntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookIntroModal: React.FC<BookIntroModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organisation: '',
    preferredDate: '',
    preferredTime: 'Morning (09:00 - 12:00)',
    notes: '',
  });

  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  const handleReset = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="p-0 overflow-hidden max-w-lg">
        {/* Header */}
        <div className="bg-[#092233] text-white p-6 sm:p-7 relative">
          <span className="text-xs font-black uppercase tracking-widest text-[#8cc63f]">
            Partnership Consultation
          </span>
          <DialogTitle className="text-2xl font-extrabold text-white mt-1">
            Book an Intro Call
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-white/80 mt-1">
            Speak with our commissioning team about individual learners, cohort packages, or SLA partnerships.
          </DialogDescription>
        </div>

        {/* Content */}
        <div className="p-6">
          {confirmed ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#092233]">Meeting Requested</h4>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto">
                Thank you, {formData.name}. We have logged your request for an intro call. A calendar invitation will be sent to <strong>{formData.email}</strong> shortly.
              </p>
              <div className="pt-2">
                <Button
                  id="intro-done-btn"
                  variant="navy"
                  onClick={handleReset}
                  className="font-bold text-sm"
                >
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="intro-name">Your Name *</Label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                  <Input
                    id="intro-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="intro-email">Work Email *</Label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                    <Input
                      id="intro-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@school.org"
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="intro-phone">Phone</Label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                    <Input
                      id="intro-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0121 405 9284"
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="intro-org">School / Local Authority *</Label>
                <div className="relative">
                  <Building className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
                  <Input
                    id="intro-org"
                    type="text"
                    required
                    value={formData.organisation}
                    onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                    placeholder="e.g. Birmingham City Council"
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="intro-date">Preferred Date</Label>
                  <Input
                    id="intro-date"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="intro-time">Preferred Time</Label>
                  <select
                    id="intro-time"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="flex h-11 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm text-[#092233] focus:ring-2 focus:ring-[#8cc63f] focus:outline-hidden"
                  >
                    <option>Morning (09:00 - 12:00)</option>
                    <option>Early Afternoon (12:00 - 14:30)</option>
                    <option>Late Afternoon (14:30 - 17:00)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="intro-notes">Brief Overview of Requirements</Label>
                <Textarea
                  id="intro-notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about the learner, number of hours, or specific SEND needs..."
                  rows={2}
                />
              </div>

              <div className="pt-2">
                <Button
                  id="submit-intro-btn"
                  type="submit"
                  variant="navy"
                  size="lg"
                  className="w-full gap-2 font-bold"
                >
                  <Send className="w-4 h-4" />
                  Confirm Intro Booking
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

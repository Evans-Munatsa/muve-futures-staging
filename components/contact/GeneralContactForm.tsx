import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const GeneralContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Partnership Enquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please complete all required fields (*)');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <Card className="p-6 sm:p-8 border-neutral-200 bg-white shadow-xl">
      {submitted ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#092233]">Message Sent Successfully</h3>
          <p className="text-neutral-600 text-xs sm:text-sm max-w-sm mx-auto">
            Thank you for contacting Muve Futures. Our operations team will respond to <strong>{formData.email}</strong> within one working day.
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', email: '', phone: '', subject: 'General Partnership Enquiry', message: '' });
            }}
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h3 className="text-xl font-extrabold text-[#092233]">
              Send Us an Enquiry
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Have questions regarding service capacity, recruitment, or multi-academy agreements?
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="g-name">Your Full Name *</Label>
            <Input
              id="g-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Rachel Adams"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="g-email">Email Address *</Label>
            <Input
              id="g-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="rachel@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="g-phone">Phone Number (Optional)</Label>
            <Input
              id="g-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="07000 000000"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="g-subj">Subject</Label>
            <Input
              id="g-subj"
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="g-msg">Your Message *</Label>
            <Textarea
              id="g-msg"
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="How can we assist your school, trust, or family?"
            />
          </div>

          <Button
            type="submit"
            variant="navy"
            size="lg"
            className="w-full font-bold gap-2 mt-2"
          >
            <Send className="w-4 h-4" />
            Send Enquiry
          </Button>
        </form>
      )}
    </Card>
  );
};

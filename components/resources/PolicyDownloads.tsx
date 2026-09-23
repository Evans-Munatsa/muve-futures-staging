import React from 'react';
import type { ResourcesContent } from '@/lib/content/pages';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

export const PolicyDownloads: React.FC<{ content: ResourcesContent['policies'] }> = ({ content }) => {

  return (
    <section id="policy-downloads" className="scroll-mt-24 py-16 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-brand-green">
            {content.eyebrow}
          </span>
          <h2 className="text-3xl font-extrabold text-brand-ink">
            {content.title}
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            {content.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.items.map((pol) => {
            return (
              <Card
                key={pol.title}
                className="p-5 border-neutral-200 hover:border-brand-ink transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-brand-ink">
                        {pol.title}
                      </h3>
                      <Badge variant="outline" className="text-[10px] py-0">
                        {pol.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Reviewed: {pol.lastUpdated} • Format: {pol.fileSize}
                    </p>
                  </div>
                </div>

                {/* The file is uploaded in the dashboard (Resources page → Policy downloads). */}
                {pol.fileUrl ? (
                  <Button asChild variant="outline" size="sm" className="shrink-0 gap-1.5 border-brand-ink text-xs font-bold text-brand-ink hover:bg-brand-ink hover:text-white">
                    <a href={pol.fileUrl} target="_blank" rel="noopener noreferrer" download>
                      <Download className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Download</span>
                    </a>
                  </Button>
                ) : (
                  <span className="shrink-0 text-xs font-semibold text-neutral-400">Available on request</span>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

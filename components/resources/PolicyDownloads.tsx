import React, { useState } from 'react';
import { POLICIES_DATA } from '@/app/data/content';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { FileText, Download, CheckCircle } from 'lucide-react';

export const PolicyDownloads: React.FC = () => {
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const handleDownload = (id: string, title: string) => {
    setDownloadedId(id);
    setTimeout(() => {
      setDownloadedId(null);
    }, 2500);
  };

  return (
    <section id="policy-downloads" className="scroll-mt-24 py-16 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#8cc63f]">
            GOVERNANCE & TRANSPARENCY
          </span>
          <h2 className="text-3xl font-extrabold text-[#092233]">
            Statutory Policies & Compliance Documents
          </h2>
          <p className="text-sm sm:text-base text-neutral-600">
            Download our verified policies updated for the 2025/2026 academic year in accordance with DfE statutory guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {POLICIES_DATA.map((pol) => {
            const isDownloaded = downloadedId === pol.id;
            return (
              <Card
                key={pol.id}
                className="p-5 border-neutral-200 hover:border-[#092233] transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-5 h-5 text-[#f05a28]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-[#092233]">
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

                <Button
                  variant={isDownloaded ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleDownload(pol.id, pol.title)}
                  className="shrink-0 text-xs font-bold gap-1.5"
                >
                  {isDownloaded ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Downloaded</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </>
                  )}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

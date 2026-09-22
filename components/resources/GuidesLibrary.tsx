import React, { useState } from 'react';
import { ResourceArticle } from '@/app/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

interface GuidesLibraryProps {
  articles: ResourceArticle[];
}

export const GuidesLibrary: React.FC<GuidesLibraryProps> = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState<ResourceArticle | null>(null);

  return (
    <section id="guides-library" className="scroll-mt-24 py-16 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-orange">
              EXPERT ARTICLES & TOOLKITS
            </span>
            <h2 className="text-3xl font-extrabold text-brand-ink">
              Guidance & Practitioner Toolkits
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 font-medium">
            Showing {articles.length} publications
          </p>
        </div>

        {articles.length === 0 ? (
          <Card className="p-12 text-center space-y-3 bg-white border-neutral-200">
            <BookOpen className="w-10 h-10 text-neutral-300 mx-auto" />
            <h3 className="text-lg font-bold text-brand-ink">No articles found matching your query</h3>
            <p className="text-sm text-neutral-500">
              Try adjusting your search terms or selecting a different category above.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <Card
                key={art.id}
                className="overflow-hidden border-neutral-200 hover:shadow-xl transition-all duration-300 bg-white flex flex-col justify-between group"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="navy" className="text-[11px] font-bold">
                      {art.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-neutral-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {art.readTime}
                      </span>
                      <span>•</span>
                      <span>{art.publishedDate}</span>
                    </div>

                    <h3 className="text-lg font-extrabold text-brand-ink group-hover:text-brand-orange transition-colors leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-600 line-clamp-3 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs text-neutral-500 font-medium truncate max-w-[150px]">
                      By {art.author}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedArticle(art)}
                      className="text-xs font-bold text-brand-orange hover:text-[#d94e20] hover:bg-neutral-100 p-0 flex items-center gap-1"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Read Article Dialog */}
        <Dialog open={!!selectedArticle} onOpenChange={(open) => !open && setSelectedArticle(null)}>
          <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[90vh] flex flex-col">
            {selectedArticle && (
              <div>
                <div className="relative aspect-[21/9] overflow-hidden bg-neutral-900">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end text-white">
                    <Badge variant="lime" className="text-[10px] self-start mb-2">
                      {selectedArticle.category}
                    </Badge>
                    <DialogTitle className="text-xl sm:text-2xl font-black text-white leading-tight">
                      {selectedArticle.title}
                    </DialogTitle>
                    <DialogDescription className="text-xs text-white/80 mt-1">
                      By {selectedArticle.author} • {selectedArticle.publishedDate} • {selectedArticle.readTime}
                    </DialogDescription>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto space-y-4 text-neutral-700 text-sm leading-relaxed max-h-[50vh]">
                  <p className="font-semibold text-base text-brand-ink">
                    {selectedArticle.summary}
                  </p>
                  <p>
                    Emotionally Based School Non-Attendance and SEND barriers necessitate a holistic rethinking of the learning environment. When learners experience sensory overwhelm, neurodivergent fatigue, or developmental trauma, expectations of immediate academic productivity can trigger nervous system distress.
                  </p>
                  <p>
                    Effective alternative provision pathways begin by de-escalating demand. Establishing unconditional positive regard, creating low-arousal physical spaces, and collaborating transparently with parents and SENCOs provide the essential bedrock for progress.
                  </p>
                  <p>
                    Once emotional regulation is restored, targeted micro-goals in core literacy and numeracy can be layered in gradually, restoring confidence without reigniting avoidance behaviors.
                  </p>
                  <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600">
                    💡 <strong>Commissioning Tip:</strong> For advice on incorporating these principles into an EHCP Section F provision or Section 19 request, please contact our assessment team.
                  </div>
                </div>

                <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex justify-end">
                  <Button
                    variant="navy"
                    size="sm"
                    onClick={() => setSelectedArticle(null)}
                  >
                    Done Reading
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

      </div>
    </section>
  );
};

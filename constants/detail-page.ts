/**
 * Content model for the designed service and audience pages
 * (/services/[slug] and /who-we-support/[slug]). Each page is a hero, a
 * stack of blocks and a closing CTA, mirroring the Figma frames.
 */

/** What a CTA button does: open the referral or intro modal, or go to the contact page. */
export type CtaAction = 'referral' | 'intro' | 'contact';

export interface Cta {
  label: string;
  action: CtaAction;
}

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** Card background colour. Text is white on pink/orange/ink and ink on cyan/lime. */
export type CardTone = 'pink' | 'orange' | 'cyan' | 'lime' | 'ink' | 'outline';

export interface CopyBlock {
  eyebrow: string;
  title: string;
  body: string;
}

export type DetailBlock =
  /** Rounded colour card, optionally with a cut-out photo standing out of one side. */
  | (CopyBlock & {
      kind: 'card';
      tone: CardTone;
      align?: 'left' | 'center' | 'right';
      /** Which top corner gets the large curve (default: right). */
      corner?: 'tl' | 'tr';
      cutout?: Photo & { side: 'left' | 'right' };
      /** Photo band across the card, followed by a second section of copy. */
      continuation?: { photo: Photo } & CopyBlock;
    })
  /** Copy directly on the page background, optionally with an orange left rule. */
  | (CopyBlock & { kind: 'text'; align?: 'left' | 'center'; accent?: boolean; ink?: boolean })
  /** Two columns. Each side is plain copy, a colour card or a photo. */
  | {
      kind: 'split';
      left: SplitItem;
      right: SplitItem;
      divider?: boolean;
    }
  /** Photo in the content column (rounded corner) or edge to edge. */
  | { kind: 'photo'; photo: Photo; fullBleed?: boolean; corners?: 'tr' | 'tl-br' }
  /** Transparent cut-out that stands on top of the next block. */
  | { kind: 'cutout'; photo: Photo; size?: 'md' | 'lg' };

export type SplitItem =
  | (CopyBlock & { type: 'copy' })
  | (CopyBlock & { type: 'card'; tone: CardTone })
  | { type: 'photo'; photo: Photo };

export interface DetailPageContent {
  hero: { badge: string; title: string; intro: string; cta: Cta };
  blocks: DetailBlock[];
  closing: { title: string; body: string; cta: Cta };
  /** Copy that repeats another page in the design and still needs writing. */
  placeholderCopy?: boolean;
}

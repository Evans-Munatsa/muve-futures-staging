import Link from 'next/link';
import { Button, ButtonProps } from '@/components/ui/button';
import { BOOK_INTRO_HREF, referralHref } from '@/constants';

type ActionButtonProps = Omit<ButtonProps, 'onClick' | 'asChild' | 'type'>;

/** Link to the referral page, optionally preselecting a service. */
export function ReferralButton({
  serviceName,
  variant = 'orange',
  size = 'pill',
  children,
  ...props
}: ActionButtonProps & { serviceName?: string }) {
  return (
    <Button asChild variant={variant} size={size} {...props}>
      <Link href={referralHref(serviceName)}>{children}</Link>
    </Button>
  );
}

/** Link to the "book an intro" page. */
export function BookIntroButton({ variant = 'orange', size = 'pill', children, ...props }: ActionButtonProps) {
  return (
    <Button asChild variant={variant} size={size} {...props}>
      <Link href={BOOK_INTRO_HREF}>{children}</Link>
    </Button>
  );
}

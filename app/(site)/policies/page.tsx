import { redirect } from 'next/navigation';
import { POLICIES_HREF } from '@/constants';

/** Policies are listed in the Resources library rather than on a page of their own. */
export default function PoliciesIndex() {
  redirect(POLICIES_HREF);
}

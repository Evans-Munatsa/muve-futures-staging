import { redirect } from 'next/navigation';

/** Policies are listed in the Resources library rather than on a page of their own. */
export default function PoliciesIndex() {
  redirect('/resources#resource-library');
}

import type { BookingFormData, BookingSubmissionResult } from '../types';

/**
 * Submission boundary for the booking enquiry form.
 *
 * Swap the body of this function for a real integration when ready —
 * every call site only depends on this signature, so nothing in the UI
 * needs to change. Examples:
 *
 *   // Formspree
 *   const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
 *     body: JSON.stringify(data),
 *   });
 *   return { success: res.ok };
 *
 *   // Supabase
 *   const { error } = await supabase.from('booking_enquiries').insert(data);
 *   return { success: !error, message: error?.message };
 *
 *   // Custom API
 *   const res = await fetch('/api/enquiries', { method: 'POST', body: JSON.stringify(data) });
 *   return { success: res.ok };
 */
export async function submitBookingEnquiry(
  data: BookingFormData,
): Promise<BookingSubmissionResult> {
  await new Promise((resolve) => setTimeout(resolve, 1100));

  if (import.meta.env.DEV) {
    console.info('[booking enquiry] submitted (frontend-only stub):', data);
  }

  return { success: true };
}

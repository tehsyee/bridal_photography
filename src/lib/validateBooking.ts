import type { BookingFormData, BookingFormErrors } from '../types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d][\d\s()-]{6,}$/;

export function todayIsoDate(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const local = new Date(now.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 10);
}

export function validateBooking(data: BookingFormData): BookingFormErrors {
  const errors: BookingFormErrors = {};

  if (!data.fullName.trim()) {
    errors.fullName = 'Please enter your name.';
  }

  if (!data.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Please enter a phone or WhatsApp number.';
  } else if (!PHONE_PATTERN.test(data.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!data.weddingDate) {
    errors.weddingDate = 'Please select your wedding date.';
  } else if (data.weddingDate < todayIsoDate()) {
    errors.weddingDate = 'Please choose a date that hasn’t passed yet.';
  }

  if (!data.venue.trim()) {
    errors.venue = 'Please tell us where your wedding will take place.';
  }

  if (!data.guestCount) {
    errors.guestCount = 'Please select your estimated guest count.';
  }

  if (!data.package) {
    errors.package = 'Please select a photography package.';
  }

  if (!data.referralSource.trim()) {
    errors.referralSource = 'Please let us know how you heard about us.';
  }

  return errors;
}

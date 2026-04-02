/**
 * Centralized contact details for Amogh Van/Bus Services.
 * Update this file to change contact info site-wide.
 */
export const CONTACT = {
  /** Primary phone number */
  PHONE_PRIMARY: "9870525637",
  /** Secondary phone number */
  PHONE_SECONDARY: "9321025627",

  /** Primary email address */
  EMAIL: "amoghvanservices@gmail.com",

  /** Business name */
  BUSINESS_NAME: "Amogh Van/Bus Services",

  /** Physical address details */
  ADDRESS: {
    STREET: "Prabhadevi",
    LOCALITY: "Dadar West",
    REGION: "Maharashtra",
    COUNTRY: "IN",
    POSTAL_CODE: "400028",
  },

  /** Website URL */
  WEBSITE: "https://amoghvanservices.in",

  /** Full phone numbers with country code for schema/tel links */
  PHONE_PRIMARY_FULL: "+91-9870525637",
  PHONE_SECONDARY_FULL: "+91-9321025627",

  /** Combined display string */
  PHONES_DISPLAY: "9870525637 / 9321025627",
} as const;

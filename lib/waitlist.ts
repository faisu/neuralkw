export const NAME_MAX = 100;
export const EMAIL_MAX = 254;
export const COMPANY_MAX = 120;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type WaitlistInput = {
  name: string;
  email: string;
  companyName: string | null;
};

export type WaitlistFieldErrors = {
  name?: string;
  email?: string;
  company_name?: string;
};

export type WaitlistState = {
  status: "idle" | "success" | "duplicate" | "error";
  message?: string;
  fieldErrors?: WaitlistFieldErrors;
};

export const initialWaitlistState: WaitlistState = { status: "idle" };

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export function parseWaitlistForm(formData: FormData): {
  data?: WaitlistInput;
  fieldErrors?: WaitlistFieldErrors;
} {
  const name = readField(formData, "name").trim();
  const email = readField(formData, "email").trim().toLowerCase();
  const companyRaw = readField(formData, "company_name").trim();

  const fieldErrors: WaitlistFieldErrors = {};

  if (!name) {
    fieldErrors.name = "Name is required.";
  } else if (name.length > NAME_MAX) {
    fieldErrors.name = `Name must be ${NAME_MAX} characters or fewer.`;
  }

  if (!email) {
    fieldErrors.email = "Work email is required.";
  } else if (email.length > EMAIL_MAX || !EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "Enter a valid work email address.";
  }

  if (companyRaw.length > COMPANY_MAX) {
    fieldErrors.company_name = `Company name must be ${COMPANY_MAX} characters or fewer.`;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  return {
    data: {
      name,
      email,
      companyName: companyRaw.length > 0 ? companyRaw : null,
    },
  };
}

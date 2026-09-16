"use server";

import { createClient } from "@/lib/supabase/server";
import {
  parseWaitlistForm,
  type WaitlistState,
} from "@/lib/waitlist";

const UNAVAILABLE_MESSAGE =
  "The waitlist is temporarily unavailable. Please try again later.";

function isDuplicateError(error: { code?: string; message?: string }) {
  return (
    error.code === "23505" ||
    error.message?.toLowerCase().includes("duplicate") === true
  );
}

export async function joinWaitlist(
  _prevState: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const parsed = parseWaitlistForm(formData);

  if (parsed.fieldErrors) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors: parsed.fieldErrors,
    };
  }

  const data = parsed.data;
  if (!data) {
    return { status: "error", message: UNAVAILABLE_MESSAGE };
  }

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return { status: "error", message: UNAVAILABLE_MESSAGE };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("waitlist").insert({
      name: data.name,
      email: data.email,
      company_name: data.companyName,
    });

    if (error) {
      if (isDuplicateError(error)) {
        return {
          status: "duplicate",
          message: "You're already on the waitlist. We'll be in touch.",
        };
      }

      console.error("Waitlist insert failed:", error.message);
      return { status: "error", message: UNAVAILABLE_MESSAGE };
    }

    return {
      status: "success",
      message: "You're on the waitlist. We'll send launch updates to your inbox.",
    };
  } catch (error) {
    console.error("Waitlist submission failed:", error);
    return { status: "error", message: UNAVAILABLE_MESSAGE };
  }
}

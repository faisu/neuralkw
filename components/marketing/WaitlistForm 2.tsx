"use client";

import { useActionState } from "react";
import { joinWaitlist } from "@/app/actions/waitlist";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { homeCopy } from "@/content/copy/home";
import {
  COMPANY_MAX,
  EMAIL_MAX,
  NAME_MAX,
  initialWaitlistState,
} from "@/lib/waitlist";

export function WaitlistForm() {
  const [state, formAction, pending] = useActionState(
    joinWaitlist,
    initialWaitlistState,
  );
  const { waitlist } = homeCopy;
  const succeeded = state.status === "success" || state.status === "duplicate";

  if (succeeded) {
    return (
      <div className="max-w-xl border-t border-border-subtle pt-8" role="status">
        <p className="text-lg font-medium tracking-[-0.02em] text-text-primary">
          {state.message}
        </p>
        <p className="mt-3 text-sm text-text-muted">{waitlist.supporting}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid max-w-xl gap-5">
      <Input
        id="waitlist-name"
        name="name"
        label="Name"
        required
        autoComplete="name"
        placeholder="Alex Rivera"
        maxLength={NAME_MAX}
        disabled={pending}
        error={state.fieldErrors?.name}
      />
      <Input
        id="waitlist-email"
        name="email"
        type="email"
        label="Work email"
        required
        autoComplete="email"
        placeholder="alex@studio.com"
        maxLength={EMAIL_MAX}
        disabled={pending}
        error={state.fieldErrors?.email}
      />
      <Input
        id="waitlist-company"
        name="company_name"
        label="Company name"
        optional
        autoComplete="organization"
        placeholder="Northline Development"
        maxLength={COMPANY_MAX}
        disabled={pending}
        error={state.fieldErrors?.company_name}
      />
      {state.status === "error" && state.message ? (
        <p role="alert" className="text-sm text-red-700">
          {state.message}
        </p>
      ) : null}
      <Button type="submit" busy={pending} className="w-fit min-w-40">
        {pending ? waitlist.pending : waitlist.submit}
      </Button>
      <p className="text-sm text-text-faint">{waitlist.supporting}</p>
    </form>
  );
}

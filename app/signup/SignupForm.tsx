"use client";

import { useActionState } from "react";
import { signup, type SignupState } from "./actions";
import { billVolumeOptions } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const initialState: SignupState = {};

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, initialState);

  if (state.success) {
    return (
      <Card className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-emerald/20">
          <svg className="h-6 w-6 text-accent-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-bold text-white">You&apos;re almost in</h2>
        <p className="mt-2 text-text-muted">{state.message}</p>
      </Card>
    );
  }

  return (
    <Card>
      <form action={formAction} className="space-y-5">
        {state.error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {state.error}
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-muted">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1.5 w-full rounded-lg border border-border-subtle bg-bg-surface-deep px-4 py-2.5 text-white placeholder:text-text-muted/50 focus:border-accent-cyan focus:outline-none"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor="organization" className="block text-sm font-medium text-text-muted">
            Organization name
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            required
            className="mt-1.5 w-full rounded-lg border border-border-subtle bg-bg-surface-deep px-4 py-2.5 text-white placeholder:text-text-muted/50 focus:border-accent-cyan focus:outline-none"
            placeholder="Acme Corp"
          />
        </div>
        <div>
          <label htmlFor="billVolume" className="block text-sm font-medium text-text-muted">
            Estimated monthly bill volume
          </label>
          <select
            id="billVolume"
            name="billVolume"
            required
            className="mt-1.5 w-full rounded-lg border border-border-subtle bg-bg-surface-deep px-4 py-2.5 text-white focus:border-accent-cyan focus:outline-none"
          >
            <option value="">Select volume range</option>
            {billVolumeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text-muted">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            className="mt-1.5 w-full rounded-lg border border-border-subtle bg-bg-surface-deep px-4 py-2.5 text-white placeholder:text-text-muted/50 focus:border-accent-cyan focus:outline-none"
            placeholder="Minimum 8 characters"
          />
        </div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Creating account…" : "Create account"}
        </Button>
        <p className="text-center text-xs text-text-muted">
          By signing up you agree to our{" "}
          <a href="/terms" className="text-accent-cyan hover:underline">Terms</a>
          {" "}and{" "}
          <a href="/privacy" className="text-accent-cyan hover:underline">Privacy Policy</a>.
        </p>
      </form>
    </Card>
  );
}

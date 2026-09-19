"use server";

import {
  createSession,
  destroySession,
  verifyCredentials,
} from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Authentication Server Actions.
 *
 * The Next.js docs are explicit that Server Functions are reachable by direct
 * POST, not only through the UI — so every action re-checks credentials here
 * rather than trusting that it was called from the login form.
 */

export interface LoginState {
  error?: string;
  username?: string;
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/");

  if (!username || !password) {
    return { error: "Enter both your username and password.", username };
  }

  if (!verifyCredentials(username, password)) {
    // Deliberately vague: never reveal which half was wrong.
    return { error: "Those credentials are not valid.", username };
  }

  await createSession(username);
  revalidatePath("/", "layout");

  // Only allow same-origin relative paths, so `?next=` cannot be used as an
  // open redirect to an attacker-controlled site.
  const destination =
    next.startsWith("/") && !next.startsWith("//") ? next : "/";
  redirect(destination);
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  revalidatePath("/", "layout");
  redirect("/login");
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ApiError, deleteEnquiry, updateEnquiryStatus } from "@/lib/api";
import { getSession } from "@/lib/session";
import type { EnquiryStatus } from "@/lib/types";

/**
 * Enquiry mutations.
 *
 * Every action re-verifies the session before touching data. Server Functions
 * are directly POST-able, so the route guard in proxy.ts is a convenience for
 * humans, not the security boundary.
 */

export interface ActionResult {
  ok: boolean;
  error?: string;
}

async function requireSession(): Promise<ActionResult | null> {
  const session = await getSession();
  if (!session) {
    return { ok: false, error: "Your session has expired. Sign in again." };
  }
  return null;
}

/** Maps an ApiError onto a message an operator can act on. */
function describe(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 401) {
      return "The server rejected the admin key. Check ADMIN_API_KEY matches the server's .env.";
    }
    if (error.code === "NETWORK_ERROR") {
      return "Could not reach the API. Is the NestJS server running?";
    }
    if (error.code === "TIMEOUT") {
      return "The API took too long to respond. Try again.";
    }
    return error.message;
  }
  return "Something went wrong. Try again.";
}

export async function setEnquiryStatusAction(
  id: string,
  status: EnquiryStatus,
): Promise<ActionResult> {
  const denied = await requireSession();
  if (denied) return denied;

  try {
    await updateEnquiryStatus(id, status);
    // Refresh both the list and the dashboard counters.
    revalidatePath("/enquiries");
    revalidatePath(`/enquiries/${id}`);
    revalidatePath("/");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: describe(error) };
  }
}

export async function deleteEnquiryAction(id: string): Promise<ActionResult> {
  const denied = await requireSession();
  if (denied) return denied;

  try {
    await deleteEnquiry(id);
    revalidatePath("/enquiries");
    revalidatePath("/");
    return { ok: true };
  } catch (error) {
    return { ok: false, error: describe(error) };
  }
}

/**
 * Delete then navigate. Kept separate from deleteEnquiryAction because
 * `redirect()` throws internally and must not be wrapped in a try/catch that
 * would swallow it.
 */
export async function deleteEnquiryAndRedirectAction(
  id: string,
): Promise<void> {
  const denied = await requireSession();
  if (denied) throw new Error(denied.error);

  await deleteEnquiry(id);
  revalidatePath("/enquiries");
  revalidatePath("/");
  redirect("/enquiries");
}

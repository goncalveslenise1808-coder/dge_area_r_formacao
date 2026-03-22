"use server";

import { getAlerta } from "@/services/notification";
export async function fetchAlertasByEmail(email?: string | null) {
  try {
    const data = await getAlerta({ email: email ?? "" });

    return { ok: true as const, data };
  } catch {
    return { ok: false as const, data: [] as any[] };
  }
}

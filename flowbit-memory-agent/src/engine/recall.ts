import { db } from "../db/database";

export function recallVendorMemory(vendor: string) {
  const memories = db
    .prepare(`
  SELECT * FROM memory
  WHERE vendor = ?
  ORDER BY confidence DESC, usageCount DESC
  LIMIT 1
`)

    .all(vendor);

  console.log("📘 Recalled Vendor Memory:", memories);
  return memories;
}

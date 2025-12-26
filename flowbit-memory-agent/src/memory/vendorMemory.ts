import { db } from "../db/database";
import { MemoryRow } from "../types";

export function insertVendorMemory() {
  db.prepare(`
    INSERT INTO memory (type, vendor, key, value, confidence, usageCount, lastUpdated)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    "vendor",
    "Supplier GmbH",
    "Leistungsdatum",
    "serviceDate",
    0.6,
    1,
    new Date().toISOString()
  );

  console.log("✅ Vendor memory inserted");
}

export function recallVendorMemory(vendor: string): MemoryRow[] {
  return db
    .prepare(`SELECT * FROM memory WHERE vendor = ?`)
    .all(vendor) as MemoryRow[];
}

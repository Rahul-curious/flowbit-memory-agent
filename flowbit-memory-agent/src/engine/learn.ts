import { db } from "../db/database";
import { MemoryRow } from "../types";

export function learnFromFeedback(
  vendor: string,
  key: string,
  approved: boolean
) {
  const delta = approved ? 0.1 : -0.2;

  const memory = db
    .prepare("SELECT * FROM memory WHERE vendor = ? AND key = ?")
    .get(vendor, key) as MemoryRow | undefined;

  if (!memory) {
    console.log("⚠️ No memory found to learn from");
    return;
  }

  const newConfidence = Math.min(
    1,
    Math.max(0, memory.confidence + delta)
  );

  db.prepare(`
    UPDATE memory
    SET confidence = ?,
        usageCount = usageCount + 1,
        lastUpdated = ?
    WHERE id = ?
  `).run(newConfidence, new Date().toISOString(), memory.id);

  console.log(
    `🧠 Memory updated. New confidence: ${newConfidence}`
  );
}

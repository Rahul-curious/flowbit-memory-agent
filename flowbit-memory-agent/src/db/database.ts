import Database from "better-sqlite3";

export const db = new Database("memory.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS memory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    vendor TEXT,
    key TEXT,
    value TEXT,
    confidence REAL,
    usageCount INTEGER,
    lastUpdated TEXT
  )
`).run();

console.log("✅ Database initialized");

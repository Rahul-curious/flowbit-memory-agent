export type AuditStep = {
  step: "recall" | "apply" | "decide" | "learn";
  timestamp: string;
  details: string;
};

export type MemoryRow = {
  id: number;
  type: "vendor";
  vendor: string;
  key: string;
  value: string;
  confidence: number;
  usageCount: number;
  lastUpdated: string;
};

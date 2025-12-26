import { AuditStep } from "../types";

export function audit(
  step: AuditStep["step"],
  details: string
): AuditStep {
  return {
    step,
    timestamp: new Date().toISOString(),
    details
  };
}

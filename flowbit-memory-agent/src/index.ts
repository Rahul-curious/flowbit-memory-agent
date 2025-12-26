import { insertVendorMemory } from "./memory/vendorMemory";
import { applyVendorMemory } from "./engine/apply";
import { decideAction } from "./engine/decide";
import { learnFromFeedback } from "./engine/learn";
import { audit } from "./engine/audit";

// ===============================
// DEMO: Memory Learning Over Time
// ===============================

const auditTrail: any[] = [];

/**
 * STEP 1: FIRST INVOICE (NO MEMORY YET)
 * System asks for human review
 * Human provides correction
 */

console.log("\n--- Invoice #1 : First-time processing (No memory) ---");

// Simulate first invoice
const firstInvoice = {
  invoiceNumber: "INV-A-001",
  vendor: "Supplier GmbH",
  fields: {
    Leistungsdatum: "12.12.2025"
  }
};

// No memory exists yet → human correction happens
insertVendorMemory(); // simulate human correction
auditTrail.push(
  audit(
    "learn",
    "Human corrected invoice and vendor memory was stored"
  )
);

/**
 * STEP 2: SECOND INVOICE (MEMORY EXISTS)
 * System recalls memory
 * Applies correction
 * Makes smarter decision
 */

console.log("\n--- Invoice #2 : Processing with learned memory ---");

const secondInvoice = {
  invoiceNumber: "INV-A-003",
  vendor: "Supplier GmbH",
  fields: {
    Leistungsdatum: "15.12.2025"
  }
};

// Apply memory
const appliedResult = applyVendorMemory(secondInvoice);
auditTrail.push(
  audit("apply", "Vendor memory recalled and applied")
);

// Confidence after learning
const confidenceScore = 0.8;

// Decide action
const decision = decideAction(confidenceScore);
auditTrail.push(
  audit(
    "decide",
    `Decision made based on confidence score ${confidenceScore}`
  )
);

// Simulate human approval reinforcing confidence
learnFromFeedback("Supplier GmbH", "Leistungsdatum", true);
auditTrail.push(
  audit(
    "learn",
    "Human approved correction, confidence reinforced"
  )
);

// FINAL OUTPUT (REQUIRED CONTRACT)
const output = {
  normalizedInvoice: appliedResult.normalizedInvoice,
  proposedCorrections: appliedResult.proposedCorrections,
  requiresHumanReview: decision.requiresHumanReview,
  reasoning:
    "Vendor-specific memory was applied based on previous human correction, resulting in higher automation confidence.",
  confidenceScore,
  memoryUpdates: [
    "Vendor memory reinforced after repeated approval"
  ],
  auditTrail
};

console.log("\n--- FINAL OUTPUT ---");
console.log(JSON.stringify(output, null, 2));

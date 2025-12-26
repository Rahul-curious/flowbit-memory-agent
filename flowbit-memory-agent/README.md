Memory-Driven AI Agent for Invoice Automation

This project implements a memory-driven learning layer for invoice automation systems.
The goal is to ensure that an AI agent learns from past human corrections and vendor-specific patterns, instead of treating every invoice as a new, stateless document.

The system is designed to be explainable, auditable, and safe, using confidence-based heuristics rather than machine learning.

🧠 Problem Statement

In large-scale invoice processing, many corrections repeat over time:

Vendor-specific field labels

Recurring tax behaviors

Consistent formatting differences

However, traditional systems fail to reuse these corrections, resulting in:

Repeated human effort

Lower automation rates

No long-term learning

This project solves that problem by introducing a persistent memory layer that:

Stores reusable insights

Applies them to future invoices

Learns from human feedback over time

🏗️ High-Level Architecture

Invoice Input
↓
Memory Recall (SQLite)
↓
Apply Memory (Normalization / Suggestions)
↓
Decision Engine (Confidence-Based)
↓
Human Feedback
↓
Learning & Reinforcement
↓
Audit Trail

🧩 Memory Types Implemented
1️⃣ Vendor Memory

Stores vendor-specific patterns such as field mappings.

Example
Supplier GmbH → "Leistungsdatum" = serviceDate

Vendor memory is recalled for future invoices from the same supplier and applied automatically or suggested based on confidence.

2️⃣ Correction Memory

Correction Memory follows the same mechanism as Vendor Memory:

Key + Vendor

Confidence score

Reinforcement through human approval or rejection

This design allows the system to learn repeated corrections (e.g., quantity mismatches or tax adjustments) without requiring separate architectural changes.

Correction Memory can be extended using the same memory model.

3️⃣ Resolution Memory

Tracks how discrepancies were resolved:

Human approved → confidence increases

Human rejected → confidence decreases

This ensures that only reliable corrections gain trust over time.

⚖️ Decision Logic

The system uses confidence-based decision thresholds:

Confidence Score	Action
≥ 0.8	Auto-apply
0.5 – 0.79	Suggest correction (human review)
< 0.5	Escalate to human

Low-confidence memory is never auto-applied, preventing unsafe automation.

📈 Learning & Confidence Evolution

Confidence increases when humans approve corrections

Confidence decreases when corrections are rejected

Confidence is capped between 0.0 and 1.0

Only the highest-confidence memory is applied to prevent noisy or duplicate learning

🧾 Audit Trail & Explainability

Every invoice processing run generates a complete audit trail:

{
  "step": "apply | decide | learn",
  "timestamp": "...",
  "details": "Explanation of the action taken"
}


This ensures:

Full traceability

Clear reasoning for decisions

Debuggability and auditability

📦 Persistence

SQLite is used for persistent storage

Memory persists across application restarts

The database file (memory.db) is intentionally excluded from version control

The database is automatically created on first run

▶️ How to Run the Demo
Install dependencies
npm install

Run the demo
npx ts-node src/index.ts

🎬 Demo Flow

Invoice #1

No memory exists

System requires human review

Human correction is applied

Vendor memory is stored

Invoice #2

Vendor memory is recalled

Fields are normalized automatically

Confidence increases

Fewer flags are raised

This demonstrates learning over time.

🛠️ Tech Stack

TypeScript (strict mode)

Node.js

SQLite (better-sqlite3)

Heuristic-based learning (no ML training)

✅ Design Principles

Explainability over black-box automation

Human-in-the-loop learning

Safe automation using confidence thresholds

Clean and extensible architecture

📌 Notes

This project focuses only on the memory and learning layer.
Invoice extraction (OCR / parsing) is assumed to be handled upstream.

👤 Author

Rahul Prakash
AI Agent Development Intern Assignment – Flowbit Private Limited
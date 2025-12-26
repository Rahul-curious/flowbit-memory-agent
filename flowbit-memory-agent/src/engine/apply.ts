import { recallVendorMemory } from "./recall";

export function applyVendorMemory(invoice: any) {
  const memories = recallVendorMemory(invoice.vendor);

  const normalizedInvoice: any = { ...invoice };
  const proposedCorrections: string[] = [];

  memories.forEach((memory: any) => {
    const originalField = memory.key;
    const normalizedField = memory.value;

    if (invoice.fields[originalField]) {
      normalizedInvoice.fields[normalizedField] =
        invoice.fields[originalField];

      proposedCorrections.push(
        `Mapped ${originalField} → ${normalizedField} using vendor memory`
      );
    }
  });

  return {
    normalizedInvoice,
    proposedCorrections
  };
}

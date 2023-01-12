import { PolicyHolder } from "./PolicyHolder";

export interface Policy {
  id?: string,
  policyNumber: number,
  policyHolder: PolicyHolder,
}

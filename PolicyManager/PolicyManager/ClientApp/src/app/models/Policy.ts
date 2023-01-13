import { PolicyHolder } from "./policyHolder";

export interface Policy {
  id?: string,
  policyNumber: number,
  policyHolder: PolicyHolder,
}

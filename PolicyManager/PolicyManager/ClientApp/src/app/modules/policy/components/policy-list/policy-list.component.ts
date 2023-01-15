import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Policy } from '../../models/policy';
import { PolicyService } from '../../services/policy.service';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.scss']
})
export class PolicyListComponent implements OnInit, OnDestroy {

  public policies: Policy[] = []
  private sub?: Subscription;

  constructor(
    private policyService: PolicyService,
    private toasterService: ToastrService) {
  }

  ngOnInit(): void {
    this.sub = this.policyService.get().subscribe(policies => this.policies = policies);
  }

  onSubmitPolicy(newPolicy: Policy) {
    this.policyService.add(newPolicy)
      .subscribe(() => {
        this.policies.push(newPolicy);
        this.toasterService.success('Policy successfully added.', 'Added');
      },
        errorResponse => this.toasterService.error(errorResponse.error, 'Error adding policy'));
  }

  onDeletePolicy(deletedPolicy: Policy) {
    this.policyService.delete(deletedPolicy)
    .subscribe(
      () => {
        this.policies = this.policies.filter(policy => policy !== deletedPolicy);
        this.toasterService.warning(`Policy ${deletedPolicy.policyNumber} Deleted!`, 'Deleted Successfully');
      },
      errorResponse => this.toasterService.error(errorResponse.error, 'Error deleting policy'));
  }

  onUpdatePolicy(updatedPolicy: Policy, index: number) {
    this.policyService.update(updatedPolicy)
      .subscribe(() => {
        this.policies[index] = updatedPolicy;
        this.toasterService.success('Policy successfully updated.', 'Updated');
      },
      errorResponse => this.toasterService.error(errorResponse.error, 'Error updating policy'));
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Policy } from 'src/app/models/Policy';
import { PolicyService } from 'src/app/services/policy.service';

@Component({
  selector: 'app-policy-item',
  templateUrl: './policy-item.component.html',
  styleUrls: ['./policy-item.component.scss']
})
export class PolicyItemComponent implements OnInit {
  @Input() policyInput!: Policy;

  public editing: boolean = false;

  constructor(
    private policyService: PolicyService,
    private toasterService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  deletePolicy(item: Policy) {
    this.policyService.delete(item)
      .subscribe(
        () => this.toasterService.warning(`Policy ${item.policyNumber} Deleted!`, 'Deleted Successfuly'),
        errorResponse => this.toasterService.error(errorResponse.error, 'Error deleting policy'));
  }

  editPolicy() {
    this.editing = true;
  }

  onSubmitPolicy(updatedPolicy: Policy) {
    this.policyService.update(updatedPolicy)
      .subscribe(() => {
        this.editing = false;
        this.toasterService.success('Policy succesfully updated.', 'Updated');
      },
      errorResponse => this.toasterService.error(errorResponse.error, 'Error updating policy'));
  }

  onCancel() {
    this.editing = false;
  }
}

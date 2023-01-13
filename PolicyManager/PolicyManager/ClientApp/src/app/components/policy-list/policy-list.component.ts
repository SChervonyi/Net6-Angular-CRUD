import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Policy } from 'src/app/models/policy';
import { PolicyService } from 'src/app/services/policy.service';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.scss']
})
export class PolicyListComponent implements OnInit {

  public policies$!: Observable<Policy[]>

  constructor(
    private policyService: PolicyService,
    private toasterService: ToastrService) {
  }

  ngOnInit(): void {
    this.policies$ = this.policyService.get();
  }

  onSubmitPolicy(newPolicy: Policy) {
    this.policyService.add(newPolicy)
      .subscribe(() => this.toasterService.success('Policy succesfully added.', 'Added'),
        errorResponse => this.toasterService.error(errorResponse.error, 'Error adding policy'));
  }
}

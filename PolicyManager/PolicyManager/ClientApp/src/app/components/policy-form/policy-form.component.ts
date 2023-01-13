import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Policy } from 'src/app/models/policy';
import { PolicyHolder } from 'src/app/models/policyHolder';
import { PolicyHolderService } from 'src/app/services/policy-holder.service';

@Component({
  selector: 'app-policy-form',
  templateUrl: './policy-form.component.html',
  styleUrls: ['./policy-form.component.scss']
})
export class PolicyFormComponent implements OnInit, OnDestroy {

  @Input() policyInput: Policy | null = null;
  @Output() submitPolicy = new EventEmitter<Policy>();
  @Output() cancel = new EventEmitter();

  public policyHolders: PolicyHolder[] = [];
  public policyForm: FormGroup;
  public isEditMode: boolean = false;
  public policyPlaceholderCtrl: FormControl = new FormControl();

  private sub?: Subscription;

  constructor(
    private policyHolderService: PolicyHolderService,
    private fb: FormBuilder) {
      this.policyForm = this.fb.group({
        policyNumber: ['', Validators.required],
        policyHolderName: ['', Validators.required],
      });
  }

  ngOnInit(): void {
    this.sub = this.policyHolderService.get()
      .subscribe(values => this.policyHolders = values);

    this.isEditMode = !this.policyInput;
    if(this.policyInput){
      this.policyForm.setValue({
        policyNumber: this.policyInput.policyNumber,
        policyHolderName: this.policyInput.policyHolder.name
      });
    }
  }

  get policyNumber() { return this.policyForm.get('policyNumber')!; }

  get policyHolderName() { return this.policyForm.get('policyHolderName')!; }

  onSubmit(form: FormGroup){
    const selectedPolicyHolder = this.policyHolders.find(ph => ph.name === form.value.policyHolderName);
    if(!selectedPolicyHolder){
      return;
    }

    const policy = {
      id: this.policyInput?.id,
      policyNumber: form.value.policyNumber,
      policyHolder: selectedPolicyHolder
    };

    this.submitPolicy.emit(policy);
    this.policyForm.reset({})
  }

  onCancel(){
    this.cancel.emit();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Policy } from 'src/app/models/Policy';
import { PolicyHolder } from 'src/app/models/PolicyHolder';
import { PolicyHolderService } from 'src/app/services/policy-holder.service';

@Component({
  selector: 'app-policy-form',
  templateUrl: './policy-form.component.html',
  styleUrls: ['./policy-form.component.scss']
})
export class PolicyFormComponent implements OnInit {

  @Input() policyInput: Policy | null = null;
  @Output() submitPolicy = new EventEmitter<Policy>();
  @Output() cancel = new EventEmitter();

  public policyHolders!: PolicyHolder[];
  public policyForm!: FormGroup;
  public isEditMode: boolean = false;
  public policyPlaceholderCtrl: FormControl = new FormControl();

  constructor(
    private policyHolderService: PolicyHolderService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.policyHolderService.get().subscribe(values => this.policyHolders = values);
    this.isEditMode = !this.policyInput;

    this.policyForm = this.fb.group({
      policyNumber: [this.policyInput?.policyNumber ?? '', Validators.required],
      policyHolder: [this.policyInput?.policyHolder?.name ?? 'Hello', Validators.required],
    });
  }

  get policyNumber() { return this.policyForm.get('policyNumber')!; }

  get policyHolder() { return this.policyForm.get('policyHolder')!; }

  onSubmit(form: FormGroup){
    const policyHolder = this.policyHolders.find(ph => ph.name === form.value.policyHolder);
    if(!policyHolder){
      return;
    }

    const policy = {
      id: this.policyInput?.id,
      policyNumber: form.value.policyNumber,
      policyHolder: policyHolder
    };

    this.submitPolicy.emit(policy);
    this.policyForm.reset({})
  }

  onCancel(){
    this.cancel.emit();
  }
}

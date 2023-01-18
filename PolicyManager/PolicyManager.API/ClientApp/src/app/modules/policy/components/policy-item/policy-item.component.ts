import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Policy } from '../../models/policy';

@Component({
  selector: 'app-policy-item',
  templateUrl: './policy-item.component.html',
  styleUrls: ['./policy-item.component.scss']
})
export class PolicyItemComponent implements OnInit {
  @Input() policyInput!: Policy;
  @Output() deletePolicy = new EventEmitter<Policy>();
  @Output() updatePolicy = new EventEmitter<Policy>();

  public editing: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onDeletePolicy(item: Policy) {
    this.deletePolicy.emit(item);
  }

  onEditPolicy() {
    this.editing = true;
  }

  onSubmitPolicy(updatedPolicy: Policy) {
    this.editing = false;
    this.updatePolicy.emit(updatedPolicy);
  }

  onCancel() {
    this.editing = false;
  }
}

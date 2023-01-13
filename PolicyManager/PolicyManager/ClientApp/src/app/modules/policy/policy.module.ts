import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PolicyItemComponent } from './components/policy-item/policy-item.component';
import { PolicyListComponent } from './components/policy-list/policy-list.component';
import { PolicyFormComponent } from './components/policy-form/policy-form.component';
import { PolicyHolderService } from './services/policy-holder.service';
import { PolicyService } from './services/policy.service';
import { PolicyRoutingModule } from './policy-routing.module';
import { PolicyComponent } from './components/policy/policy.component';

@NgModule({
  declarations: [
    PolicyItemComponent,
    PolicyListComponent,
    PolicyFormComponent,
    PolicyComponent,
  ],
  providers: [
    PolicyService,
    PolicyHolderService
  ],
  imports: [
    CommonModule,
    PolicyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PolicyModule { }

import { NgModule } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// import { ToastrModule } from 'ngx-toastr';
import { PolicyItemComponent } from './components/policy-item/policy-item.component';
import { PolicyListComponent } from './components/policy-list/policy-list.component';
import { PolicyFormComponent } from './components/policy-form/policy-form.component';
import { PolicyHolderService } from './services/policy-holder.service';
import { PolicyService } from './services/policy.service';
import { PolicyRoutingModule } from './policy-routing.module';

@NgModule({
  declarations: [
    PolicyItemComponent,
    PolicyListComponent,
    PolicyFormComponent
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyListComponent } from './components/policy-list/policy-list.component';
import { PolicyComponent } from './pages/policy/policy.component';

const routes: Routes = [
  {
    path: 'policy',
    component: PolicyComponent,
      children: [
        {
            path: '',
            component: PolicyListComponent
        }
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyRoutingModule {}

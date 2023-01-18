import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MountConfig } from 'cypress/angular';
import { PolicyHolder } from '../../models/policyHolder';
import { PolicyHolderService } from '../../services/policy-holder.service'
import { PolicyFormComponent } from './policy-form.component'

describe('PolicyFormComponent', () => {
  const config: MountConfig<PolicyFormComponent> = {
    imports: [FormsModule, ReactiveFormsModule, HttpClientModule], providers: [PolicyHolderService]
  };

  it('mounts', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/policyHolder',
      },
      [<PolicyHolder>{
        name: 'John Cena',
        age: 37,
        gender: 'Male'
      }]
    ).as('getPolicyHolders')

    cy.mount(PolicyFormComponent, config)
  });
});

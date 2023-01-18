import { MountConfig } from 'cypress/angular';
import { PolicyFormComponent } from '../policy-form/policy-form.component';
import { PolicyItemComponent } from './policy-item.component';

describe('PolicyItemComponent', () => {
  const config: MountConfig<PolicyItemComponent> = {
    declarations: [PolicyFormComponent],
    componentProperties: {
      policyInput: {
        policyNumber: 7,
        policyHolder: {
          name: 'John Cena',
          age: 37,
          gender: 'Male'
        }
      }
    }
  };

  it('mounts', () => {
    cy.mount(PolicyItemComponent, config)
  })
});

describe('Policy spec', () => {
  it('visit home page', () => {
    cy.visit('https://localhost:44439')

    const redirectedUrl = cy.url();
    expect(redirectedUrl).to.eq('https://localhost:44439/policy')
  })
})

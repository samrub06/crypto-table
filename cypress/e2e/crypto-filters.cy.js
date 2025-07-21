// Basic Cypress tests for CryptoFilters and useFilterStateWithUrl
// Les commentaires sont en anglais, le code est simple et propre

describe('CryptoFilters & useFilterStateWithUrl', () => {
  // Before each test, visit the root (HashRouter)
  beforeEach(() => {
    cy.visit('/#/')
  })

  it('renders all filter controls with default values', () => {
    // Check for filter labels
    cy.contains('Min Market Cap ($)').should('exist')
    cy.contains('Max Price ($)').should('exist')
    cy.contains('Sort by').should('exist')
    cy.contains('Direction').should('exist')
    cy.contains('Items per page').should('exist')
    cy.contains('Reset filters').should('exist')

    // Check default values
    cy.get('input[type="number"]').eq(0).should('have.value', 0) // minMarketCap
    cy.get('input[type="number"]').eq(1).should('have.value', 117839) // maxPrice
    cy.get('select').eq(0).should('have.value', 'market_cap') // sortKey
    cy.get('select').eq(1).should('have.value', 'desc') // sortDir
    cy.get('select').eq(2).should('have.value', '10') // pageSize
  })

  it('can change filters and see URL update', () => {
    // Change min market cap
    cy.get('input[type="number"]').eq(0).clear().type('1000000')
    // Change max price
    cy.get('input[type="number"]').eq(1).clear().type('500')
    // Change sort key
    cy.get('select').eq(0).select('price')
    // Change sort direction
    cy.get('select').eq(1).select('asc')
    // Change page size
    cy.get('select').eq(2).select('20')

    // URL should update accordingly
    cy.url().should('include', 'minMarketCap=1000000')
    cy.url().should('include', 'maxPrice=500')
    cy.url().should('include', 'sortBy=price')
    cy.url().should('include', 'order=asc')
    cy.url().should('include', 'pageSize=20')
  })

  it('reset button restores default values and URL', () => {
    // Change some filters
    cy.get('input[type="number"]').eq(0).clear().type('123456')
    cy.get('select').eq(0).select('name')
    // Click reset
    cy.contains('Reset filters').click()
    // Check default values
    cy.get('input[type="number"]').eq(0).should('have.value', 0)
    cy.get('input[type="number"]').eq(1).should('have.value', 117839)
    cy.get('select').eq(0).should('have.value', 'market_cap')
    cy.get('select').eq(1).should('have.value', 'desc')
    cy.get('select').eq(2).should('have.value', '10')
    // URL should be reset
    cy.url().should('include', 'minMarketCap=0')
    cy.url().should('include', 'maxPrice=117839')
    cy.url().should('include', 'sortBy=market_cap')
    cy.url().should('include', 'order=desc')
    cy.url().should('include', 'pageSize=10')
  })

  it('changing page size to All disables pagination', () => {
    // Change page size to All
    cy.get('select').eq(2).select('All')
    // Pagination buttons should not exist
    cy.contains('Previous').should('not.exist')
    cy.contains('Next').should('not.exist')
  })
})

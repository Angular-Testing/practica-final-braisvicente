describe('GIVEN navigating to the launch card', () => {
  beforeEach(() => {
    // Arrange
    cy.visit('/');
    cy.get(':nth-child(2) > aside > h3 > a').click();
  });
  context('WHEN add first item addToFavorites', () => {
    beforeEach(() => {
      // Act
      cy.get('[data-testid=addToFavorites-button]').click();
    });
    it('THEN stay in url /favorites', function () {
      // Assert
      cy.url().should('include', '/favorites');
    });
    it('THEN contain remove from favorites button', function () {
      // Assert
      cy.contains('Remove from favorites 💔');
    });
  });

  context('WHEN add 2 items addToFavorites', () => {
    beforeEach(() => {
      // Act
      cy.get('[data-testid=addToFavorites-button]').click();
      cy.visit('/');
      cy.get(':nth-child(3) > aside > h3 > a').click();
      cy.get('[data-testid=addToFavorites-button]').click();
    });
    it('THEN stay in url /favorites', function () {
      // Assert
      cy.url().should('include', '/favorites');
    });
    it('THEN found 2 launches', function () {
      // Assert
      cy.contains('Found 2 launches');
    });

    context('WHEN remove 1 item', () => {
      beforeEach(() => {
        // Act
        cy.get(':nth-child(2) > aside > [data-testid=removeFromFavorites-button]').click();
      });
      it('THEN stay in url /favorites', function () {
        // Assert
        cy.url().should('include', '/favorites');
      });
      it('THEN found 1 launches', function () {
        // Assert
        cy.contains('Found 1 launches');
      });
    });
  });
});

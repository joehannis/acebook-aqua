import 'cypress-file-upload';

describe("Making a post", () => {
  it("login and make a post", () => {
    cy.visit("/");
    cy.contains("Sign Up").click();
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#username").type("username");
    cy.get("#submit").click();
    cy.contains("Log In").click();
    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.get(".create-post-container").type("This is a test post");
    cy.get("#post-submit").click();
    cy.contains("This is a test post").should("be.visible");
  });

  // it("login and make an image post", () => {
  //   cy.visit("/");
  //   cy.contains("Sign Up").click();
  //   cy.get("#email").type("someone@example.com");
  //   cy.get("#password").type("password");
  //   cy.get("#username").type("username");
  //   cy.get("#submit").click();
  //   cy.contains("Log In").click();
  //   cy.get("#email").type("someone@example.com");
  //   cy.get("#password").type("password");
  //   cy.get("#submit").click();
  
  //   cy.fixture('DND-2000-Xilus.png').then(fileContent => {
  //     cy.get('input[type="file"]').attachFile({
  //       fileContent,
  //       fileName: 'DND-2000-Xilus.png',
  //       mimeType: 'image/png'
  //     });
  //   });
  
  //   cy.get("#post-submit").click();
  //   cy.contains('DND-2000-Xilus.png').should("exist");
  // });
  
});



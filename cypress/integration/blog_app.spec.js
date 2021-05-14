describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset")
    // Create a new user
    const user = {
      name: "Name",
      username: "Username",
      password: "Password",
    }
    cy.request("POST", "http://localhost:3001/api/users", user)
    cy.visit("http://localhost:3000")
  })
  it("Login form is shown", function () {
    cy.contains("Username")
    cy.contains("Password")
    cy.contains("Login")
  })
  describe("Login", function () {
    it("Succeeds with correct credentials", function () {
      cy.get("input:first").type("Username")
      cy.get("input:last").type("Password")
      cy.get("button").click()
      cy.contains("Name logged in")
    })
    it("Fails with wrong credentials", function () {
      cy.get("input:first").type("Wrong")
      cy.get("input:last").type("Wrong")
      cy.get("button").click()
      cy.contains("Wrong username or password")
    })
  })
})

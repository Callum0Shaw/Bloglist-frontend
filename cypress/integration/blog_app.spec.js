describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    // Create a new user
    const user = {
      name: "Name",
      username: "Username",
      password: "Password",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:3000");
  });
  it("Login form is shown", function () {
    cy.contains("Username");
    cy.contains("Password");
    cy.contains("Login");
  });
  describe("Login", function () {
    it("Succeeds with correct credentials", function () {
      cy.get("input:first").type("Username");
      cy.get("input:last").type("Password");
      cy.get("button").click();
      cy.contains("Name logged in");
    });
    it("Fails with wrong credentials", function () {
      cy.get("input:first").type("Wrong");
      cy.get("input:last").type("Wrong");
      cy.get("button").click();
      cy.contains("Wrong username or password");
    });
  });
  describe("When logged in:", function () {
    beforeEach(function () {
      cy.login({ username: "Username", password: "Password" });
    });

    it("A blog can be created", function () {
      cy.get("#showToggle").click();
      cy.get("#Title").type("Test Blog");
      cy.get("#Author").type("Test Author");
      cy.get("#Url").type("Test Url");
      cy.get("Button").contains("Create").click();
      cy.contains("Blog: Test Blog by Test Author added");
      cy.get(".blog").contains("Test Blog by Test Author");
    });
    it("A blog can be liked", function () {
      cy.postBlog({
        title: "Test Title",
        Author: "Test Author",
        url: "Test Url",
      });
      cy.get("#showBlog").click();
      cy.get("#likeBlog").click();
      cy.contains("1");
    });
    it("A user can delete their blogs", function () {
      cy.postBlog({
        title: "Test Title",
        Author: "Test Author",
        url: "Test Url",
      });
      cy.get("#showBlog").click();
      cy.get("#deleteBlog").click();
      cy.get(".blog").should("not.exist");
    });
  });
});

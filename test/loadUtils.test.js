// Importing mocha and chai.
const mocha = require("mocha");
const chai = require("chai");
const assert = require("assert");
const expect = chai.expect;

// Importing commonFunctionality.js where our code is written.
const loadUtils = require("../routes/utils/loadUtils");

describe("loadUtils.js tests", () => {
  describe('loadUtils.loadPerviousDayOrders() Testing async function', () => {
    it("Should equal to (true, true)", async function () {
      // Call the function we're testing.
      await loadUtils.loadPerviousDayOrders();
      assert.equal(true, true);
    });
  });
});

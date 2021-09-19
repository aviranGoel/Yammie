// Importing mocha and chai.
const mocha = require("mocha");
const chai = require("chai");

const expect = chai.expect;

// Importing commonFunctionality.js where our code is written.
const dbUtils = require("../routes/utils/dbUtils");

describe("dbUtils.js tests", () => {
  describe("dbUtils.isYammieOrdersDbExists() Test", () => {
    it("Should equal to true", function () {
      // Call the function we're testing.
      var result = dbUtils.isYammieOrdersDbExists();
      // Assertions.
      expect(result).to.equal(true);
    });
  });

  describe("dbUtils.getNextOrderId() Test", () => {
    it("Should equal to 7", function () {
      // Call the function we're testing.
      var result = dbUtils.getNextOrderId();
      // Assertions.
      expect(result).to.equal(7);
    });
  });

  describe('dbUtils.getOrdersByDate("14-09-2021") Test', () => {
    it("Should equal to { orders: [] }", function () {
      // Call the function we're testing.
      var result = dbUtils.getOrdersByDate("14-09-2021");
      // Assertions.
      // Note: eql is the way to compare Arrays/Objects, it is using deep equality.
      expect(result).to.eql({ orders: [] });
    });
  });

  describe('dbUtils.getOrdersByDate("15-09-2021") Test', () => {
    it("Should equal to { orders: [ { order_id: 0, first_name: 'Hamato', last_name: 'Yoshi', phone: '0500000000', number_of_diners: '1', meal_date: '16-09-2021', meal_time: '07:00', order_execution_date: '15-09-2021', order_execution_time: '12:00:00' } ] }", function () {
      // Call the function we're testing.
      var result = dbUtils.getOrdersByDate("15-09-2021");
      // Assertions.
      // Note: eql is the way to compare Arrays/Objects, it is using deep equality.
      expect(result).to.eql({
        orders: [
          {
            order_id: 0,
            first_name: "Hamato",
            last_name: "Yoshi",
            phone: "0500000000",
            number_of_diners: "1",
            meal_date: "16-09-2021",
            meal_time: "07:00",
            order_execution_date: "15-09-2021",
            order_execution_time: "12:00:00",
          },
        ],
      });
    });
  });
});

const fs = require("fs");

const yammieOrdersDb_path = "yammieDb/yammieOrdersDb.json";

/**
 * Check if the OrdersDb of Yammie Restaurant exists in the Backend API.
 * @returns true if exists, otherwise false
 */
function isYammieOrdersDbExists() 
{
  try 
  {
    if (fs.existsSync(yammieOrdersDb_path)) 
    {
      // yammieOrdersDb.json is exists.
      return true;
    }
  } 
  catch (err) 
  {
    // yammieOrdersDb.json is not exists.
    return false;
  }
}

/**
 * Find the order_id that the next order should have, by checking how many orders are in OrdersDb.
 * @returns number of the next order_id.
 */
function getNextOrderId() {
  let yammieOrdersDb = JSON.parse(fs.readFileSync(yammieOrdersDb_path, "utf8"));

  // The length (amount of orders) represent the order_id of the next order.
  let next_order_id = yammieOrdersDb["orders"].length;

  return next_order_id;
}

/**
 * Add new order to the OrdersDb of Yammie Restaurant.
 * @param {*} order_id : Order id of the new order.
 * @param {*} first_name : Customer first name.
 * @param {*} last_name : Customer last name.
 * @param {*} phone : Customer phone number.
 * @param {*} number_of_diners : Number of Diners in the order.
 * @param {*} meal_date : The date the meal will take place.
 * @param {*} meal_time : The time the meal will take place.
 * @param {*} order_execution_date : Date when the order was created.
 * @param {*} order_execution_time : Time when the order was created.
 */
function addOrderToYammieOrdersDb(order_id, first_name, last_name, phone, number_of_diners, meal_date, meal_time, order_execution_date, order_execution_time) 
{
  let order_data;

  // Create object of the new order.
  let new_order = {
    order_id: order_id,
    first_name: first_name,
    last_name: last_name,
    phone: phone,
    number_of_diners: number_of_diners,
    meal_date: meal_date,
    meal_time: meal_time,
    order_execution_date: order_execution_date,
    order_execution_time: order_execution_time,
  };

  if (order_id === 0) {
    // If it is the first order,
    // we create object of orders and inside object of the new order.
    let first_order = {
      orders: [new_order],
    };

    order_data = JSON.stringify(first_order, null, 2);
    try {
      fs.writeFileSync(yammieOrdersDb_path, order_data);
    } catch (error) {
      throw "The order didn't saved, please check the details and try again";
    }
  } else {
    // Otherwise (it is not the first order),
    // we insert an object of the new order following on from previous orders objects.
    fs.readFile(yammieOrdersDb_path, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        try {
          // Convert the origin data (the old orders) to an object.
          let obj = JSON.parse(data);
          // Add new order to the origin data (the old orders).
          obj.orders.push(new_order);
          // Convert all orders back to JSON (it included the new order).
          let json = JSON.stringify(obj, null, 2);
          // Write the orders back to the DB (the JSON file).
          fs.writeFileSync(yammieOrdersDb_path, json);
        } catch (error) {
          throw "The order didn't saved, please check the details and try again";
        }
      }
    });
  }
}

/**
 * Get orders of given_date from OrdersDb of Yammie Restaurant.
 * @param {*} given_date : The given date to get orders.
 * @returns 
 */
function getOrdersByDate(given_date) 
{
  // Init the answer object.
  // Note-if there are no orders in the given_date, we will return this empty object.
  let orders_by_date = 
  {
    orders: [],
  };
      
  try 
  {
    let yammieOrdersDb = JSON.parse(fs.readFileSync(yammieOrdersDb_path, "utf8"));

    yammieOrdersDb.orders.forEach((current_order) => 
    {
      if (current_order.order_execution_date === given_date) 
      {
        // If current order created in the same given_date,
        // add it to the orders_by_date.
        orders_by_date.orders.push(current_order);
      }
    });

    return orders_by_date;
  } 
  catch (error) 
  {
    throw "Yammie OrdersDb doesn't Exists";
  }
}

exports.isYammieOrdersDbExists = isYammieOrdersDbExists;
exports.getNextOrderId = getNextOrderId;
exports.addOrderToYammieOrdersDb = addOrderToYammieOrdersDb;
exports.getOrdersByDate = getOrdersByDate;

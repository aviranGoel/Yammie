const dbUtils = require("./dbUtils");

/**
 * Save new order in OrdersDb of Yammie Restaurant.
 * Calculate the date and the time when the order created.
 * @param {*} body_params : Details of the new order.
 * @returns 
 */
async function saveOrder(body_params) 
{
  let next_order_id;
  if (!(dbUtils.isYammieOrdersDbExists())) 
  {
    // Case when the OrdersDb not exists-init the first order with order_id=0.
    next_order_id = 0;
  } 
  else 
  {
    // Case when the OrdersDb exists-find the order_id that the next order should have.
    next_order_id = dbUtils.getNextOrderId();
  }

  // Get the current date and current time, when the order was created.
  let current_date_time = getCurrentDateAndTime();
  let order_execution_date = current_date_time[0];
  let order_execution_time = current_date_time[1];

  // Check if dinner_date and dinner_time are legal.
  // In one of the following cases they are illegal:
  // * dinner_date has already passed.
  // OR
  // * dinner_date is today but the dinner_time already passed.
  if ((body_params.dinner_date < order_execution_date) ||
    ((body_params.dinner_date === order_execution_date) && (body_params.dinner_time < order_execution_time))) 
  {
    throw "The dinner date and time are not valid, they already passed";
  }

  try 
  {
    // Add the new order to the OrdersDb of Yammie Restaurant.
    dbUtils.addOrderToYammieOrdersDb(
      next_order_id,
      body_params.first_name,
      body_params.last_name,
      body_params.phone,
      body_params.number_of_diners,
      body_params.dinner_date,
      body_params.dinner_time,
      order_execution_date,
      order_execution_time
    );
  } catch (error) {
    throw "The order didn't saved, please check the details and try again";
  }

  // Create the return answer.
  let answer = "Order Saved";

  return answer;
}

/**
 * Calculate the current date and time when the order was created.
 * @returns Current_date (DD-MM-YYYY), current_time (HH-MM-SS).
 */
function getCurrentDateAndTime()
{
  let time_stamp = Date.now();

  let current_date_time = new Date(time_stamp);
  
  // In case when we got single digit, we adjust 0 before.
  let day = ("0" + current_date_time.getDate()).slice(-2);
  let month = ("0" + (current_date_time.getMonth() + 1)).slice(-2);
  let year = current_date_time.getFullYear();
  let hours = current_date_time.getHours();
  let minutes = ("0" + current_date_time.getMinutes()).slice(-2);
  let seconds = ("0" + current_date_time.getSeconds()).slice(-2);

  // Date in format DD-MM-YYYY.
  let current_date = day + "-" + month + "-" + year;
  // Time in format HH:MM:SS.
  let current_time = hours + ":" + minutes + ":" + seconds;

  return [current_date, current_time];
}

exports.saveOrder = saveOrder;

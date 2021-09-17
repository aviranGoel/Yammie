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
  if (!(await dbUtils.isYammieOrdersDbExists())) {
    // Case when the OrdersDb not exists-init the first order with order_id=0.
    next_order_id = 0;
  } else {
    // Case when the OrdersDb exists-find the order_id that the next order should have.
    next_order_id = await dbUtils.getNextOrderId();
  }

  // Get the current date and current time, when the order was created.
  let current_date_time = await getCurrentDateAndTime();
  let order_date = current_date_time[0];
  let order_time = current_date_time[1];

  try
  {
    // Add the new order to the OrdersDb of Yammie Restaurant.
    await dbUtils.addOrderToYammieOrdersDb(
        next_order_id,
        body_params.first_name,
        body_params.last_name,
        body_params.phone,
        body_params.price,
        order_date,
        order_time
    );
  }
  catch(error)
  {
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
async function getCurrentDateAndTime()
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
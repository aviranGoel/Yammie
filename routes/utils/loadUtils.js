const dbUtils = require("./dbUtils");

/**
 * Load orders from OrdersDb of Yammie Restaurant,
 * that their order_execution_date is the date of yesterday.
 * @returns Object of orders, with orders that created in the given date, or without any order.
 */
async function loadPerviousDayOrders() 
{
  let yesterday_date = getYesterdayDate();

  let yesterday_orders = dbUtils.getOrdersByDate(yesterday_date);

  return yesterday_orders;
}

/**
 * Get the date of yesterday, in format: DD-MM-YYYY.
 * @returns The date of yesterday, format: DD-MM-YYYY.
 */
function getYesterdayDate() 
{
  let time_stamp = Date.now();

  let current_date_time = new Date(time_stamp);

  // In case when we got single digit, we adjust 0 before.
  let day = ("0" + current_date_time.getDate()).slice(-2);
  let month = ("0" + (current_date_time.getMonth() + 1)).slice(-2);
  let year = current_date_time.getFullYear();

  // Date in format DD-MM-YYYY.
  let current_date_yyyymmdd = year + "-" + month + "-" + day;

  let temp_date = new Date(current_date_yyyymmdd);
  temp_date.setDate(temp_date.getDate() - 1);

  let previous_date_yyyymmdd = temp_date.toISOString().split("T")[0];

  // Previous date in format DD-MM-YYYY.
  let previous_date_ddmmyyyy = formatDateTo_ddmmyyyy(previous_date_yyyymmdd);

  return previous_date_ddmmyyyy;
}

/**
 * Change date from String format: YYYY-MM-DD,
 * to String format: DD-MM-YYYY.
 * @param {*} date_yyyymmdd : The date to change.
 * @returns Date in format: DD-MM-YYYY.
 */
function formatDateTo_ddmmyyyy(date_yyyymmdd) {
  let date_array = date_yyyymmdd.split("-");
  let formatted_date_ddmmyyyy =
    date_array[2] + "-" + date_array[1] + "-" + date_array[0];
  return formatted_date_ddmmyyyy;
}

exports.loadPerviousDayOrders = loadPerviousDayOrders;

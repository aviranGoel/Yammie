const dbUtils = require("./dbUtils");


async function loadPerviousDayOrders() 
{
    let previous_day = await getPreviousDay();

    // let answer = await dbUtils.getOrdersByDate(previous_day);
    await dbUtils.getOrdersByDate(previous_day)
    .then((details) => {
        console.log("deatils: ", details);
        return details;
        })
    .catch((error) => {
        console.log(error);
        return error;
      });


    // console.log(answer);
// 
    // return answer;
}


async function getPreviousDay() 
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

    let previous_date_ddmmyyyy = await formatDateTo_ddmmyyyy(previous_date_yyyymmdd);

    return previous_date_ddmmyyyy;
}


/**
 * Change date from String format: YYYY-MM-DD,
 * to String format: DD-MM-YYYY.
 * @param {*} date_yyyymmdd : String, the date to change.
 * @returns 
 */
async function formatDateTo_ddmmyyyy(date_yyyymmdd) 
{
    let date_array = date_yyyymmdd.split("-");
    let formatted_date_ddmmyyyy = date_array[2] + "-" + date_array[1] + "-" + date_array[0];
    return formatted_date_ddmmyyyy;
}


exports.loadPerviousDayOrders = loadPerviousDayOrders;

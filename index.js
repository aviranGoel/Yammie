const express = require("express");
const fs = require("fs");
const morgan = require('morgan')
const path = require("path");

const app = express();
const port = 3000;

// Create a write stream (in append mode).
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'yammieAPI_logger.log'), { flags: 'a' })
 
// Setup the logger.
app.use(
  morgan(
    '[:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
    { stream: accessLogStream }
  )
);

// Using the body of request as JSON.
app.use(express.json());

// Routes importing
const save = require("./routes/save");
const load = require("./routes/load");

// Routing: Depending on the beginning of the path, we will make the routing.
app.use("/save", save);
app.use("/load", load);

app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to Yammie Restaurant Restaurant Backend API!</h1>" +
      "<h3>A Backend Rest API which built in JavaScript and node.js, and runs locally." +
      "<br/>" +
      "The server can receive the following requests from the client:</h3>" +
      "<p>&emsp;<b>1. Save a new order.</b>" +
      "<br/>" +
      "&emsp;&emsp;" +
      "By receiving a Post request that contains the order details within the body request:" +
      "<br/>" +
      "&emsp;&emsp;" +
      '"http://localhost:3000/save"</p>' +
      "<p>&emsp;<b>2. Get all orders from the last day.</b>" +
      "<br/>" +
      "&emsp;&emsp;" +
      "By receiving a Get request:" +
      "<br/>" +
      "&emsp;&emsp;" +
      '"http://localhost:3000/load"</p>' +
      "<h3>The orders are saved in the json file: 'yammieOrdersDb.json'." +
      "<br/>" +
      "The requests are documented in a log file: 'yammieAPI_logger.log'.</h3>" +
      "<hr>" +
      "<h2>Instructions:</h2>" +
      "<p>To get the YammieBackendAPI app running locally, follow these steps:" +
      "<br/>" +
      "1. Clone the <a href='https://github.com/aviranGoel/Yammie'>Yammie</a> repository." +
      "<br/>" +
      "2. Install the node modules `npm install`." +
      "<br/>" +
      "3. Run the app `npm start`." +
      "<br/>" +
      "4. The app available at `http://localhost:3000`." +
      "<br/>" +
      "5. Access the paths mentioned above by using `Postman`.</p>"
  );
});

app.listen(port, () => {
  console.log(
    `Yammie Restaurant Backend API app listening at http://localhost:${port}`
  );
});

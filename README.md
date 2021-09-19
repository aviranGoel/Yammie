# Yammie Restaurant

## Welcome to Yammie Restaurant Backend API!

### A Backend Rest API which built in JavaScript and node.js, and runs locally.
### The server can receive the following requests from the client:

1. Save a new order.
   
   By receiving a Post request that contains the order details within the body request:

   "http://localhost:3000/save"

2. Get all orders from the last day.

   By receiving a Get request:
   
   "http://localhost:3000/load"

### The orders are saved in the json file: "yammieOrdersDb.json".

### The requests are documented in a log file: "yammieAPI_logger.log".

---
## Instructions:

To get the YammieBackendAPI app running locally, follow these steps:

1. Clone the [Yammie](https://github.com/aviranGoel/Yammie) repository.
2. Install the node modules `npm install`.
3. Run the app `npm start`.
4. The app available at `http://localhost:3000`.
5. Access the paths mentioned above by using `Postman`.
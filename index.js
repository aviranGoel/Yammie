const express = require("express");
const app = express();
const port = 3000;

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
    "<h1>Welcome to Yammie Backend API</h1>"
  );
});

app.listen(port, () => {
  console.log(`Yammie Backend API app listening at http://localhost:${port}`);
});

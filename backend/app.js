const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT ?? 3000;

// app config
app.use(express.json());
app.use(cors());

// Routes
const routes = require("./src/routes");

app.use("/api", routes);

app.get("*", (req, res) => {
  return res.status(404).send("Page Not Found!!");
});

// app listener
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

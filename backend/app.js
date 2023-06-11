const express = require("express");

const app = express();
const PORT = process.env.PORT ?? 3000;

// app config
app.use(express.json());

// Routes
const routes = require("./src/routes");

app.use("/api", routes);

app.get("*", (req, res) => {
    return res.status(404).send("Page Not Found!!");
})

// app listener
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})

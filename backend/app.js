const express = require("express");

const app = express();
const PORT = process.env.PORT ?? 3000;

// app config
app.use(express.json());

// Routes


// app listener
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})

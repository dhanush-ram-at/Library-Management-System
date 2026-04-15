const app  = require("./app");
require("dotenv").config();   // load .env variables first

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
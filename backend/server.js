
//require("dotenv").config();   // load .env variables first

const app  = require("../backend/App");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
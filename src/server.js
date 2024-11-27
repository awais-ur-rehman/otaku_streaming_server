const app = require("./app");
const config = require("./config/dotenv");

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

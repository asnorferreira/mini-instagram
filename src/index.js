import { app } from "./server.js";
import { config } from "dotenv";

config();

app.listen(process.env.PORT, () => {
  console.log("Listening on port" + process.env.PORT);
});

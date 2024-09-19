const connect = require("./configs/db");
const app = require("./index");

app.listen(process.env.PORT || 5432, async () => {
  try {
    await connect();
    console.log("listioning to port 5432");
  } catch (error) {
    console.log(error);
  }
});

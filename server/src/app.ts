import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";

import UsersRouter from "./Modules/Users/Routes";
// Import other routers as you build them
// import AccountsRouter from "./modules/accounts/routes/accountRoutes";

const PORT = process.env.PORT || 8888;
const app = express();

// Middleware setup
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

// Routing
app.use("/api/users", UsersRouter);
// app.use("/api/accounts", AccountsRouter);

app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});

export default app;

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4800;
const userRoutes = require("./routes/userRoute");
const companyRoutes = require("./routes/companyRoute");
const jobRoutes = require("./routes/jobRoute");
const applicationRoutes = require("./routes/applicationRoute");

// DB Connection
const db = require("./config/connect");
db.connect();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/application", applicationRoutes);

// Server Listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

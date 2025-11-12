import express from "express";
import dotenv from "dotenv";
// import cors from "cors";
import authRoutes from "./routes/auth.js";
import expenseRoutes from "./routes/expenses.js";
// import swaggerUi from "swagger-ui-express";
// import YAML from "yamljs";
// const swaggerDocument = YAML.load("./utils/swagger.yaml");

dotenv.config();

const app = express();
// app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

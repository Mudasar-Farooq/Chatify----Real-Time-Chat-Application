import express from "express"
import dotenv from "dotenv"
import authRoute from "./routes/auth.route.js"
import messageRoute from "./routes/message.route.js"
import cookieParser from "cookie-parser"
import { connectDB } from "./lib/db.js";
import cors from "cors"
import bodyParser from "body-parser";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  credentials: true
}))
// Increase the payload size limit
app.use(express.json({ limit: '10mb' }))
connectDB();
dotenv.config();

const port = process.env.PORT;

app.use("/api/auth",authRoute);
app.use("/api/message",messageRoute);


app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

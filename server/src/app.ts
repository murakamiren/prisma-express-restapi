import express from "express";
import userController from "./controllers/userController";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("hello-exp");
});

app.use("/users", userController);

export default app;

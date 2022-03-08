import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";

//userに対しての処理

const prisma = new PrismaClient();
const router = Router();

//get all users
router.get("/", async (req: Request, res: Response) => {
	const users = await prisma.user.findMany();
	res.json({ users });
});

//get user by id
router.get("/:id", async (req: Request, res: Response) => {
	const user = await prisma.user.findUnique({
		where: { id: parseInt(req.params.id) },
	});
	res.json({ user });
});

//add user
router.post("/", async (req: Request, res: Response) => {
	const { email, name } = req.body;
	let age: string | number = req.body.age;
	if (typeof age === "string") {
		age = parseInt(age);
	}
	const user = await prisma.user.create({
		data: { email, name, age },
	});
	res.json({ user });
});

//update user
router.put("/:id", async (req: Request, res: Response) => {
	const { email, name } = req.body;
	let age: string | number = req.body.age;
	if (typeof age === "string") {
		age = parseInt(age);
	}
	const user = await prisma.user.update({
		where: { id: parseInt(req.params.id) },
		data: { email, name, age },
	});
	res.json({ user });
});

export default router;

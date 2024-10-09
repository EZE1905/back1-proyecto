import { Router } from "express";

const router = Router();

const users = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
    },
    {
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
    },
    {
        id: 3,
        firstName: "Joe",
        lastName: "Doe",
    },
];

router.get("/", (req, res) => {
    res.status(200).send({ error: null, data: users });
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((element) => element.id === id);

    if (user) {
        res.status(200).send({ error: null, data: user });
    } else {
        res.status(404).send({ error: "No se encuentra el usuario", data: [] });
    }
});

router.post("/", (req, res) => {
    if (
        req.body.hasOwnProperty("firstName") &&
        req.body.hasOwnProperty("lastName")
    ) {
        const maxId = Math.max(...users.map((element) => +element.id));
        const newUser = {
            id: maxId + 1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        };
        users.push(newUser);
        res.status(200).send({ error: null, data: newUser });
    } else {
        res.status(400).send({ error: "Faltan campos obligatorios", data: [] });
    }
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex((element) => element.id === id);

    if (index > -1) {
        users[index] = req.body;
        res.status(200).send({ error: null, data: users[index] });
    } else {
        res.status(404).send({ error: "No se encuentra el usuario", data: [] });
    }
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex((element) => element.id === id);

    if (index > -1) {
        users.splice(index, 1);
        res.status(200).send({ error: null, data: "Usuario borrado" });
    } else {
        res.status(404).send({ error: "No se encuentra el usuario", data: [] });
    }
});

export default router;

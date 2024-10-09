import { Router } from "express";

const router = Router();

const users = [
    { id: 1, firstName: "Juan", lastName: "Perez" },
    { id: 2, firstName: "Carlos", lastName: "Perren" },
    { id: 3, firstName: "Luis", lastName: "Gonzalez" },
];

router.get("/", (req, res) => {
    const data = {
        firstName: "Carlos",
        lastName: "Perren",
        age: 49,
        email: "idux.net@gmail.com",
        phone: "+5493492555666",
        isAdmin: true,
        users: users,
    };

    res.status(200).render("index", data);
});

router.get("/register", (req, res) => {
    const data = {};
    res.status(200).render("register", data);
});

router.get("/chat", (req, res) => {
    const data = {};
    res.status(200).render("chat", data);
});

export default router;

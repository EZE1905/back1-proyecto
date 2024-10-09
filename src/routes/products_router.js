import { Router } from "express";

const router = Router();

const products = [
    {
        id: 1,
        title: "Escuadra",
        description: "Es una escuadra",
        price: 123.45,
        stock: 10,
        category: "figuras",
    },
    {
        id: 2,
        title: "Calculadora",
        description: "Es una calculadora",
        price: 234.56,
        stock: 10,
        category: "figuras",
    },
    {
        id: 3,
        title: "Globo Terraqueo",
        description: "Es una esfera de agua",
        price: 345.67,
        stock: 10,
        category: "figuras",
    },
];

router.get("/", (req, res) => {
    res.status(200).send({ error: null, data: products });
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find((element) => element.id === id);

    if (product) {
        res.status(200).send({ error: null, data: product });
    } else {
        res.status(404).send({
            error: "No se encuentra el producto",
            data: [],
        });
    }
});

router.post("/", (req, res) => {
    const { title, description, price, stock, category } = req.body;
    if (title && description && price && stock && category) {
        const maxId = Math.max(...products.map((element) => +element.id));
        const newproduct = { ...req.body, id: maxId + 1 };
        products.push(newproduct);
        res.status(201).send({ error: null, data: newproduct });
    } else {
        res.status(400).send({ error: "Faltan datos obligatorios", data: [] });
    }
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex((element) => element.id === id);

    if (index > -1) {
        products[index] = req.body;
        res.status(200).send({ error: null, data: products[index] });
    } else {
        res.status(404).send({
            error: "No se encuentra el producto",
            data: [],
        });
    }
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex((element) => element.id === id);

    if (index > -1) {
        products.splice(index, 1);
        res.status(200).send({ error: null, data: "producto borrado" });
    } else {
        res.status(404).send({
            error: "No se encuentra el producto",
            data: [],
        });
    }
});

export default router;

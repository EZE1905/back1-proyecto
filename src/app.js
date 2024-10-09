import express from "express";
import usersrouter from "./routes/users_router.js";
import productsrouter from "./routes/products_router.js";
import viewsRouter from "./routes/views_router.js";
import config from "./config.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";

const app = express();

// Configuración del servidor HTTP
const httpServer = app.listen(config.PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${config.PORT}`);
});

// Configuración de Socket.IO
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
    console.log("Nuevo cliente conectado con el id: " + socket.id);

    socket.emit("welcome", "Bienvenido a nuestro chat");

    socket.on("init_message", (data) => {
        console.log(data);
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado con el id: " + socket.id);
    });
});

// Middleware para parsear JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Motor de plantillas
app.engine("handlebars", handlebars.engine());
app.set("views", `${config.DIRNAME}/views`);
app.set("view engine", "handlebars");

// Rutas
app.use("/api/users", usersrouter);
app.use("/api/products", productsrouter);
app.use("/", viewsRouter);

// Manejo de errores (opcional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Algo salió mal!");
});

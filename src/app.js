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
const messages = [];
    
const io = new Server(httpServer);
console.log('Servicio socket.io activo');

io.on('connection', client => {
    console.log(`Cliente conectado, id ${client.id} desde ${client.handshake.address}`);

    // Suscripción al tópico new_user_data (que envía un cliente cuando se conecta)
    client.on('new_user_data', data => {
        // Envía a ESE cliente la lista actual de mensajes
        client.emit('current_messages', messages);
        // y a TODOS LOS DEMÁS los datos del nuevo usuario que acaba de conectarse
        client.broadcast.emit('new_user', data);
    });

    // Suscripción al tópico new_own_msg (que genera cualquier cliente al enviar un texto nuevo de chat)
    client.on('new_own_msg', data => {
        messages.push(data);
        // Reenvía mensaje a TODOS los clientes conectados, INCLUYENDO el que mandó el msj original
        io.emit('new_general_msg', data);
    });
    
    client.on('disconnect', reason => {
        console.log(reason);
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

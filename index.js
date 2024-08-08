const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer'); // Importar multer
const QuestionRoutes = require ('./src/routes/Questions');
const ClienteRoutes = require('./src/routes/Cliente');
const DoctoreRoutes = require('./src/routes/Doctor');
const EspecialidadRoutes = require('./src/routes/Especialidad');
const loginRoutes =  require('./src/routes/login')
const Recuperacion = require('./src/routes/Recuperacion')
require("dotenv").config();
const app =  express();
const port = process.env.PORT || 3000;


//midedleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api',QuestionRoutes);
app.use('/api',ClienteRoutes);
app.use('/api',DoctoreRoutes);
app.use('/api',loginRoutes);
app.use('/api',EspecialidadRoutes);


//Rutas

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bienvenido a mi API</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .container {
                    text-align: center;
                    padding: 20px;
                    background-color: #fff;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                }
                h1 {
                    color: #333;
                    font-size: 2rem;
                    margin-bottom: 10px;
                }
                p {
                    color: #666;
                    font-size: 1rem;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Bienvenido a mi API :)</h1>
                <p>Gracias por visitarnos. ¡Esperamos que disfrutes explorando nuestra API!</p>
            </div>
        </body>
        </html>
    `);
});



//conexion a mongoose

mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=> console.log("conectado a mongo atlas"))
    .catch((error)=> console.error(error));

app.listen(port, () => console.log('servidor escuchando en el puerto', port));
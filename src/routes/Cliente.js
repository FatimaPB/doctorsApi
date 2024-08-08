const express = require("express");
const ClienteSchema = require("../models/Cliente");
const router = express.Router();


//crear

router.post("/clientes",(req,res)=>{

    const Cliente = ClienteSchema(req.body);

    Cliente
    .save()
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error}));
})

//obtener
router.get("/clientes",(req,res)=>{

    ClienteSchema
    .find()
    .then((data)=> res.json(data))
    .catch((error)=> res.json({message:error}));
})

//obtener por id

router.get("/Clientes/:id" , (req, res)=>{

    const {id} = res.params;

    ClienteSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error=> res.json({ mensaje:error})));
});

//editar

router.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const updatedCliente = req.body;

  try {
    const result = await ClienteSchema.updateOne({ _id: id }, { $set: updatedCliente });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error updating client', error });
  }
});

//Eliminar

router.delete("/Clientes/:id" ,(req,res)=>{
    const {id} = req.params;
        
    ClienteSchema
    .deleteOne({_id : id})
    .then((data) => res.json(data))
    .catch((error) => res.json ({ message:error}));
});

// Agregar esta ruta en tu archivo de rutas Express
// Ruta para verificar correo y respuesta
router.post('/clientes/verificar-correo-respuesta', async (req, res) => {
    const { correo, respuesta } = req.body;
  
    try {
      const cliente = await ClienteSchema.findOne({ correo });
  
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
  
      if (cliente.respuestaSeguridad !== respuesta) {
        return res.status(400).json({ message: 'Respuesta de seguridad incorrecta' });
      }
  
      res.json({ message: 'Correo y respuesta verificados. Ahora puede establecer una nueva contraseña.' });
    } catch (error) {
      res.status(500).json({ message: 'Error al verificar el correo o la respuesta', error: error.message });
    }
  });
  
  // Ruta para establecer nueva contraseña
  router.post('/clientes/establecer-nueva-contrasena', async (req, res) => {
    const { correo, nuevaContrasena } = req.body;
  
    try {
      const cliente = await ClienteSchema.findOne({ correo });
  
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
  
      // Actualizar la contraseña
      cliente.contrasena = nuevaContrasena;
      await cliente.save();
  
      res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la contraseña', error: error.message });
    }
  });
  
module.exports = router;
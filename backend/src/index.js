const express = require('express');
const cors = require('cors');
const db = require('./infrastructure/database/db');
const trainerRoutes = require('./infrastructure/routes/trainerRoutes');
const pokeRoutes = require('./infrastructure/routes/pokeRoutes');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());

app.use(express.json());


db.connect()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1); 
  });


app.use('/api/trainers', trainerRoutes);
app.use('/api/pokemons', pokeRoutes);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
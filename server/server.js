// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/restaurante', { useNewUrlParser: true, useUnifiedTopology: true });

// Modelo do Prato
const dishSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const Dish = mongoose.model('Dish', dishSchema);

// Modelo do Pedido
const orderSchema = new mongoose.Schema({
  items: [{ dish: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }, quantity: Number }],
  status: String,
});

const Order = mongoose.model('Order', orderSchema);

// Rota de autenticação
app.post('/login', (req, res) => {
  // Lógica de autenticação (por exemplo, verificar usuário e senha)
  const user = { username: 'funcionario' };
  const token = jwt.sign(user, 'segredo');
  res.json({ token });
});

// Middleware de autenticação
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'segredo', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Rotas protegidas
app.use(authenticateToken);

// Rota para obter todos os pratos
app.get('/api/dishes', async (req, res) => {
  const dishes = await Dish.find();
  res.json(dishes);
});

// Rota para adicionar um novo prato
app.post('/api/dishes', async (req, res) => {
  const { name, price } = req.body;
  const newDish = new Dish({ name, price });
  await newDish.save();
  res.json(newDish);
});

// Rota para obter todos os pedidos
app.get('/api/orders', async (req, res) => {
  const orders = await Order.find().populate('items.dish');
  res.json(orders);
});

// Rota para adicionar um novo pedido
app.post('/api/orders', async (req, res) => {
  const { items } = req.body;
  const newOrder = new Order({ items, status: 'Em processamento' });
  await newOrder.save();
  res.json(newOrder);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

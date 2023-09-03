const Cart = require('../model/cart')
const mongoose=require('mongoose')
// Create a new courserouter.post('/carts', async (req, res) => {
    try {    const cart = new Cart(req.body);
        const savedCourse = await cart.save();    res.json(savedCourse);
      } catch (error) {    res.status(400).json({ error: error.message });
      };
    // Get a list of all carts
    router.get('/carts', async (req, res) => {  try {
        const carts = await Cart.find();    res.json(carts);
      } catch (error) {    res.status(500).json({ error: error.message });
      }});
    // Get a single cart by ID
    router.get('/carts/:id', async (req, res) => {  try {
        const cart = await Cart.findById(req.params.id);    if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });    }
        res.json(cart);  } catch (error) {
        res.status(500).json({ error: error.message });  }
    });
    // Update a cart by IDrouter.put('/carts/:id', async (req, res) => {
      try {    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
          new: true,    });
        if (!cart) {      return res.status(404).json({ message: 'Cart not found' });
        }    res.json(cart);
      } catch (error) {    res.status(500).json({ error: error.message });
      };
    // Delete a cart by ID
    router.delete('/carts/:id', async (req, res) => {  try {
        const cart = await Cart.findByIdAndDelete(req.params.id);    if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });    }
        res.json({ message: 'Cart deleted' });  } catch (error) {
        res.status(500).json({ error: error.message });  }
    });


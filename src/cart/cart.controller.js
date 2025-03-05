import Cart from "../cart/cart.model.js";
import Product from "../product/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    const productId = req.params.productId;
    const userId = req.params.userId;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Producto no encontrado" });
    }

    const totalPrice = product.price * quantity;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [
          {
            product: productId,
            quantity: quantity,
            totalPrice: totalPrice
          }
        ]
      });
    } else {
      const productInCart = cart.products.find(p => p.product.toString() === productId);

      if (productInCart) {
        productInCart.quantity += quantity;
        productInCart.totalPrice = productInCart.quantity * product.price;
      } else {
        cart.products.push({
          product: productId,
          quantity: quantity,
          totalPrice: totalPrice
        });
      }
    }

    await cart.save();

    return res.status(200).json({ success: true, message: "Producto agregado al carrito", cart });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al agregar producto al carrito",
      error: err.message
    });
  }
};


export const getCart = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const cart = await Cart.findOne({ user: userId }).populate("products.product", "name price");
  
      if (!cart) {
        return res.status(404).json({ success: false, message: "Carrito vacío" });
      }
  
      return res.status(200).json({ success: true, cart });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error al obtener el carrito",
        error: err.message
      });
    }
};
  

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.params.userId;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
        return res.status(404).json({ success: false, message: "Carrito vacío" });
        }

        cart.products = cart.products.filter(p => p.product.toString() !== productId);

        await cart.save();

        return res.status(200).json({ success: true, message: "Producto eliminado del carrito", cart });
    } catch (err) {
        return res.status(500).json({
        success: false,
        message: "Error al eliminar producto del carrito",
        error: err.message
        });
    }
};
  

export const updateProductQuantity = async (req, res) => {
    try {
        const { newQuantity } = req.body;
        const productId = req.params.productId;
        const usuario = req.usuario;

        if (newQuantity <= 0) {
        return res.status(400).json({ success: false, message: "La cantidad debe ser mayor que 0" });
        }

        const cart = await Cart.findOne({ user: usuario._id });

        if (!cart) {
        return res.status(404).json({ success: false, message: "Carrito vacío" });
        }

        const productInCart = cart.products.find(p => p.product.toString() === productId);

        if (!productInCart) {
        return res.status(404).json({ success: false, message: "Producto no encontrado en el carrito" });
        }

        const product = await Product.findById(productId);
        productInCart.quantity = newQuantity;
        productInCart.totalPrice = productInCart.quantity * product.price;

        await cart.save();

        return res.status(200).json({ success: true, message: "Cantidad actualizada", cart });
    } catch (err) {
        return res.status(500).json({
        success: false,
        message: "Error al actualizar la cantidad",
        error: err.message
        });
    }
};

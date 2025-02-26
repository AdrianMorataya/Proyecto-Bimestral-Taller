import Cart from "../cart/cart.model.js";
import Product from "../product/product.model.js";
import Invoice from "../bill/bill.model.js";
import XLSX from "xlsx";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createBillFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { name, nit, date } = req.body;

    if (!nit || nit.length < 5) {
      return res.status(400).json({ success: false, message: "NIT inválido." });
    }

    if (!date || isNaN(new Date(date))) {
      return res.status(400).json({ success: false, message: "Fecha inválida." });
    }

    const cart = await Cart.findById(cartId).populate("products.product");

    if (!cart) {
      return res.status(404).json({ success: false, message: "Carrito no encontrado" });
    }

    let totalAmount = 0;
    const products = [];

    cart.products.forEach(item => {
      const product = item.product;
      const totalPrice = product.price * item.quantity;
      products.push({
        product: product._id,
        quantity: item.quantity,
        totalPrice: totalPrice
      });
      totalAmount += totalPrice;
    });

    const newInvoice = new Invoice({
      name: name,
      nit: nit,
      date: new Date(date),
      cart: cart._id,
      products: products,
      totalAmount: totalAmount
    });

    await newInvoice.save();

    const invoiceData = [
      ["Factura", newInvoice.name],
      ["NIT", newInvoice.nit],
      ["Fecha", new Date(newInvoice.date).toLocaleDateString()],
      ["Productos", ""],
      ["Nombre", "Cantidad", "Precio Total"],
      ...products.map(product => [
        product.product.toString(),
        product.quantity,
        product.totalPrice
      ]),
      ["Total", "", totalAmount]
    ];

    const ws = XLSX.utils.aoa_to_sheet(invoiceData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Factura");

    const billFolder = path.join(__dirname, "../../Bill");

    if (!fs.existsSync(billFolder)) {
      fs.mkdirSync(billFolder);
    }

    const filePath = path.join(billFolder, `Factura_${newInvoice._id}.xlsx`);
    XLSX.writeFile(wb, filePath);

    return res.status(200).json({
      success: true,
      message: "Factura generada y guardada con éxito.",
      invoice: newInvoice,
      filePath: filePath
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al generar la factura",
      error: err.message
    });
  }
};

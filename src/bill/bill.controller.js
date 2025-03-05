import Cart from "../cart/cart.model.js";
import Invoice from "../bill/bill.model.js";
import Product from "../product/product.model.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createBillFromCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { nit } = req.body;

    if (!nit || nit.length < 5) {
      return res.status(400).json({ success: false, message: "NIT inválido." });
    }

    const name = req.usuario && req.usuario.name ? req.usuario.name : "Nombre no disponible";
    
    const date = new Date();

    const cart = await Cart.findById(cartId).populate("products.product");

    if (!cart) {
      return res.status(404).json({ success: false, message: "Carrito no encontrado" });
    }

    let totalAmount = 0;
    const products = [];

    for (const item of cart.products) {
      const product = item.product;

      if (product.amount < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `No hay suficiente cantidad del producto ${product.name}. Solo quedan ${product.amount} unidades.`
        });
      }

      const totalPrice = product.price * item.quantity;
      products.push({
        product: product._id,
        name: product.name,
        quantity: item.quantity,
        totalPrice: totalPrice
      });

      totalAmount += totalPrice;

      product.amount -= item.quantity;
      product.sold += item.quantity;

      if (product.amount <= 0) {
        product.status = "UNAVAILABLE";
      }

      await product.save();
    }

    const newInvoice = new Invoice({
      name: name,
      nit: nit,
      date: date,
      cart: cart._id,
      products: products,
      totalAmount: totalAmount
    });

    await newInvoice.save();

    const doc = new PDFDocument();

    const billFolder = path.join(__dirname, "../../Bill");
    if (!fs.existsSync(billFolder)) {
      fs.mkdirSync(billFolder);
    }

    const filePath = path.join(billFolder, `Factura_${newInvoice._id}.pdf`);
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(18).text(`Factura a nombre de: ${newInvoice.name}`, { align: 'center' });
    doc.fontSize(12).text(`Fecha: ${new Date(newInvoice.date).toLocaleDateString()}`, { align: 'center' });
    doc.text(`NIT: ${newInvoice.nit}\n`, { align: 'center' });
    doc.text('------------------------------------------------------------\n', { align: 'center' });

    doc.text('Productos                Cantidad    Precio Total', { align: 'left' });
    doc.text('------------------------------------------------------------', { align: 'left' });

    products.forEach(product => {
      doc.text(`${product.name}         ${product.quantity}                 Q${product.totalPrice.toFixed(2)}`, { align: 'left' });
    });

    doc.text('------------------------------------------------------------', { align: 'left' });
    doc.text(`Total: Q${totalAmount.toFixed(2)}`, { align: 'left' });

    doc.end();

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

export const listBills = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("cart").populate("products.product");

    if (!invoices || invoices.length === 0) {
      return res.status(404).json({ success: false, message: "No se encontraron facturas." });
    }

    const invoicesWithPdfPath = invoices.map(invoice => {
      const filePath = path.join(__dirname, "../../Bill", `Factura_${invoice._id}.pdf`);

      const fileExists = fs.existsSync(filePath);

      return {
        ...invoice.toObject(),
        pdfPath: fileExists ? filePath : null
      };
    });

    return res.status(200).json({
      success: true,
      message: "Facturas obtenidas con éxito.",
      invoices: invoicesWithPdfPath
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener las facturas.",
      error: err.message
    });
  }
};

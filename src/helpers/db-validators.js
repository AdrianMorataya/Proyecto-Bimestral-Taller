import User from "../user/user.model.js"
import Product from "../product/product.model.js"
import Category from "../category/category.model.js"
import Cart from "../cart/cart.model.js"
import Bill from "../bill/bill.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const productExists = async (id = "") => {
    const existe = await Product.findById(id);
    if (!existe) {
        throw new Error("No existe el producto con el ID proporcionado");
    }
};

export const categoryExists = async (id = "") => {
    const existe = await Category.findById(id);
    if (!existe) {
        throw new Error("No existe la categoria con el ID proporcionado");
    }
};

export const cartExists = async (id = "") => {
    const existe = await Cart.findById(id);
    if (!existe) {
        throw new Error("No existe el carrito con el ID proporcionado");
    }
};

export const billExists = async (id = "") => {
    const existe = await Bill.findById(id);
    if (!existe) {
        throw new Error("No existe la factura con el ID proporcionado");
    }
};
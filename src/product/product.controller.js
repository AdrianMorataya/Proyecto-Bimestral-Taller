'use strict';

import Product from './product.model.js';
import Category from '../category/category.model.js';

export const saveProduct = async (req, res) => {
    try {
        let { name, description, price, amount, status, categorys } = req.body;

        const categoryExists = await Category.findById(categorys)

        if(!categorys){
            const defaultCategory = await Category.findOne({ name: "Sin Categoría" })
            categorys = defaultCategory._id
        }else if(!categoryExists){
            return res.status(404).json({
                success: false,
                message: "Categoria no encontrada"
            })
        }

        const newProduct = await Product.create({
            name,
            description,
            price,
            amount,
            status,
            categorys
        });

        newProduct.sold = 0;
        await Category.findByIdAndUpdate(categorys, { $push: { products: newProduct._id } });

        res.status(200).json({
            success: true,
            message: "Producto guardado y categoría actualizada",
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al guardar el producto",
            error: error.message
        });
    }
};

export const getProductsAvailables = async (req, res) => {
    try {
        const { limits = 10, from = 0, Filter, nameFilter, categoryFilter } = req.body;

        const query = { status: "AVAILABLE" };

        if (nameFilter) {
            query.name = { $regex: nameFilter, $options: "i" };
        }

        if (categoryFilter) {
            const category = await Category.findOne({ name: { $regex: categoryFilter, $options: "i" } });

            if (category) {
                query.categorys = category._id;
            } else {
                console.log("No se encontró la categoría:", categoryFilter);
            }
        }

        let sortOption = {};
        if (Filter === "Ascendente") {
            sortOption.sold = 1;
        } else if (Filter === "Descendente") {
            sortOption.sold = -1;
        }

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip(Number(from))
                .limit(Number(limits))
                .sort(sortOption)
                .populate("categorys", "name")
        ]);

        return res.status(200).json({
            success: true,
            total,
            products
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al listar los productos",
            error: err.message
        });
    }
};

export const getProductsUnavailables = async (req, res) => {
    try {
        const { limits = 10, from = 0, Filter, nameFilter, categoryFilter } = req.body;

        const query = { status: "UNAVAILABLE" };

        if (nameFilter) {
            query.name = { $regex: nameFilter, $options: "i" };
        }

        if (categoryFilter) {
            const category = await Category.findOne({ name: { $regex: categoryFilter, $options: "i" } });

            if (category) {
                query.categorys = category._id;
            } else {
                console.log("No se encontró la categoría:", categoryFilter);
            }
        }

        let sortOption = {};
        if (Filter === "Ascendente") {
            sortOption.sold = 1;
        } else if (Filter === "Descendente") {
            sortOption.sold = -1;
        }

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip(Number(from))
                .limit(Number(limits))
                .sort(sortOption)
                .populate("categorys", "name")
        ]);

        return res.status(200).json({
            success: true,
            total,
            products
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al listar los productos",
            error: err.message
        });
    }
};

export const getProductById = async(req, res) => {
    try{
        const { id } = req.params
        const product = await Product.findById(id)

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Producto no existe",
                error: err.message
            })
        }

        return res.status(200).json({
            success: true,
            product
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener el producto",
            error: err.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try{
        const { id } = req. params

        const product =  await Product.findByIdAndDelete(id, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Producto Eliminado",
            product
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el producto",
            error: err.message
        })
    }
}

export const updateProduct = [
    async (req, res) => {
        const { id } = req.params;
        const { name, description, price, amount } = req.body;

        let updateData = {};

        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (price) updateData.price = price;
        if (amount) updateData.amount = amount;

        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

            if (!updatedProduct) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }

            return res.status(200).json({
                message: "Producto actualizado correctamente",
                product: updatedProduct
            });
        } catch (err) {
            return res.status(500).json({
                message: "Error al actualizar el producto",
                error: err.message
            });
        }
    },
];
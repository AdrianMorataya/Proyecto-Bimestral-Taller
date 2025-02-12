'use strict';

import Product from './product.model.js';
import Category from '../category/category.model.js';

export const saveProduct = async (req, res) => {
    try {
        const { name, description, price, amount, status, categorys } = req.body;

        const categoryId = categorys || "67ad0a98a2a5eeaa2dd27999";

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            amount,
            status,
            categorys: categoryId
        });

        await newProduct.save();

        if (categoryId !== "67ad0a98a2a5eeaa2dd27999") {
            category.products.push(newProduct._id);
            await category.save();
        }

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

export const getProductsAvailables = async(req, res) => {
    try {
        const { limits = 10, from = 0 } = req.query;

        const query = { status: "AVAILABLE" };

        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip(Number(from))
                .limit(Number(limits))
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


export const getProductsUnavailables = async(req, res) => {
    try{
        const { limits = 3, from = 0} = req.query
        const query = {status: "UNAVAILABLE"}

        const [ total, products ] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip(Number(from))
                .limit(Number(limits))
        ])

        return res.status(200).json({
            success: true,
            total,
            products
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al listar los productos",
            error: err.message
        })
    }
}

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

        const product =  await Product.findByIdAndUpdate(id, {status: false}, {new: true})

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
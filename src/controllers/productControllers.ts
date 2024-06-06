import { Request, Response } from "express";
import { Product } from "../models/productSchema";

export const productController = {
  getData: async (req: Request, res: Response) => {
    try {
      const { search, category, price_min, price_max, tags } = req.query;

      const CLAUSES: any = {};

      if (search) {
        CLAUSES.$or = [
          { name: { $regex: search as string, $options: "i" } },
          { description: { $regex: search as string, $options: "i" } },
          //   { images: { $regex: search as string, $options: "i" } },
        ];
      }

      const products = await Product.find(CLAUSES);
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ message: "Error mengambil item", error });
    }
  },

  createData: async (req: Request, res: Response) => {
    try {
      const { seller_id, name, description, price, category, tags } = req.body;
      const images = req.files
        ? (req.files as Express.Multer.File[]).map((file) => file.originalname)
        : [];

      if (!seller_id || !name || !description || !price || !category) {
        return res.status(400).json({ message: "Wajib isi semua data" });
      }

      const newProduct = new Product({
        seller_id,
        name,
        description,
        price,
        category,
        tags,
        images,
        created_at: new Date(),
      });

      const savedProduct = await newProduct.save();
      return res.json({ message: "Item dibuat", data: savedProduct });
    } catch (error) {
      return res.status(500).json({ message: "Error membuat item", error });
    }
  },

  getSingleData: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Item tidak ditemukan" });
      }
      return res.json(product);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching product", error });
    }
  },

  updateData: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!updatedProduct) {
        return res.status(404).json({ message: "Item tidak ditemukan" });
      }

      return res.json({ message: "Item diupdate", data: updatedProduct });
    } catch (error) {
      return res.status(500).json({ message: "Eror update item", error });
    }
  },

  deleteData: async (req: Request, res: Response) => {
    console.log("masuk");
  //   try {
  //     const { id } = req.params;

  //     const deletedProduct = await Product.findByIdAndDelete(id);
  //     if (!deletedProduct) {
  //       return res.status(404).json({ message: "Item tidak ditemukan" });
  //     }

  //     return res.json({ message: "Item terhapus", data: deletedProduct });
  //   } catch (error) {
  //     return res.status(500).json({ message: "Error mengapus item", error });
  //   }
  // },
};

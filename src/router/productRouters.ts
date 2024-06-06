import express from "express";
import { productController } from "../controllers/productControllers";
import multer, { StorageEngine } from "multer";

// Configure multer for file uploads
const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

export const productRouter = express.Router();

// Define routes
productRouter.get("/", productController.getData);
productRouter.get("/:id", productController.getSingleData);
productRouter.patch("/:id", productController.updateData);
productRouter.delete("/:id", productController.deleteData);

// Use multer for file upload on product creation
productRouter.post("/", upload.array("images"), productController.createData);

export default productRouter;

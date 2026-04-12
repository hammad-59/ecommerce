import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { Brand } from "../models/brand.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

const createProduct = asyncHandler(async (req, res) => {
  let {
    name,
    description,
    color,
    category,
    subCategory,
    stock,
    gender,
    price,
    productSize,
    brand,
  } = req.body;
  
  //  Field validation
  const stringFields = [
    name,
    description,
    color,
    category,
    subCategory,
  ];
  const numberFields = [stock, price];
  const isInvalid =
    stringFields.some((f) => !f || f.trim() === "") ||
    numberFields.some((n) => n === undefined || n === null);

  if (isInvalid) throw new ApiError(400, "All fields are required");

    //  Optional fields sanitize
  if (gender === "") gender = undefined;
  if (productSize === "") productSize = undefined;

  //  Validate brand exists in Brand collection
  const brandExists = await Brand.findById(brand);
  if (!brandExists) throw new ApiError(400, "Selected brand does not exist");

  //  Check duplicate product (name + brand combo)
  const existingProduct = await Product.findOne({ name, brand:brandExists._id, color });
  if (existingProduct) {
    throw new ApiError(409, "Product already exists");
  }

  //  Images validation
  const productImages = req.files?.images;
  if (!productImages || productImages.length !== 3)
    throw new ApiError(400, "Exactly 3 images are required");

  //  Upload images to Cloudinary
  const uploadedImages = [];

for (const file of productImages) {
  const response = await uploadOnCloudinary(file.path);
  uploadedImages.push({
    url: response.secure_url,
    public_id: response.public_id
  });
  fs.unlinkSync(file.path)
}


  //  Create product
  const product = await Product.create({
    name,
    description,
    color,
    category,
    subCategory,
    stock,
    gender,
    price,
    productSize,
    brand: brandExists._id,
    images: uploadedImages,
  });

  //  Return response
  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});


const getProducts = asyncHandler(async (req, res) => {
  const {
    category,
    subCategory,
    gender,
    search
  } = req.query;

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 5

  const filter = {};

 // Category filter
if (category) {
  const categories = Array.isArray(category) ? category : category.split(",");
  filter.category = { $in: categories };
}

// SubCategory filter
if (subCategory) {
  const subCategories = Array.isArray(subCategory) ? subCategory : subCategory.split(",");
  filter.subCategory = { $in: subCategories };
}

// Gender filter
if (gender) {
  const genders = Array.isArray(gender) ? gender : gender.split(",");
  filter.gender = { $in: genders };
}

  if (search) filter.name = { $regex: search, $options: "i" };

  const skip = (page - 1) * limit;

  const products = await Product.find(filter)
    .populate("brand", "name")
    .limit(Number(limit))
    .skip(skip)
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments(filter);

  return res.status(200).json(
    new ApiResponse(200, {
      products,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      total
    }, "Products fetched successfully")
  );
});


const getProductMeta = asyncHandler(async (req, res) => {

  const meta = {
     category: ["clothing", "electronics"],
    subCategory:{ 
      clothing: ["shirt", "jeans", "traditional wear"],
      electronics: ["mobile", "laptop", "accessories"]
    },
    gender:  ["male", "female"],
    productSize: ["S","M","L", "XL"],
  }

  res.status(200).json( new ApiResponse(200, meta, "categories, subcategories, sizes fetched"));
});



const getSingleProduct = asyncHandler( async (req,res) => {

    const singleProduct =  await Product.findById(req.params.id).populate("brand", "name")

    if (!singleProduct) {
        throw new ApiError(404, "Product not found")
    }
    return res.status(200).json(
        new ApiResponse(
            200,
            singleProduct,
            "Single Product Fetched Successfully"
        )
    )
})


const deleteSingleProduct = asyncHandler( async (req, res) => {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id)
    if (!deleteProduct) {
        throw new ApiError(404, "Product not found")
    }
    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Single Product Delete successfully"
        )
    )
})


const editSingleProduct = asyncHandler(async (req, res) => {

  const allowedFields = [
    'name','description','color','category',
    'subCategory','stock','gender','price',
    'productSize','brand'
  ];

  const updateData = {};

  for (const key of allowedFields) {
    if (req.body[key] !== undefined && req.body[key] !== "") {
      updateData[key] = req.body[key];
    }
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: updateData },
    { new: true }
  ).populate("brand", "name");

  if (!product) {
   throw new ApiError(404, "Product not found")
  }

  return res.status(200).json(
    new ApiResponse(200, product, "Product updated successfully")
  );
});



const editProductImage = asyncHandler(async (req, res) => {

  const { id } = req.params;
  const { imageId } = req.body;
  const file = req.files?.[0];

  if (!file) throw new ApiError(400, "No file uploaded");

  const product = await Product.findById(id);
  if (!product) throw new ApiError(404, "Product not found");

  // Find old image
  const image = product.images.id(imageId);
  if (!image) throw new ApiError(404, "Image not found");

  // Delete old image from Cloudinary using public_id
  if (image.public_id) await cloudinary.uploader.destroy(image.public_id);

  // Upload new image
  const uploadResult = await uploadOnCloudinary(file.path);

  // Replace URL and public_id
  image.url = uploadResult.secure_url;
  image.public_id = uploadResult.public_id;

  await product.save();

  fs.unlinkSync(file.path)

  return res.status(200).json(
    new ApiResponse(200, product, "Image replaced successfully")
  );
});

export { 
  createProduct,
  getProducts,
  getProductMeta,
  getSingleProduct,
  deleteSingleProduct,
  editSingleProduct,
  editProductImage,
  };

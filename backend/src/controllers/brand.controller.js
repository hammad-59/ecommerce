import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Brand } from "../models/brand.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    throw new ApiError(400, "Brand name is required");
  }

  const existingBrand = await Brand.findOne({ name: name.toLowerCase() });

  if (existingBrand) {
    throw new ApiError(409, "brand name already exist");
  }

  const brand = await Brand.create({
    name: name.toLowerCase()
  });

  return res
    .status(201)
    .json(new ApiResponse(201, brand, "Brand created successfully"));
});


const getBrandDetails = asyncHandler(async (req, res) => {
  const brandDetails = await Brand.find();

  return res
    .status(200)
    .json(new ApiResponse(200, brandDetails, "All brands fetched"));
});


const updateBrand = asyncHandler(async (req, res) => {

  const { newName } = req.body;

  if (!newName) {
  throw new ApiError(400, "newName is required");
}

  const brand = await Brand.findByIdAndUpdate(
      req.params.id,
    { name: newName.toLowerCase() },
    { new: true }
  );

  if (!brand) {
    throw new ApiError(404, "Brand not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, brand, "Brand updated Successfully"));
});


const deleteBrand = asyncHandler(async (req, res) => {
    
    const brand = await Brand.findByIdAndDelete(req.params.id)

    if (!brand) {
      throw new ApiError(404, "Brand not found")
    }

    return res.status(200).json(new ApiResponse(200, {}, "Brand deleted Successfully"))
})

export { 
    createBrand,
    getBrandDetails,
    updateBrand,
    deleteBrand
    };

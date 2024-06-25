import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { response } from "express";

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend(postman)
    // validation - not empty
    //check if user already exists: username, email
    // check for image, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in database
    // remove password and refresh token field from response
    // check for the user creation
    // return response

    const { fullName, email, username, password } = req.body
    console.log("email: ", email);

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All field are required")
    };

    const existUser = User.findOne({
        $or: [{ username }, { email }]
    });
    if (existUser) {
        throw new ApiError(409, "User already exists")
    };

    console.log("Local Path structures ", req.files);
    const avatarLocalPath = req.files?.avater[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar is must be required");
    }

    const user = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "User are not registered");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User is registered successfully")
    );

});

export { registerUser }
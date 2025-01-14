import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE } from ".."; // Ensure RTE and Input components are implemented properly
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BuyForm({ buyer }) {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: buyer?.name || "",
      description: buyer?.description || "",
      number: buyer?.number || "",
      email: buyer?.email || "",
      productId: buyer?.productId || "",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    try {
      console.log("Submitting Data:", data);

      if (!userData?.$id) {
        alert("You must be logged in to perform this action.");
        return;
      }

      const buyerData = {
        ...data,
        userId: userData?.$id,
      };

      // Create new buyer record
      const newBuyer = await appwriteService.createBuyer(buyerData);

      if (newBuyer) {
        console.log("New Buyer:", newBuyer);
        alert("Form submitted successfully!");
        navigate(`/all-posts`);
      } else {
        alert("Failed to submit the form. Please try again.");
      }
    } catch (error) {
      console.error("Error in Submission:", error);
      alert("An error occurred. Please check the console for details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap md:flex-row md:justify-between space-y-4 md:space-y-0"
    >
      <div className="w-full md:w-2/3 px-2">
        {/* Name Field */}
        <Input
          label="Name :"
          placeholder="Enter your name"
          className="mb-4"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        {/* Description Field */}
        <RTE
          label="Description :"
          name="description"
          control={control}
          defaultValue={getValues("description")}
          className="w-full"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}

        {/* Mobile Number Field */}
        <Input
          label="Number :"
          placeholder="Enter your mobile number"
          className="mb-4"
          {...register("number", {
            required: "Mobile number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter a valid 10-digit mobile number",
            },
          })}
        />
        {errors.number && (
          <p className="text-red-500 text-sm">{errors.number.message}</p>
        )}

        {/* Email Field */}
        <Input
          label="Email :"
          placeholder="Enter your email"
          className="mb-4"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Product ID Field */}
       
        <Input
          label="Product ID :"
          placeholder="Enter the product ID"
          className="mb-4"
          {...register("productId", { required: "Product ID is required" })}
        />
        {errors.productId && (
          <p className="text-red-500 text-sm">{errors.productId.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="w-full md:w-1/3 px-2">
        <Button type="submit" className="w-full bg-blue-500 text-white">
          Submit
        </Button>
      </div>
    </form>
  );
}

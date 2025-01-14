import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            description: post?.description || "",
            tags: post?.tags || "",
            featured_image1: null,
            featured_image2: null,
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        try {
            console.log("Submitting Data:", data);

            if (!data.title || !data.description) {
                alert("Title and Description are required.");
                return;
            }

            if (!userData?.$id) {
                alert("You must be logged in to perform this action.");
                return;
            }
            let featuredImage1Id = null;
            let featuredImage2Id = null;

            // Upload images if present
            if (data.featured_image1?.[0]) {
                const file = await appwriteService.uploadFile(data.featured_image1[0]);
                if (file) featuredImage1Id = file.$id;
            }
            if (data.featured_image2?.[0]) {
                const file = await appwriteService.uploadFile(data.featured_image2[0]);
                if (file) featuredImage2Id = file.$id;
            }

            const postData = {
                ...data,
                userId: userData?.$id,
                featured_image1: featuredImage1Id || post?.featured_image1,
                featured_image2: featuredImage2Id || post?.featured_image2,
            };

            if (post) {
                // Update existing post
                if (featuredImage1Id && post.featured_image1) {
                    await appwriteService.deleteFile(post.featured_image1);
                }
                if (featuredImage2Id && post.featured_image2) {
                    await appwriteService.deleteFile(post.featured_image2);
                }
                const updatedPost = await appwriteService.updatePost(post.$id, postData);
                if (updatedPost) {
                    console.log("Post Updated:", updatedPost);
                    navigate(`/post/${updatedPost.$id}`);
                }
            } else {
                // Create new post
                const newPost = await appwriteService.createPost(postData);
                if (newPost) {
                    console.log("New Post Created:", newPost);
                    navigate(`/post/${newPost.$id}`);
                }
            }
        } catch (error) {
            console.error("Error in Post Submission:", error);
            alert("An error occurred. Please check the console for details.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-wrap md:flex-row md:justify-between space-y-4 md:space-y-0"
        >
            <div className="w-full md:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <RTE
                    label="Description :"
                    name="description"
                    control={control}
                    defaultValue={getValues("description")}
                    className="w-full"
                />
                <Input
                    label="Tags :"
                    placeholder="Tags (space separated)"
                    className="mb-4"
                    {...register("tags")}
                />
            </div>
            <div className="w-full md:w-1/3 px-2">
                <Input
                    label="Featured Image 1 :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("featured_image1")}
                />
                {post?.featured_image1 && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featured_image1)}
                            alt="Featured Image 1"
                            className="rounded-lg max-w-full h-auto"
                        />
                    </div>
                )}
                <Input
                    label="Featured Image 2 :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("featured_image2")}
                />
                {post?.featured_image2 && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featured_image2)}
                            alt="Featured Image 2"
                            className="rounded-lg max-w-full h-auto"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

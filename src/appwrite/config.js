import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query,Account } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, description, featured_image1,featured_image2, tags,status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug|| ID.unique(),
                {
                    title,
                    description,
                    featured_image1,
                    featured_image2,
                    tags,
                    status,
                    userId,
                    
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }
    async createBuyer({name, slug,email, description,number,  productId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId2,
                slug|| ID.unique(),
                {
                    name,
                    email,
                    description,
                    productId,
                    number,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createBuyer :: error", error);
        }
    }





    async deleteBuyer(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId2,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteBuyer :: error", error);
            return false
        }
    }



    async getBuyers(Id) {
        try {
            const queries = [Query.contains('productId', Id)];
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId2,
                queries
            );
            console.log(response.documents)
            return response.documents;
        } catch (error) {
            console.error('Appwrite Service :: getBuyers :: Error:', error);
            throw error;
        }
    }



    async createNotification({product_name, slug, notification,  email}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId3,
                slug|| ID.unique(),
                {
                    product_name,
                    notification,
                    email,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createNotification :: error", error);
        }
    }


    async deleteNotification(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId3,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteNotification :: error", error);
            return false
        }
    }



    async getNotification(Id) {
        try {
            const queries = [Query.contains('email', Id)];
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId3,
                queries
            );
            console.log(response.documents)
            return response.documents;
        } catch (error) {
            console.error('Appwrite Service :: getNotification :: Error:', error);
            throw error;
        }
    }



    async updatePost(slug, {title,
        description,
        featured_image1,
        featured_image2,
        tags,
        status,}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    description,
                    featured_image1,
                    featured_image2,
                    tags,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }
    
    async getMy(user) {
        try {
            const queries = [Query.equal('userId', user)];
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
            console.log(response.documents)
            return response.documents;
        } catch (error) {
            console.error('Appwrite Service :: searchPosts :: Error:', error);
            throw error;
        }
    }
    async searchPosts(tag) {
        try {
            const queries = [Query.contains('tags', tag)];
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
            console.log(response.documents)
            return response.documents;
        } catch (error) {
            console.error('Appwrite Service :: searchPosts :: Error:', error);
            throw error;
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }
    getFilePreview(fileId){
    console.log(this.bucket.getFileView(
        conf.appwriteBucketId,
        fileId
    ));
    return this.bucket.getFileView(
        conf.appwriteBucketId,
        fileId
    )
}

}


const service = new Service()
export default service

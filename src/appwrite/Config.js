import { Client, Databases, ID, Storage, Query } from "appwrite";
import conf from "../Config/conf";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({
    slug,
    title,
    content,
    featuredImg,
    userId,
    status,
    author,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          userId,
          status,
          author,
        }
      );
    } catch (error) {
      throw "Medium " + error.message;
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("ERROR FROM APPRITE UPDATE POST ::::::::", error);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );

      return true;
    } catch (error) {
      console.log("ERRROR FROM DELETE POST :::::::::::", error);
      throw error;
    }

    return false;
  }
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("ERROR FROM THE GETPOST ::::", error);
      return false;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        queries
      );
    } catch (error) {
      throw "Medium " + error.message;
      return false;
    }
  }

  //   file upload servicce
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw error;
    }
  }
  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appWriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("DELETE FILE ERROR :::", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appWriteBucketId, fileId);
  }
}
const appwriteService = new Service();

export default appwriteService;

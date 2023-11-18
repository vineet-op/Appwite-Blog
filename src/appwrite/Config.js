/* The above class is a JavaScript service class that interacts with the Appwrite backend to perform CRUD operations on
posts and handle file uploads. */

import { Client, Databases, ID, Storage, Query } from "appwrite";
import conf from "../Config/conf";

export class Service {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImg, userId, status }) {
    try {
      return await this.database.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          status,
          userId,
        }
      );
    } catch (error) {
      throw "createPost  " + error.message;
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImg, status }) {
    try {
      return await this.database.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImg,
          status,
        }
      );
    } catch (error) {
      throw "UpdatePost " + error.message;
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      throw "DeletePost" + error.message;
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      throw "getPost" + error.message;
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        queries
      );
    } catch (error) {
      throw "getPosts" + error.message;
      return false;
    }
  }

  /** file upload service */

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      throw "uploadFile " + error.message;
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(conf.appWriteBucketId, fileId);
      return true;
    } catch (error) {
      throw "delete File" + error.message;
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appWriteBucketId, fileId);
  }
}

const appwriteService = new Service();

export default appwriteService;

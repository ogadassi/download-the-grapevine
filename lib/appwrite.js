import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.native.aora",
  projectId: "6661bd73003cacb58e1d",
  storageId: "6661bfe0002b7678472f",
  databaseId: "6661be95002179932c61",
  userCollectionId: "6661beaa00076f1c6dc0",
  videoCollectionId: "6661bec3002a786bfb8a",
};

const {
  endpoint,
  platform,
  projectId,
  storageId,
  databaseId,
  userCollectionId,
  videoCollectionId,
} = config;

const client = new Client();

client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error(error);

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    // signOut();
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      databaseId,
      userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt"),
    ]);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt", Query.limit(7)),
    ]);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.search("title", query),
    ]);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.equal("creator", userId),
      Query.orderDesc("$createdAt"),
    ]);
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") fileUrl = storage.getFileView(storageId, fileId);
    else if (type === "image")
      fileUrl = storage.getFilePreview(
        storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    else throw new Error("Invalid file type");
    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

export async function uploadFile(file, type) {
  if (!file) return;
  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createVideo(form) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);
    const newPost = await databases.createDocument(
      databaseId,
      videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );
    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

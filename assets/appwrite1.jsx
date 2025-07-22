// Initialized the Appwrite client
// imported all the necessary database elements for the application
import { Avatars, Client, Account, Databases, ID, Storage, Query } from "appwrite";

const appwriteClient = new Client();

appwriteClient
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6851607e003b10432fe3');

const account = new Account(appwriteClient);
const databases = new Databases(appwriteClient); 
const storage = new Storage(appwriteClient);
const avatars = new Avatars(appwriteClient);


export { avatars , storage, appwriteClient, account, ID , databases, Query};
import * as admin from "firebase-admin";
import serviceAccount from "../service-account.json";

/**
 *
 * Initializing the FirebaseApp in our Cloud Functions
 *
 */
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: process.env.VUE_DATABASE_URL,
    storageBucket: process.env.VUE_STORAGE_BUCKET,
});

const db = admin.firestore();
const auth = admin.auth();

export { admin, db, auth };

import * as admin from "firebase-admin";
import serviceAccount from "../service-account.json";

/**
 *
 * Initializing the FirebaseApp in our Cloud Functions
 *
 */
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: "https://chromie-bb322-default-rtdb.firebaseio.com",
});

const db = admin.database();
const auth = admin.auth();

export { admin, db, auth };

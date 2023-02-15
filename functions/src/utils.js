import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import service_account from "./service_account.json" assert { type: "json" };

export function getFirestoreInstance() {
  // check if app has already been initialized
  const isInitalized = getApps().length > 0
  if (!isInitalized) { // not initalized, connect to firebase
    initializeApp({
      credential: cert(service_account)
    })
  }
  return getFirestore()
}

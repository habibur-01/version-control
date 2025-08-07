// services/firestoreService.js
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
// Adjust path as needed

// Get version with onSnapshot
export function getVersionsByType(type, callback, errorCallback) {
  const versionsRef = collection(db, "versions");
  const q = query(versionsRef, where("type", "==", type));

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(results);
    },
    (error) => {
      console.error("Snapshot error:", error);
      if (errorCallback) errorCallback(error);
    }
  );

  return unsubscribe; // To allow cleanup in useEffect
}

// Updated Data
export async function updateVersion(id, updatedData) {
  const versionRef = doc(db, "versions", id);

  try {
    await updateDoc(versionRef, updatedData);
    console.log("Version updated!");
  } catch (error) {
    console.error("Error updating document:", error);
  }
}

// Delete Data
export async function deleteVersion(id) {
  const versionRef = doc(db, "versions", id);

  try {
    await deleteDoc(versionRef);
    console.log("Version deleted!");
  } catch (error) {
    console.error("Error deleting document:", error);
  }
}

// Delete Project and it's associated Versions
export async function deleteProjectWithVersions(projectName) {
  try {
    // Step 1: Delete project(s)
    const projectQuery = query(
      collection(db, "projects"),
      where("name", "==", projectName)
    );
    const projectSnapshot = await getDocs(projectQuery);

    await Promise.all(
      projectSnapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, "projects", docSnap.id))
      )
    );

    // Step 2: Delete all versions with type === projectName
    const versionQuery = query(
      collection(db, "versions"),
      where("type", "==", projectName)
    );
    const versionSnapshot = await getDocs(versionQuery);

    await Promise.all(
      versionSnapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, "versions", docSnap.id))
      )
    );
  } catch (error) {
    console.error("Error deleting project and versions:", error);
  }
}

import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  arrayRemove,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX-aEN_zKs34W2_osffW645_i2Yn7rZoU",
  authDomain: "elearning-1b102.firebaseapp.com",
  projectId: "elearning-1b102",
  storageBucket: "elearning-1b102.appspot.com",
  messagingSenderId: "866085008354",
  appId: "1:866085008354:web:3a63d3a42e7c67118fffbb",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  { uid, displayName, email },
  additionalInfo = {}
) => {
  const userDocRef = doc(db, "users", uid);
  ////console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  ////console.log(userSnapshot);
  ////console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.error(error);
    }
  }
  return userDocRef;
};

export const createMyListDocumentFromAuth = async (
  { uid, displayName, email },
  additionalInfo = {}
) => {
  const userDocRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo,
      });
      // Create the "enrolled" document for the user
      const myListDocRef = doc(db, "enrolled", uid);
      await setDoc(myListDocRef, { enrolled: [] });
    } catch (error) {
      console.error(error);
    }
  }

  return userDocRef;
};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const createAuthUserWithEmailandPassword = async (email, password) => {
  if (!email || !password) return;
  const response = await createUserWithEmailAndPassword(auth, email, password);
  ////console.log(response);

  return response;
};

export const signInAuthUserWithEmailandPassword = async (email, password) => {
  if (!email || !password) return;
  const response = await signInWithEmailAndPassword(auth, email, password);
  ////console.log(response);
  return response;
};
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback) =>
  onAuthStateChanged(auth, callback);

// To fetch enrolled course from firebase
export const fetchEnrolledCourse = async (userId) => {
  try {
    const userDocRef = doc(collection(db, "enrolled"), userId);
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      const userEnrolled = docSnapshot.data().enrolled || [];
      //console.log(userEnrolled);
      return userEnrolled;
    } else {
      //console.log("Document does not exist");
      return [];
    }
  } catch (error) {
    console.error("Error while fetching enrolled course:", error);
    return [];
  }
};

// To add enrolled course
export const addEnrolledCourse = async (userId, enrolledCourse) => {
  try {
    //console.log(userId, enrolledCourse);
    const myEnrolledRef = collection(db, "enrolled");
    const userDocRef = doc(myEnrolledRef, userId);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      const userEnrolled = userSnapshot.data().enrolled || [];
      //console.log("Original enrolled:", userEnrolled);
      const updatedEnrolled = [...userEnrolled, enrolledCourse];
      //console.log("Updated enrolled:", updatedEnrolled);
      await setDoc(userDocRef, { enrolled: updatedEnrolled }, { merge: true });
    }
  } catch (error) {
    console.error("Error updating Firestore document:", error);
  }
};

// To remove enrolled course
export const removeEnrolledCourse = async (userId, enrolledId) => {
  const myEnrolledRef = collection(db, "enrolled");
  const userDocRef = doc(myEnrolledRef, userId);
  const userSnapshot = await getDoc(userDocRef);
  if (userSnapshot.exists()) {
    const userEnrolled = userSnapshot.data().enrolled || [];
    //console.log(userEnrolled);
    const updatedEnrolled = userEnrolled.filter(
      (course) => course.id !== enrolledId
    );
    //console.log(updatedEnrolled);
    await updateDoc(userDocRef, { enrolled: updatedEnrolled });
  }
};

// To fetch complete course from firebase
export const fetchCompleteCourse = async (userId) => {
  try {
    const userDocRef = doc(collection(db, "complete"), userId);
    const docSnapshot = await getDoc(userDocRef);

    if (docSnapshot.exists()) {
      const userComplete = docSnapshot.data().complete || [];
      //console.log(userComplete);
      return userComplete;
    } else {
      //console.log("Document does not exist");
      return [];
    }
  } catch (error) {
    console.error("Error while fetching enrolled course:", error);
    return [];
  }
};

// To add into Complete course

export const addCompleteCourse = async (userId, completeCourse) => {
  try {
    const myCompleteRef = collection(db, "complete");
    const userDocRef = doc(myCompleteRef, userId);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      const userComplete = userSnapshot.data().complete || [];
      const updatedComplete = [...userComplete, completeCourse];
      await setDoc(userDocRef, { complete: updatedComplete }, { merge: true });
    } else {
      // Create the 'complete' collection and add the document
      await setDoc(userDocRef, { complete: [completeCourse] });
    }
  } catch (error) {
    console.error("Error updating Firestore document:", error);
  }
};

// Function to add data to Firestore
export const addDataToFirestore = async (jsonData) => {
  try {
    //console.log("inside addDataToFirestore function");
    //console.log(jsonData);
    for (const documentId in jsonData) {
      if (Object.prototype.hasOwnProperty.call(jsonData, documentId)) {
        const documentData = jsonData[documentId];
        const docRef = await addDoc(collection(db, "allCourses"), documentData);
        //console.log(`Document written with ID: ${docRef.id}`);
      }
    }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// To fetch all courses from firebase
export const fetchAllCourses = async () => {
  try {
    //console.log("inside fetchDataFromFirestore function");
    const querySnapshot = await getDocs(collection(db, "allCourses"));

    const data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });

    //console.log("Fetched data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return [];
  }
};

export const fetchFavouriteCourses = (userId, callback) => {
  //console.log("inside fetchFavouriteCourses");
  try {
    const userDocRef = doc(collection(db, "Favourites"), userId);
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const userFavorites = doc.data().favouritesData || [];
        //console.log(userFavorites);
        callback(userFavorites);
      } else {
        callback([]);
      }
    });
    // Return the unsubscribe function to allow unsubscribing from the snapshot listener if needed
    return unsubscribe;
  } catch (error) {
    console.error("Error while fetching favourites", error);
  }
};

// To add course to Favorites
export const addCourseToFavorites = async (userId, course) => {
  try {
    const myCompleteRef = collection(db, "Favourites");
    const userDocRef = doc(myCompleteRef, userId);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      const userFavorites = userSnapshot.data().favouritesData || [];
      const updatedFavorites = [...userFavorites, course];
      await setDoc(
        userDocRef,
        { favouritesData: updatedFavorites },
        { merge: true }
      );
    } else {
      // Create the 'complete' collection and add the document
      await setDoc(userDocRef, { complete: [course] });
    }
  } catch (error) {
    console.error("Error add course to Favorites:", error);
  }
};

// To remove listing from Favorites
export const removeCourseFromFavorites = async (userId, courseId) => {
  try {
    const myListRef = collection(db, "Favourites");
    const userDocRef = doc(myListRef, userId);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      const userFavorites = userSnapshot.data().favouritesData || [];

      // Filter out the course with the specified listingId
      const updatedFavorites = userFavorites.filter(
        (course) => course.id !== courseId
      );

      // Update the document with the filtered favoritesData
      await updateDoc(userDocRef, { favouritesData: updatedFavorites });
    }
  } catch (error) {
    console.error("Error while removing course from favorites", error);
  }
};

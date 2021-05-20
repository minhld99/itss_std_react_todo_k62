import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDbR3KNJlckw1I5tzXt28oLeClEqWGCGPc",
  authDomain: "fir-sample-bc661.firebaseapp.com",
  projectId: "fir-sample-bc661",
  storageBucket: "fir-sample-bc661.appspot.com",
  messagingSenderId: "776009270103",
  appId: "1:776009270103:web:c62d0b7d09d3d43844b412"
};

firebase.initializeApp(firebaseConfig);

// firebase.firestore().collection("todos").get().docs
// firebase.firestore().collection("todos").add()
// firebase.firestore().collection("todos").add([id]).update([change])
// firebase.firestore().collection("todos").add([id]).delete()

export const getFirebaseItems = async () => {
  try {
    const result = await firebase.firestore().collection("todos").get();
    const items = result.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const addFirebaseItem = async (item) => {
  try {
    const ref = firebase.firestore().collection("todos");
    await ref.add(item);
  } catch (err) {
    console.log(err);
  }
}

export const updateFirebaseItem = async (item, id) => {
  try {
    const ref = firebase.firestore().collection("todos").doc(id);
    await ref.update(item);
  } catch (err) {
    console.log(err);
  }
}

export const deleteFirebaseItem = async (item) => {
  const ref = firebase.firestore().collection("todos").doc(item.id);
  await ref.delete().then().catch(function (err) {
    console.log(err);
  });
};

export default firebase;

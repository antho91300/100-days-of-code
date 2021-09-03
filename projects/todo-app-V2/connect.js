const firebaseConfig = {
  apiKey: "AIzaSyCej-qwv55romNnFHZuvgC5vRnBQrACOO4",
  authDomain: "todo-list-app-8e31f.firebaseapp.com",
  databaseURL: "https://todo-list-app-8e31f-default-rtdb.firebaseio.com",
  projectId: "todo-list-app-8e31f",
  storageBucket: "todo-list-app-8e31f.appspot.com",
  messagingSenderId: "862425908201",
  appId: "1:862425908201:web:c782e4202cb2701359c178",
  measurementId: "G-RN8WV02CX5",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

// Sign in existing user
export function login(email, password) {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      localStorage.removeItem("errorMessage");
      window.location.replace("./todo-app.html");
    })
    .catch(function (err) {
      localStorage.setItem("errorMessage", "Identifiants incorrects !");
      window.location.reload();
    });
}

export function logout() {
  auth.signOut().then(() => {
    localStorage.removeItem("userID");
    window.location.replace("./login.html");
  });
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    localStorage.setItem("userID", user.uid);
  } else {
    localStorage.removeItem("userID");
  }
});

/*
auth.createUserWithEmailAndPassword(email, password).then(
  function(user){ console.log(user);},
  function(error){ console.error(error);}
);
*/
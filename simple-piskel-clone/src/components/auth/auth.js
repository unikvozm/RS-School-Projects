import "./auth.scss";

import firebase from "firebase/app";
import "firebase/auth";
import { loginBtn, headerEl } from "../utils/Constants";
import storage from "../utils/localStorage/localStorage";

function auth() {
  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAJN5fzJshyac7YzzoPuUbJWE9_E9sGsRc",
    authDomain: "simple-piskel-clone-unikvozm.firebaseapp.com",
    databaseURL: "https://simple-piskel-clone-unikvozm.firebaseio.com",
    projectId: "simple-piskel-clone-unikvozm",
    storageBucket: "simple-piskel-clone-unikvozm.appspot.com",
    messagingSenderId: "314958050286",
    appId: "1:314958050286:web:96cbf57e1967c86d49d4ff"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then(res => {
      return res.user;
    })
    .then(user => {
      loginBtn.textContent = "Sign Out";
      const userInfo = document.createElement("div");
      userInfo.innerHTML = `
      <img class="user-photo" src="${user.photoURL}">
      <p class="user-name">${user.displayName}</p>
      `;
      userInfo.classList.add("user-info");
      headerEl.appendChild(userInfo);
    })
    .catch(err => console.log(err));
}

function signOut() {
  firebase.auth().signOut();
  headerEl.removeChild(headerEl.lastChild);
  loginBtn.textContent = "Sign in";
}

function loginHandler() {
  switch (storage.getAuthStatus()) {
    case "false":
      signIn();
      storage.updateAuthStatus("true");
      break;
    case "true":
      signOut();
      storage.updateAuthStatus("false");
      break;
    default:
      break;
  }
}

export { auth, loginHandler };

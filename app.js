// Import required Firebase functions from the modular SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, query, orderByChild, equalTo } from "firebase/database";

// Your Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyBFrjoESfDw1jvUyn1hHOpZ3Yb3nQlZuiQ",
  authDomain: "test1-39787.firebaseapp.com",
  projectId: "test1-39787",
  storageBucket: "test1-39787.appspot.com",
  messagingSenderId: "1033312665677",
  appId: "1:1033312665677:web:329601dc92da951fd59c04",
  measurementId: "G-7X8WFCE94L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Get the DOM elements
const uploadTextInput = document.getElementById("uploadText");
const searchQueryInput = document.getElementById("searchQuery");
const searchResultDiv = document.getElementById("searchResult");
const uploadButton = document.getElementById("uploadButton");
const searchButton = document.getElementById("searchButton");

// Function to upload text to Firebase Realtime Database
uploadButton.addEventListener("click", function() {
  const text = uploadTextInput.value.trim();
  if (text) {
    const textRef = ref(database, 'texts/' + Date.now()); // Store by timestamp
    set(textRef, {
      text: text
    }).then(() => {
      alert('Text uploaded successfully!');
      uploadTextInput.value = ''; // Clear input after upload
    }).catch((error) => {
      console.error("Error uploading text: ", error);
    });
  } else {
    alert('Please enter some text to upload!');
  }
});

// Function to search for text in Firebase Realtime Database
searchButton.addEventListener("click", function() {
  const queryText = searchQueryInput.value.trim();
  searchResultDiv.textContent = ''; // Clear previous results

  if (queryText) {
    const textsRef = query(ref(database, 'texts'), orderByChild('text'), equalTo(queryText));
    get(textsRef).then((snapshot) => {
      if (snapshot.exists()) {
        let results = "Found: ";
        snapshot.forEach((childSnapshot) => {
          results += childSnapshot.val().text + ", ";
        });
        searchResultDiv.textContent = results.slice(0, -2); // Remove the trailing comma
      } else {
        searchResultDiv.textContent = 'No matching text found.';
      }
    }).catch((error) => {
      console.error("Error searching text: ", error);
    });
  } else {
    searchResultDiv.textContent = 'Please enter a search query.';
  }
});

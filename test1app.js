// Import the required functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";

// Your Firebase configuration (replacing placeholders with actual details)
const firebaseConfig = {
  apiKey: "AIzaSyBFrjoESfDw1jvUyn1hHOpZ3Yb3nQlZuiQ",
  authDomain: "test1-39787.firebaseapp.com",
  projectId: "test1-39787",
  storageBucket: "test1-39787.firebasestorage.app",
  messagingSenderId: "1033312665677",
  appId: "1:1033312665677:web:329601dc92da951fd59c04",
  measurementId: "G-7X8WFCE94L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

// Get references to HTML elements
const uploadText = document.getElementById('uploadText');
const uploadButton = document.getElementById('uploadButton');
const searchQuery = document.getElementById('searchQuery');
const searchButton = document.getElementById('searchButton');
const searchResult = document.getElementById('searchResult');

// Upload text to Firestore
uploadButton.addEventListener('click', async () => {
  const text = uploadText.value;
  if (text.trim() !== '') {
    try {
      // Add text to Firestore collection
      await addDoc(collection(db, 'texts'), { text });
      uploadText.value = '';
      alert('Text uploaded successfully!');
    } catch (error) {
      console.error('Error uploading text:', error);
      alert('Error uploading text. Please try again.');
    }
  } else {
    alert('Please enter some text to upload.');
  }
});

// Search for text in Firestore
searchButton.addEventListener('click', async () => {
  const queryText = searchQuery.value;
  if (queryText.trim() !== '') {
    try {
      // Query Firestore for matching text
      const q = query(collection(db, 'texts'), where('text', '==', queryText));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        searchResult.textContent = 'No matching text found.';
      } else {
        let results = '';
        querySnapshot.forEach((doc) => {
          results += `Found text: ${doc.data().text}<br>`;
        });
        searchResult.innerHTML = results;
      }
    } catch (error) {
      console.error('Error searching for text:', error);
      searchResult.textContent = 'Error searching for text. Please try again.';
    }
  } else {
    searchResult.textContent = 'Please enter text to search for.';
  }
});

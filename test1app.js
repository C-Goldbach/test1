// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

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
      await db.collection('texts').add({ text });
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
      const querySnapshot = await db.collection('texts').where('text', '==', queryText).get();
      if (querySnapshot.empty) {
        searchResult.textContent = 'No matching text found.';
      } else {
        let results = '';
        querySnapshot.forEach(doc => {
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

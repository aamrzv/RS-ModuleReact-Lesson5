// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
	apiKey: 'AIzaSyBQxcPlYTcgCFaJiyt9PjxUzkJALNnya3Q',
	authDomain: 'artemtodos-aa501.firebaseapp.com',
	projectId: 'artemtodos-aa501',
	storageBucket: 'artemtodos-aa501.appspot.com',
	messagingSenderId: '928635966476',
	appId: '1:928635966476:web:ea351f7c3f6373dc3c0a29',
	databaseURL: 'https://artemtodos-aa501-default-rtdb.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase();

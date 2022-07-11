import { writable } from 'svelte/store';

// Firebase
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged
} from 'firebase/auth';
import { auth } from '$lib/firebase';

export const authStore = writable({
	isLoggedIn: false,
	user: null
});

export default {
	subscribe: authStore.subscribe,
	login: async (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				authStore.set({
					isLoggedIn: true,
					user: userCredential.user
				});

				localStorage.setItem('uid', userCredential.user.uid);
			})
			.catch((error) => {
				console.log(error);
			});
	},
	register: async (email, password) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;

				authStore.set({
					isLoggedIn: true,
					user: user
				});

				localStorage.setItem('uid', user.uid);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;

				console.log(errorCode, errorMessage);
				// ..
			});
	},
	logout: async () => {
		try {
			await signOut(auth);
			authStore.set({
				isLoggedIn: false,
				user: null
			});

			localStorage.removeItem('uid');
		} catch (error) {
			console.log('error', error);
		}
	}
};

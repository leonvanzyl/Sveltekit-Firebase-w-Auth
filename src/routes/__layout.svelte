<script>
	// Svelte imports
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	// Stores
	import { authStore } from '$lib/stores/authStore';

	// Firebase
	import { auth } from '$lib/firebase';
	import { onAuthStateChanged } from 'firebase/auth';

	// Styles
	import '../app.css';

	// Custom Components
	import Navigation from '../lib/components/layout/Navigation.svelte';

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// User signed in
				authStore.set({
					isLoggedIn: true,
					user
				});

				localStorage.setItem('uid', user.uid);
				// ...
			} else {
				// User is signed out
				authStore.set({
					isLoggedIn: false,
					user: null
				});

				localStorage.removeItem('uid');

				goto('/login');
			}
		});
	});
</script>

<header class="container mx-auto p-6">
	<Navigation />
</header>

<main class="container mx-auto p-6">
	<slot />
</main>

<footer class="container mx-auto text-center text-xs p-6">
	<p>&copy; REAL COST</p>
</footer>

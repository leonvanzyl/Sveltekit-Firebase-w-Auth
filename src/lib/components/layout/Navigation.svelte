<script>
	// Stores
	import authStore from '$lib/stores/authStore';

	// Handler functions
	const handleSignout = async () => {
		// Logout User
		try {
			authStore.logout();
		} catch (error) {}
	};
</script>

<div class="flex flex-col items-center justify-between sm:flex-row">
	<div class="font-bold tracking-tight text-2xl"><a href="/">REAL COST</a></div>
	<nav>
		<ul class="flex gap-4">
			{#if $authStore.isLoggedIn}
				<li><button on:click={handleSignout}>Signout</button></li>
			{:else}
				<li><a href="/login">Login</a></li>
				<li><a href="/signup">Signup</a></li>
			{/if}
		</ul>
	</nav>
</div>

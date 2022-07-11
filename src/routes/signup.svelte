<script>
	// Stores
	import authStore from '$lib/stores/authStore';

	let email;
	let password;
	let error;
	let loading = false;

	const handleSubmit = async () => {
		if (email.trim() === '' || password.trim() === '') {
			error = 'Please enter an email and password.';
			return;
		}

		authStore.register(email, password);
	};
</script>

<div class="card">
	<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-4">
		<input
			class="py-2 px-4 border rounded"
			bind:value={email}
			type="email"
			placeholder="Your email"
			required
		/>
		<input
			class="py-2 px-4 border rounded"
			bind:value={password}
			type="password"
			placeholder="Password"
			required
		/>
		<button class="btn btn-primary" type="submit" disabled={loading}
			>{loading ? 'Loading' : 'Register'}</button
		>
	</form>
	{#if error}
		<p class="text-red-500">{error}</p>
	{/if}
</div>

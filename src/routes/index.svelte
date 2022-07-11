<script>
	// Stores
	import { authStore } from '$lib/stores/authStore';

	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';

	// Firebase
	import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase';

	let inputName;
	let inputPrice;

	let myAssets = [];
	onMount(async () => {
		const uid = localStorage.getItem('uid');
		console.log(uid);

		const q = query(collection(db, 'assets'), where('uid', '==', uid));

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			const newAsset = { id: doc.id, ...doc.data() };
			myAssets = [...myAssets, newAsset];
		});
	});

	// Handler functions
	const displayAsset = (assetName, assetId) => {
		console.log(assetId);
		goto(`/asset/${assetName}-${assetId}`);
	};

	const handleSubmit = async () => {
		const newData = {
			name: inputName,
			price: inputPrice,
			uid: localStorage.getItem('uid')
		};

		try {
			const docRef = await addDoc(collection(db, 'assets'), newData);
			// Add the generated ID
			newData.id = docRef.id;
			myAssets = [...myAssets, newData];
		} catch (error) {
			console.log(error);
		}
	};
</script>

<svelte:head>
	<title>Assets</title>
</svelte:head>

<h1 class="text-2xl font-bold border-b pb-2 mb-4 uppercase">ASSETS</h1>
<form on:submit|preventDefault={handleSubmit}>
	<input
		class="py-2 px-4 border rounded"
		bind:value={inputName}
		type="Text"
		placeholder="Asset name"
		required
	/>
	<input class="py-2 px-4 border rounded" bind:value={inputPrice} type="number" required />
	<button class="btn btn-primary">Add</button>
</form>
<div class="grid gap-4 sm:grid-cols-3">
	{#each myAssets as asset (asset.id)}
		<div
			class="card hover:bg-gray-50 cursor-pointer"
			on:click={displayAsset.bind(this, asset.name, asset.id)}
		>
			<h3 class="text-2xl font-bold">{asset.name}</h3>
			<p>Purchase Price: {asset.price}</p>
		</div>
	{/each}
</div>

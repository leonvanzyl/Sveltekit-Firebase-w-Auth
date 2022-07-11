<script context="module">
	export async function load({ params }) {
		return {
			props: {
				id: params.id,
				name: params.name
			}
		};
	}
</script>

<script>
	import { onMount } from 'svelte';
	import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
	import { db } from '$lib/firebase';

	export let id;
	export let name;

	let costs = [];

	console.log(id, name);

	// form
	let inputName;
	let inputCost = 1;

	// Reactive value.. updates whenever costs are changed (like adding a new cost)
	$: totalCosts = costs.reduce((acc, cost) => {
		return acc + cost.cost;
	}, 0);

	onMount(async () => {
		const q = query(collection(db, 'costs'), where('assetId', '==', id));

		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			costs = [...costs, { id: doc.id, ...doc.data() }];
		});
	});

	// handler functions
	const handleSubmit = async () => {
		// add new expense
		const newData = {
			assetId: id,
			name: inputName,
			cost: inputCost,
			uid: localStorage.getItem('uid')
		};

		try {
			const docRef = await addDoc(collection(db, 'costs'), newData);
			// Add the generated ID
			newData.id = docRef.id;
			costs = [...costs, newData];

			inputName = '';
			inputCost = 1;
		} catch (error) {
			console.log(error);
		}
	};
</script>

<svelte:head>
	<title>Costs for {name}</title>
</svelte:head>

<div class="text-center sm:text-left flex flex-col gap-4">
	<h1 class="text-2xl font-bold border-b pb-2 uppercase">{name}</h1>
	<ul class="text-xs text-gray-400">
		<li />
		<li>Total Costs: {totalCosts}</li>
	</ul>

	<form on:submit|preventDefault={handleSubmit}>
		<input
			class="py-2 px-4 border rounded"
			bind:value={inputName}
			type="Text"
			placeholder="Expense name"
			required
		/>
		<input class="py-2 px-4 border rounded" bind:value={inputCost} type="number" required />
		<button class="btn btn-primary">Add</button>
	</form>

	<div class="grid gap-4 sm:grid-cols-3">
		{#each costs as cost (cost.id)}
			<div class="card">
				<h3 class="text-2xl font-bold">{cost.name}</h3>
				<p>Cost: {cost.cost}</p>
			</div>
		{/each}
	</div>
</div>

<script lang="ts">
	import './layout.css';
	import chibi from '#lib/assets/chibi.png';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={chibi}/>
	<meta name="title" content="This is where the description goes for SEO" />
</svelte:head>

{@render children()}

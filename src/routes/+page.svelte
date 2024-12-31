<script lang="ts">
	import AdvancedOptions from './AdvancedOptions.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<div
	class="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light position-relative"
>
	<AdvancedOptions {form} />
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-6">
				<h1 class="text-center mb-4">Link Shortener</h1>
				<form class="mb-4" method="POST" action="?/create">
					<div class="mb-3">
						<label for="url" class="form-label">URL to shorten</label>
						<input
							id="url"
							type="url"
							name="url"
							placeholder="https://example.com"
							required
							class="form-control"
						/>

						<label for="slug" class="form-label mt-3">Custom slug (optional)</label>
						<input id="slug" name="slug" placeholder="my-custom-slug" class="form-control" />
					</div>
					<button type="submit" class="btn btn-primary w-100">Shorten</button>
				</form>
			</div>
		</div>
		{#if form?.success && form?.action === 'create'}
			<div class="row justify-content-center">
				<div class="col-md-6">
					<div class="alert alert-secondary" role="alert">
						<p>
							<strong>Your shortened link is:</strong>
							<a href={form.url} target="_blank" rel="noopener noreferrer">
								{form.url}
							</a>
						</p>
						<p>To manage your link, use the following credentials:</p>
						<p>
							<strong>Slug:</strong>
							<code>{form.slug}</code>
							<br />
							<strong>Passphrase:</strong>
							<code>{form.passphrase}</code>
						</p>
						<p></p>
						<p>Manage your link by clicking the key icon in the top-right corner of the page.</p>
						<small>
							<em>
								Note: this passphrase is required to update or delete your 
								link. Keep it secure.
							</em>
						</small>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

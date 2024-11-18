<script lang="ts">
	import AdvancedOptions from '$lib/AdvancedOptions.svelte';

	let submitted = $state(false);
	let slug = $state('');
	let passphrase = $state('');

	function shorten(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const url = form.url.value;

		submitted = true;
		slug = Math.random().toString(36).slice(2);
		passphrase = Math.random().toString(36).slice(2);
	}
</script>

<div
	class="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-light position-relative"
>
	<AdvancedOptions />
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-6">
				<h1 class="text-center mb-4">Link Shortener</h1>
				<form class="mb-4" onsubmit={shorten}>
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
		{#if submitted}
			<div class="row justify-content-center">
				<div class="col-md-6">
					<div class="alert alert-secondary" role="alert">
						<p>
							<strong>Your shortened link is:</strong>
							<a
								href={`
            ${window.location.origin}/${slug}
          `}
								target="_blank"
								rel="noopener noreferrer"
							>
								{window.location.origin}/{slug}
							</a>
						</p>
						<p>To manage your link, use the following credentials:</p>
						<p>
							<strong>Slug:</strong>
							<code>{slug}</code>
							<br />
							<strong>Passphrase:</strong>
							<code>{passphrase}</code>
						</p>
						<p></p>
						<p>Manage your link by clicking the key icon in the top-right corner of the page.</p>
						<small>
							<em>
								Note: this passphrase is required to update or delete your link. keep it secure.
							</em>
						</small>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

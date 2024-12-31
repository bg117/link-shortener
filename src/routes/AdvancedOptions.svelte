<script>
	import { enhance } from '$app/forms';
	import { Key } from 'lucide-svelte';

	let { form } = $props();
</script>

<div class="position-absolute top-0 end-0 m-3">
	<button
		class="btn btn-light"
		aria-controls="staticBackdrop"
		data-bs-toggle="modal"
		data-bs-target="#staticBackdrop"
	>
		<Key class="h-4 w-4" />
		<span class="visually-hidden">Manage Link</span>
	</button>
	<div
		class="modal fade"
		id="staticBackdrop"
		data-bs-backdrop="static"
		data-bs-keyboard="false"
		tabindex="-1"
		aria-labelledby="staticBackdropLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title fs-5" id="staticBackdropLabel">Manage Link</h1>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
									aria-label="Close"></button>
				</div>

				<div class="modal-body">
					{#if form?.success === false
						/* display alert with form.error as message */}
						<div class="alert alert-danger" role="alert">
							<span>{form.error}</span>
						</div>
					{:else if form?.success === true}
						<div class="alert alert-success" role="alert">
							<span>
								{#if form?.action === 'update'}
									Link updated successfully!
								{:else if form?.action === 'delete'}
									Link deleted successfully!
								{:else}
									Link retrieved successfully!
								{/if}
							</span>
						</div>
					{/if}
					<form method="POST" id="manage-link" on:submit|preventDefault
								use:enhance={() => {
									return async ({ update }) => {
										await update({ reset: false });
									};
								}}>
						<div class="mb-3">
							<label for="slug" class="form-label">Slug</label>
							<input id="slug" name="slug" placeholder="url-slug"
										 class="form-control" required />
						</div>
						<div class="mb-3">
							<label for="passphrase" class="form-label">Passphrase</label>
							<input
								id="passphrase"
								name="passphrase"
								type="password"
								placeholder="Passphrase"
								class="form-control"
								required
							/>
						</div>
						{#if form?.success === true && form?.action === 'read'}
							<div class="mb-3">
								<label for="url" class="form-label">URL</label>
								<input
									id="url"
									name="url"
									type="url"
									placeholder="https://example.com"
									class="form-control"
									value={form.url}
									required
								/>
							</div>
						{/if}
					</form>
				</div>
				<div class="modal-footer">
					{#if form?.success === true && form?.action === 'read'}
						<button type="submit" class="btn btn-primary" form="manage-link"
										formaction="?/update">
							Update
						</button>
					{:else}
						<button type="submit" class="btn btn-primary" form="manage-link"
										formaction="?/read">
							Retrieve Link
						</button>
					{/if}
					<button type="submit" class="btn btn-danger" form="manage-link"
									formaction="?/delete">
						Delete
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

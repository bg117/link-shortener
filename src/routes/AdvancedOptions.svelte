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
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
					></button>
				</div>
				
				<form method="POST" action="?/read" on:submit|preventDefault 
							use:enhance>
					<div class="modal-body">
						{#if form?.success === false 
							/* display alert with form.error as message */}
							<div class="alert alert-danger" role="alert">
								<span>{form.error}</span>
							</div>
						{/if}
						<div class="mb-3">
							<label for="slug" class="form-label">Slug</label>
							<input id="slug" name="slug" placeholder="url-slug" class="form-control" />
						</div>
						<div class="mb-3">
							<label for="passphrase" class="form-label">Passphrase</label>
							<input
								id="passphrase"
								name="passphrase"
								type="password"
								placeholder="Passphrase"
								class="form-control"
							/>
						</div>
					</div>
					<div class="modal-footer">
						<button type="submit" class="btn btn-primary">Manage</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

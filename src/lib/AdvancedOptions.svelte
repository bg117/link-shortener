<script>
	import { Key } from 'lucide-svelte';
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
				<form>
					<div class="modal-body">
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
						<button type="button" class="btn btn-primary">Manage</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

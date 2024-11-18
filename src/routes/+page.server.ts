import { db } from '$lib/server/db';
import { links } from '$lib/server/db/schema';
import type { Actions } from './$types';

import { generate } from 'generate-passphrase';

import bcrypt from 'bcrypt';
import cryptoRandomString from 'crypto-random-string';

export const actions = {
	default: async ({ url: { host, protocol }, request }) => {
		const data = await request.formData();
		// get the url and slug from the form data
		const url = data.get('url') as string;
		const slug =
			(data.get('slug') as string) || cryptoRandomString({ length: 8, type: 'url-safe' }); // if no slug is provided, generate a random one
		const passphrase = generate({ length: 6, separator: ' ', numbers: false }); // generate a passphrase

		const hash = await bcrypt.hash(passphrase, 10); // hash the passphrase client-side

		// insert the new link into the database
		const entry = await db
			.insert(links)
			.values({
				slug,
				url,
				passphraseHash: hash
			})
			.returning();

		return {
			success: true,
			url: `${protocol}//${host}/${slug}`,
			slug,
			passphrase
		};
	}
} satisfies Actions;

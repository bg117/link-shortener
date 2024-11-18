import { db } from '$lib/server/db';
import { links } from '$lib/server/db/schema';
import type { Actions } from './$types';

import ppjs from 'passphrase.js';

import bcrypt from 'bcrypt';
import cryptoRandomString from 'crypto-random-string';

export const actions = {
	default: async ({ url: { host, protocol }, request }) => {
		const data = await request.formData();
		// get the url and slug from the form data
		const url = data.get('url') as string;
		const slug =
			(data.get('slug') as string) || cryptoRandomString({ length: 8, type: 'url-safe' }); // if no slug is provided, generate a random one
		const passphrase = ppjs.genPassPhraseCrypto(6, ppjs.effLarge); // generate a passphrase

		const hash = await bcrypt.hash(passphrase, 10); // hash the passphrase client-side

		// insert the new link into the database
		await db.insert(links).values({
			slug,
			url,
			passphraseHash: hash
		});

		return {
			success: true,
			url: `${protocol}//${host}/${slug}`,
			slug,
			passphrase
		};
	}
} satisfies Actions;

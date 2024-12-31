import { db } from '$lib/server/db';
import { links } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';

import ppjs from 'passphrase.js';

import bcrypt from 'bcrypt';
import cryptoRandomString from 'crypto-random-string';

export const actions = {
	create: async ({ url: { host, protocol }, request }) => {
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
			action: 'create',
			url: `${protocol}//${host}/${slug}`,
			slug,
			passphrase
		};
	},
	
	// get the information for a given slug and passphrase
	read: async ({ request }) => {
		const data = await request.formData();
		const slug = data.get('slug') as string;
		const passphrase = data.get('passphrase') as string;
		
		// get the link with the given slug
		const [link] = await db.select().from(links).where(eq(links.slug, slug)).limit(1);
		
		// if the link doesn't exist, return an error
		if (!link) {
			return {
				success: false,
				error: 'Link not found'
			};
		}
		
		// compare the passphrase with the stored hash
		const match = await bcrypt.compare(passphrase, link.passphraseHash);
		
		// if the passphrase is incorrect, return an error
		if (!match) {
			return {
				success: false,
				error: 'Incorrect passphrase'
			};
		}
		
		// return the url
		return {
			url: link.url,
			success: true,
			action: 'read'
		};
	},
	
	// update the url for a given slug and passphrase
	update: async ({ request }) => {
		const data = await request.formData();
		const slug = data.get('slug') as string;
		const passphrase = data.get('passphrase') as string;
		const url = data.get('url') as string;
		
		// get the link with the given slug
		const [link] = await db.select().from(links).where(eq(links.slug, slug)).limit(1);
		
		// if the link doesn't exist, return an error
		if (!link) {
			return {
				success: false,
				error: 'Link not found'
			};
		}
		
		// compare the passphrase with the stored hash
		const match = await bcrypt.compare(passphrase, link.passphraseHash);
		
		// if the passphrase is incorrect, return an error
		if (!match) {
			return {
				success: false,
				error: 'Incorrect passphrase'
			};
		}
		
		// update the url
		await db.update(links).set({ url }).where(eq(links.slug, slug));
		
		return {
			success: true,
			action: 'update'
		};
	},
	
	// delete a link with a given slug and passphrase
	delete: async ({ request }) => {
		const data = await request.formData();
		const slug = data.get('slug') as string;
		const passphrase = data.get('passphrase') as string;
		
		// get the link with the given slug
		const [link] = await db.select().from(links).where(eq(links.slug, slug)).limit(1);
		
		// if the link doesn't exist, return an error
		if (!link) {
			return {
				success: false,
				error: 'Link not found'
			};
		}
		
		// compare the passphrase with the stored hash
		const match = await bcrypt.compare(passphrase, link.passphraseHash);
		
		// if the passphrase is incorrect, return an error
		if (!match) {
			return {
				success: false,
				error: 'Incorrect passphrase'
			};
		}
		
		// delete the link
		await db.delete(links).where(eq(links.slug, slug));
		
		return {
			success: true,
			action: 'delete'
		};
	}
} satisfies Actions;

import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import cryptoRandomString from 'crypto-random-string';

export const links = pgTable('links', {
	id: serial('id').primaryKey(),
	slug: text('slug')
			.unique()
			.$defaultFn(() => cryptoRandomString({ length: 6, type: 'url-safe' })),
	url: text('url').notNull(),
	passphraseHash: text('passphrase_hash').notNull(),
});

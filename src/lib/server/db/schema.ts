import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
	id: serial('id').primaryKey(),
	slug: text('slug').unique().notNull(),
	url: text('url').notNull(),
	passphraseHash: text('passphrase_hash').notNull()
});

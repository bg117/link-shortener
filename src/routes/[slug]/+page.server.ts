import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { links } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function load({ params }) {
	// redirect to the entry with the given slug
	const [entry] = await db.select().from(links).where(eq(links.slug, params.slug)).limit(1);

	// redirect to the entry's url if it exists
	if (entry) {
		return redirect(302, entry.url);
	}
}

import { pgTable, uuid, text, timestamp, varchar, pgSchema, uniqueIndex, json, boolean, doublePrecision } from "drizzle-orm/pg-core"

// export const tenants = pgTable("tenants", {
//     id: uuid().default(sql`public.uuid_generate_v7()`).notNull(),
//     name: text(),
//     created: timestamp({ mode: 'string' }).default(sql`LOCALTIMESTAMP`).notNull(),
//     updated: timestamp({ mode: 'string' }).default(sql`LOCALTIMESTAMP`).notNull(),
//     deleted: timestamp({ mode: 'string' }),
//     computeId: uuid("compute_id"),
// }, (table) => [
//     uniqueIndex("tenants_pkey").using("btree", table.id.asc().nullsLast().op("uuid_ops")),
// ]);

// const userSchema = pgSchema("users");

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey(),
    username: varchar({length: 32}),
	displayName: varchar({length: 32}),
    email: varchar({length: 256}),
	avatar: varchar({length: 512}),
	balance: doublePrecision().default(0.00),
	// title: varchar({ length: 256 }),
	// estimate: varchar({ length: 256 }),
	// embedding: vector({ dimensions: 3 }),
	// complete: boolean(),
});

// const marketSchema = pgSchema('marketSchema');

export const markets = pgTable('markets', {
	id: uuid().defaultRandom().primaryKey(),
	slug: varchar({length: 256}).notNull(),
	question: text(),
	author: varchar({length: 256}) || uuid(),
	source: varchar({length: 256}),
	description: text(),
	startDate: timestamp({ mode: 'string' }),
	endDate: timestamp({ mode: 'string' }),
	outcomes: json(),
	trading: json(),
	resolution: json(),
	prices: json(),
	open: boolean(),
})



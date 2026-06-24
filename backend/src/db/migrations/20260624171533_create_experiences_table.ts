import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("experiences", (table) => {
    table.increments("id").primary();
    table
      .integer("couple_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("couples")
      .onDelete("CASCADE");
    table.string("title").notNullable();
    table.text("notes").nullable();
    table.boolean("is_completed").notNullable().defaultTo(false);
    table.timestamp("completed_at").nullable();
    table.string("photo_url").nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("experiences");
}
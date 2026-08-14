import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable("couples", (table) => {
    table.date("anniversary").nullable();
    table.string("endearment").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable("couples", (table) => {
    table.dropColumn("anniversary");
    table.dropColumn("endearment");
  });
}

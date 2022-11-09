/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('users', table => {
        table.increments();
        table.string("phoneNumber");
        table.string("card_id");
        table.string("password");
        table.string("email").unique();
        table.integer("balance").notNullable().defaultTo(0)
        table.timestamps(true, true);

    })
    .createTable("transactions", function (table) {
        table.increments();
        table.integer("user_id");
        table.string("card_id");
        table.decimal("amount");
        table.string("description")
        table.decimal("balance")
        table.timestamps(true, true);
      });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('users')
    .dropTable('transactions')
  
};

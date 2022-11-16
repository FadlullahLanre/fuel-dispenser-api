/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments();
            table.string("phoneNumber");
            table.string("card_id");
            table.string("password");
            table.string("email").unique();
            table.integer("balance").notNullable().defaultTo(0)
            table.datetime('created_at');
            table.datetime('updated_at');

        })
        .createTable("transactions", table => {
            table.increments();
            table.integer("user_id");
            table.string("card_id");
            table.decimal("amount");
            table.string("description")
            table.decimal("balance")
            table.datetime('created_at');
            table.datetime('updated_at');

        })
        .createTable("admin", function (table) {
            table.increments();
            table.string("phoneNumber");
            table.string("password");
            table.string("email").unique();
            table.string("role");
        })
        .createTable("agents", function (table) {
            table.increments();
            table.string("hotline");
            table.string("status");
            table.string('agent_name')
            table.string("password");
            table.string("email").unique();
            table.string("location");
        });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable('users')
        .dropTable('transactions')
        .dropTable('admin')
        .dropTable('agents')


};

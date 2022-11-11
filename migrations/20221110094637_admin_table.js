/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("admin", function (table) {
        table.increments();
        table.string("phoneNumber");
        table.string("card_id");
        table.string("password");
        table.string("email").unique();
        table.string("role");
        table.timestamps(true, true);
    })
    .createTable("agents", function (table) {
        table.increments();
        table.string("hotline");
        table.string("status");
        table.string('agent_name')
        table.string("password");
        table.string("email").unique();
        table.string("location");
        table.timestamps(true, true);
    });
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('admin')
    .dropTable('agents')

};

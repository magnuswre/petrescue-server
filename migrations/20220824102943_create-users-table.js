/*
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {   // mer info (Migrate) BACKEND 4 35:15. OM DU ÄNDRAR NÅGOT HÄR MÅSTE MIGRATE AGAIN. 
    return knex.schema.createTable("users", tbl=>{ // tar två argument. Det andra kan heta vad som helst relevant.   
        tbl.increments()//integer, id kolumnen. skapar och sparar ett id i idkolumnen med en siffra
        tbl.text("username", 120).notNullable().index() //Användarnamn. andra värdet anger maxvärdet för antal tecken. 
        //notNullable = måste fyllas i. Unique = unikt, ej fler av samma  

        tbl.text("password", 200).notNullable() // lösen
        tbl.text("imageUrl").notNullable() //bild 
        tbl.timestamps(true, true) 

    })
    .createTable("destinations", tbl=>{ // Detta är en "barntabell" till users 
        tbl.increments()
        tbl.text("title").notNullable().index()
        tbl.text("description").notNullable()
        tbl.text("imageUrl").notNullable()
        tbl.timestamps(true, true)
        tbl.integer("user_id").notNullable().unsigned().references("id").inTable("users").onDelete("CASCADE").onUpdate("CASCADE") // här kopplas tabellerna ihop med foregn-key. 
        //I metoden inTable så kollas vilken tabell som länkas samman.
        //i metoden reference så avser vad som ska länkas samman. alltså vilken tabell. I detta sammanhang id.  


}) 

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users").dropTableIfExists("destinations") //Här uppdateras tabellerna istället för att det skapas ny med samma namn. 
  
};

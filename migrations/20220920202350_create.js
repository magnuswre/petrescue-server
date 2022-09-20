/*
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {   
    return knex.schema.createTable("users", tbl=>{    
        tbl.increments()
        tbl.text("username", 120).notNullable().index() 
        
        tbl.text("password", 200).notNullable() // lösen
        tbl.text("imageUrl").notNullable() //bild 
        tbl.timestamps(true, true) 
    })
    .createTable("animals", tbl=>{ 
    tbl.increments()//integer, id kolumnen. skapar och sparar ett id i idkolumnen med en siffra
    tbl.text("title").notNullable().index()
    tbl.text("description").notNullable()
    tbl.text("imageUrl").notNullable()
    tbl.timestamps(true, true)
    
})

};
 //@param { import("knex").Knex } knex
  //@returns { Promise<void> }
 
exports.down = function(knex) {                                  
    return knex.schema.dropTableIfExists("users").dropTableIfExists("animals") 
}
 

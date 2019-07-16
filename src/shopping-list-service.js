const ShoppingListService = {
    getWholeList(knex) {
        return knex.select('*').from('shopping_list')
    },
    insertListItem(knex, newListItem) {
        return knex
            .insert(newListItem)
            .into('shopping_list')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getByItemId(knex, id) {
        return knex
            .from('shopping_list')
            .select('*')
            .where('id', id)
            .first()
    },
    updateItem(knex, id, newDetails) {
        return knex
            .from('shopping_list')
            .where({ id })
            .update(newDetails)
    },
    deleteItem(knex, id) {
        return knex
            .from('shopping_list')
            .where({ id })
            .del()
    }
}

module.exports = ShoppingListService
require('dotenv').config();

const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
});

function searchByText(searchTerm) {
    knexInstance
        .select('id', 'name')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(results => {
            console.log(results)
        });
}

//searchByText('dog')

function searchByPage(pageNumber) {
    const productsPerPage = 6
    const offset = productsPerPage * (pageNumber - 1)
    knexInstance
        .select('id', 'name', 'price')
        .from('shopping_list')
        .limit(productsPerPage)
        .offset(offset)
        .then(results => {
            console.log(results)
        });
}

//searchByPage(3)

function searchByDate(daysAgo) {
    knexInstance
        .select('id', 'name', 'date_added')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .then(results => {
            console.log(results)
        })
}

//searchByDate(6)

function totalPricePerCategory() {
    knexInstance
        .select('category')
        .sum('price')
        .from('shopping_list')
        .groupBy('category')
        .then(results => {
            console.log(results)
        })
}

totalPricePerCategory()


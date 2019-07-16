const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping list service object`, function() {
    let db
    let testListItems = [
        {
            id: 1,
            name: 'First Test Item',
            price: '1.11',
            category: 'Main',
            checked: false,
            date_added: new Date('2029-01-22T16:28:32.615Z'),
        },
        {
            id: 2,
            name: 'Second Test Item',
            price: '2.22',
            category: 'Snack',
            checked: false,
            date_added: new Date('2029-02-22T16:28:32.615Z'),
        },
        {
            id: 3,
            name: 'Third Test Item',
            price: '3.33',
            category: 'Lunch',
            checked: false,
            date_added: new Date('2029-03-22T16:28:32.615Z'),
        }
    ]

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.Test_DB_URL,
        })
    })

    after(() => db.destroy())

    before(() => db('shopping_list').truncate())

    afterEach(() => db('shopping_list').truncate())

    context(`Given 'shopping_list' has data`, () => {

        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testListItems)
        })

        it(`getWholeList() resolves full list from 'shopping_list' table`, () => {
            return ShoppingListService.getWholeList(db)
                .then(actual => {
                    expect(actual).to.eql(testListItems)
                })
        })

        it(`getByItemId()`, () => {
            const thirdId = 3
            const thirdTestItem = testListItems[thirdId - 1]
            return ShoppingListService.getByItemId(db, thirdId)
                .then(actual => {
                    expect(actual).to.eql({
                        id: thirdId,
                        name: thirdTestItem.name,
                        price: thirdTestItem.price,
                        category: thirdTestItem.category,
                        checked: thirdTestItem.checked,
                        date_added: thirdTestItem.date_added
                    })
                })
        })

        it(`updateItem()`, () => {
            const idOfItemToUpdate = 3
            const newItemDetails = {
                name: 'update name',
                price: '5.55',
                category: 'Snack',
                checked: false,
                date_added: new Date()
            }
            return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemDetails)
                .then(() => ShoppingListService.getByItemId(db, idOfItemToUpdate))
                    .then(item => {
                        expect(item).to.eql({
                            id: idOfItemToUpdate,
                            ...newItemDetails,
                        })
                    })

        })

        it(`deleteItem()`, () => {
            const idOfItemToDelete = 3
            return ShoppingListService.deleteItem(db, idOfItemToDelete)
                .then(() => ShoppingListService.getWholeList(db))
                .then(actual => {
                   const expected = testListItems.filter(item => item.id !== idOfItemToDelete)
                    expect(actual).to.eql(expected)
                })
        })
    })

    context(`Given 'shopping_list' has no data`, () => {
        it(`getWholeList() resolves an empty array`, () => {
            return ShoppingListService.getWholeList(db)
                .then(actual => {
                    expect(actual).to.eql([])
                })
        })

        it(`insertListItem()`, () => {
            const newListItem = {
                    name: 'New Test Item',
                    price: '4.44',
                    category: 'Breakfast',
                    checked: false,
                    date_added: new Date('2029-04-22T16:28:32.615Z'),
            }
            return ShoppingListService.insertListItem(db, newListItem)
                .then(actual => {
                    expect(actual).to.eql({
                        id: 1,
                        name: newListItem.name,
                        price: newListItem.price,
                        category: newListItem.category,
                        checked: newListItem.checked,
                        date_added: newListItem.date_added
                    })
                })
        })
    })
  })
// types
const types = {
    ADD_CART: 'shop/ADD_CART',
    CANCEL_CART: 'shop/CANCEL_CART'
}

// state
const state = {
    // list
    products: [
        {
            title: 'The Perfect Sandwich, A Real NYC Classic',
            image: 'http://www.w3schools.com/w3images/sandwich.jpg',
            inventory: 5,
            price: 155
        },
        {
            title: 'Let Me Tell You About This Steak',
            image: 'http://www.w3schools.com/w3images/steak.jpg',
            inventory: 1,
            price: 1380
        },
        {
            title: 'Cherries, interrupted',
            image: 'http://www.w3schools.com/w3images/cherries.jpg',
            inventory: 2,
            price: 499
        },
        {
            title: 'Once Again, Robust Wine and Vegetable Pasta',
            image: 'http://www.w3schools.com/w3images/wine.jpg',
            inventory: 3,
            price: 790
        }
    ],
    // cart
    shoppingCart: []
}

const getters = {
    // get list
    getProducts: state => state.products,
    // get cart
    getShoppingCart: state => state.shoppingCart,
    // get cart Total
    getShoppingCartTotal: state => state.shoppingCart.length,
    // cart price total
    getCartPriceTotal: state => {
        let priceTotal = 0

        for (let i in state.shoppingCart) {
            let item = state.shoppingCart[i]
            priceTotal += item.price
        }

        return priceTotal
    },
    // get recommed
    getRecommededProducts: state => {
        const inventoryList = state.products.filter(p => p.inventory > 0)
        const random = Math.round(Math.random() * (inventoryList.length - 1))

        return inventoryList[ random ]
    }
}

const actions = {
    addCart ({ commit }, id) {
        commit(types.ADD_CART, id)
    },
    cancelCart ({ commit }, id) {
        commit(types.CANCEL_CART, id)
    }
}

const mutations = {
    [types.ADD_CART] (state, id) {
        const products = state.products.find(
            item => item.title === id && item.inventory !== 0
        )

        // reduce inventory
        products.inventory = products.inventory - 1

        // push to cart
        state.shoppingCart.push({
            title: products.title,
            price: products.price
        })
    },
    [types.CANCEL_CART] (state, title) {
        // remove cart
        const cartIndex = state.shoppingCart.findIndex(item => item.title === title)
        state.shoppingCart.splice(cartIndex, 1)

        // inventory + 1
        const product = state.products.find(item => item.title === title)
        product.inventory += 1
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}


/*const image = 'https://placehold.it/200x200'
const cartImage = 'https://placehold.it/100x80'
const API_URL = 'https://raw.githubusercontent.com/Archtung/js-2-08_21.11/master/students/Dam%20Quang%20Tung/project/json'

class List {
    constructor(url, container) {
        this.container = container
        this.url = url
        this.items = []
        this._init()
    }
    _init() {
        return false
    }
    getJSON(url) {
        return fetch(url)
            .then(d => d.json())
    }
    handleData(arr) {
        arr.forEach(el => {
            this.items.push(new lists[this.constructor.name](el))
        })
    }
    _render(arr = this.items) {
        let el = document.querySelector(this.container)
        el.innerHTML = ''
        arr.forEach(product => {
            el.insertAdjacentHTML('beforeend', product.render())
        })
    }
}

class Catalog extends List {
    constructor(cart, url = `${API_URL}/catalogData.json`, container = '.products') {
        super(url, container)
        this.cart = cart
    }
    _init() {
        this.getJSON(this.url)
            .then(data => this.handleData(data))
            .then(() => this._render())
            .then(() => this._addEventListeners())
    }
    _addEventListeners() {
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.classList.contains('buy-btn')) {
                this._buyProduct(this._getProduct(+evt.target.dataset['id']));
            }
        })
        document.querySelector('.search-field').addEventListener('input', (evt) => {
            this.filter(evt.target.value)
        })
    }

    filter(searchText) {
        let filterArr = this.items.filter(prod => prod.product_name.search(new RegExp(searchText, 'i')) != -1)
        this._render(filterArr)
    }

    _getProduct(productId) {
        return this.items.find(prod => prod.id_product === productId)
    }

    _buyProduct(product) {
        this.cart.addCartItem(product)
    }
}

class Cart extends List {
    constructor(url = `${API_URL}/getBasket.json`, container = '.cart-block', btnContainer = '.btn-cart') {
        super(url, container)
        this.btnContainer = btnContainer
    }
    _init() {
        this.getJSON(this.url)
            .then(data => this.handleData(data.contents))
            .then(() => this._render())
            .then(() => this._addEventListeners())
    }

    _addEventListeners() {
        document.querySelector(this.btnContainer).addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible')
        })
        document.querySelector(this.container).addEventListener('click', (evt) => {
            if (evt.target.classList.contains('del-btn')) {
                this.removeCartItem(this._getCartItem(+evt.target.dataset['id']))
            }
        })
    }

    _getCartItem(cartId) {
        return this.items.find(cart => cart.id_product === cartId)
    }

    addCartItem(product) {
        this.getJSON(`${API_URL}/addToBasket.json`)
            .then(data => {
                if (data.result == 1) {
                    let find = this._getCartItem(product.id_product)
                    if (!find) {
                        this.items.push(new CartItem(product))
                    } else {
                        find.quantity++
                    }
                    this._render()
                }
            })
    }

    removeCartItem(product) {
        this.getJSON(`${API_URL}/deleteFromBasket.json`)
            .then(data => {
                if (data.result == 1) {
                    if (product.quantity === 1) {
                        this.items.splice(this.items.indexOf(product), 1)
                    } else {
                        product.quantity--
                    }
                    this._render()
                }
            })
    }
}

class Item {
    constructor(prod, img = image) {
        this.id_product = prod.id_product
        this.product_name = prod.product_name
        this.price = prod.price
        this.img = img
    }
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn" 
                        data-id="${this.id_product}"
                        data-name="${this.product_name}"
                        data-image="${this.img}"
                        data-price="${this.price}">Купить</button>
                    </div>
                </div>`
    }
}

class Product extends Item {}

class CartItem extends Item {
    constructor(prod, img = cartImage) {
        super(prod, img)
        this.quantity = prod.quantity ? prod.quantity : 1
    }
    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
                    <div class="product-bio">
                        <img src="${this.img}" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">${this.product_name}</p>
                            <p class="product-quantity">Quantity: ${this.quantity}</p>
                            <p class="product-single-price">$${this.price} each</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">${this.quantity * this.price}</p>
                        <button class="del-btn" data-id="${this.id_product}">&times;</button>
                    </div>
                </div>`
    }
}

let lists = {
    Catalog: Product,
    Cart: CartItem
}

let cart = new Cart()
let catalog = new Catalog(cart)*/




// class Post {
//     constructor(title) {
//         this.title = title;
//     }
// }
let app = new Vue({
    el: '#app',
    data: {
        url: 'https://raw.githubusercontent.com/Archtung/js-2-08_21.11/master/students/Dam%20Quang%20Tung/project/json/catalogData.json',
        catalog: [],
        isActiveBasket: false,
        basket: [],
        search: '',
        // postList: [
        //     new Post('AMD Ryzen 3'),
        //     new Post('Intel Core i3'),
        //     new Post('AMD Ryzen 5'),
        //     new Post('Intel Core i5'),
        //     new Post('AMD Ryzen 7'),
        //     new Post('Intel Core i7'),
        //     new Post('AMD Ryzen 9'),
        //     new Post('Intel Core i9 Coffee Lake R'),
        // ]

    },
    methods: {
        getJSON(url) {
            return fetch(url)
                .then(d => d.json());
        },
        toggleBasket() {
            this.isActiveBasket = !this.isActiveBasket;
        },
        content(id_product, product_name, price) {
            for (let item of this.basket) {
                if (item.id_product === id_product) {
                    return item.quantity++;
                }
            }
            return this.basket.push({
                id_product: id_product,
                product_name: product_name,
                price: price,
                img: 'https://placehold.it/100x80',
                quantity: 1
            });
        },
        deleteItemFromBasket(id_product) {
            for (let i = 0; i < this.basket.length; i++) {
                if (this.basket[i].id_product === id_product) {
                    this.basket[i].quantity--;
                    if (this.basket[i].quantity === 0) this.basket.splice(i, 1);
                }
            }
        }
    },
    computed: {
        // filteredList() {
        //     return this.postList.filter(post => {
        //         return post.title.toLowerCase().includes(this.search.toLowerCase())
        //     })
        // }
    },
    mounted() {
        this.getJSON(this.url)
            .then(data => { this.catalog = data });
    },
    created() {

    }
});
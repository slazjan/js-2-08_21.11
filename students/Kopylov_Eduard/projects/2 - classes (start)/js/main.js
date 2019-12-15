//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const MY_API = 'https://raw.githubusercontent.com/KPEKZ/DataBase/master/responses'


async function fetchRequest (url) {
    return fetch (url)
}


class List {
    constructor (url, container) {
        this.container = container
        this.url = url
        this.items = []
        //this.renderedItems = []
        this._init ()
    }
    _init () {
        return false
    }
    getJSON (url) {
        return fetch (url)
                .then (d => d.json ())
    }
    handleData (arr) {
        arr.forEach(el => {
            this.items.push (new lists [this.constructor.name] (el))
        })
    }
    _render () {
        let bl = document.querySelector (this.container)
        this.items.forEach (product => {
            bl.insertAdjacentHTML ('beforeend', product.render ())
        })
    }
}

class Catalog extends List {
    constructor (cart, url = MY_API + '/catalogData.json', container = '.products') {
        super (url, container)
        this.cart = cart
    }
    _init () {
        this.getJSON (this.url)
            .then (data => this.handleData (data))
            .then (() => this._render ())
    }
}

class Cart extends List {
    constructor (url = MY_API + '/getBasket.json', container = '.cart-block') {
        super (url, container)
    }
    _init () {
        this.getJSON (this.url)
            .then (data => {

                this.handleData (data)
            })
            .then (() => this._render ())
    }
    // всякие там картовские штуки
    removeProduct (product) {
        let productId = +product.dataset['id'];
        let find = this.items.find (element => element.id_product === productId);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.items.splice(this.items.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
        }
        this.render()
    }

    addProduct (product) {
        let productId = +product.dataset['id']; //data-id="1"
        let find = this.items.find (element => element.id_product === productId); //товар или false
        if (!find) {
            
            let cartItem = new CartItem({
                id_product: `${product.dataset["id"]}`,
                product_name: `${product.dataset["name"]}`,
                price: `${product.dataset["price"]}`,
              });
              cartItem.quantity = 1;
            this.items.push (new CartItem (cartItem))
          
        }  else {
            find.quantity++
        }
        this.render()
        }

    render()
    {
        let trg = document.querySelector ('.cart-block')
        let str = ''
        this.items.forEach ( cartprod => {
            str += cartprod.render ()
        })
        trg.innerHTML = str
    }
    
}

class Item {
    constructor (prod, img = image) {
        this.id_product = +prod.id_product
        this.product_name = prod.product_name
        this.price = prod.price
        this.img = img
    }
   
}

class Product extends Item {
    render () {
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

class CartItem extends Item {
    constructor (prod, img = cartImage) {
        super (prod, img)
        this.quantity = prod.quantity
    }
    render () {
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
    //Название класса списка: Класс соотв эл-та списка
}

let catalog = new Catalog ()
let cart = new Cart ()

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});
// //кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('del-btn')) {
       cart.removeProduct (evt.target);
    }
})
// //кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('buy-btn')) {
        cart.addProduct (evt.target);
    }
})





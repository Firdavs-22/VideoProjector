export default class Shop {
    init() {
        this.products = undefined;
        this.cart = undefined;
    }

    constructor(products, productDOM, cartDOM, totalDOM) {
        this.init()
        this.cart = new Cart(cartDOM, totalDOM)
        this.products = new Products(products, productDOM, this.cart)
        this.render()
    }

    render() {
        this.renderProducts();
        this.renderCart();
    }

    renderProducts() {
        this.products.render()
    }

    renderCart() {
        this.cart.render(this.products.products)
    }
}

class Products {
    init() {
        this.products = []
        this.DOM = undefined
    }

    constructor(products, DOM, Cart) {
        this.init()
        this.DOM = DOM
        for (let i = 0, len = products.length; i < len; i++) {
            this.products.push(new ProductItem(products[i], Cart));
        }
    }

    render() {
        for (let i = 0, len = this.products.length; i < len; i++) {
            this.DOM.append(this.products[i].card)
        }
    }
}

class ProductItem {
    init() {
        this.id = undefined
        this.name = undefined
        this.desc = undefined
        this.price = 0
        this.curr = undefined
        this.Cart = undefined
        this.img = undefined
        this.card = undefined
    }

    constructor(product, Cart) {
        this.init()
        this.id = product.id
        this.name = product.name
        this.desc = product.desc
        this.price = product.price
        this.curr = product.curr
        this.Cart = Cart
        this.img = this.id + '.' + product.imgFormat;
        this.card = this.createCard();
    }

    createElement(type, classAdd) {
        let elem = document.createElement(type)
        elem.classList.add(classAdd)
        return elem
    }

    createCard() {
        let card = this.createElement("div", "card")

        let card_img = this.createElement("img", "card-img")
        card_img.src = './../img/' + this.img
        card_img.alt = "image"
        card.appendChild(card_img)

        let card_content = this.createElement("div", "card-content")

        let card_title = this.createElement("div", "card-title")
        card_title.innerText = this.name
        card_content.appendChild(card_title)

        let card_desc = this.createElement("div", "card-desc")
        card_desc.innerText = this.desc
        card_content.appendChild(card_desc)

        card.appendChild(card_content)

        let card_footer = this.createElement("div", "card-footer")

        let card_price = this.createElement("div", "card-price")

        let card_price_value = this.createElement("div", "card-price-value")
        card_price_value.innerText = this.price
        card_price.appendChild(card_price_value)

        let card_price_curr = this.createElement("div", "card-price-curr")
        card_price_curr.innerText = this.curr
        card_price.appendChild(card_price_curr)

        card_footer.appendChild(card_price)

        let card_button = this.createElement("div", "card-button")
        card_button.innerText = "Add t  o Cart"
        card_button.addEventListener("click", (e) => this.buttonEvent())

        card_footer.appendChild(card_button)

        card.appendChild(card_footer)

        return card
    }

    buttonEvent() {
        this.Cart.addToCart(this)
    }
}

class Cart {
    init() {
        this.DOM = undefined
        this.products = []
        this.total = undefined
    }

    constructor(DOM, total) {
        this.init()
        this.DOM = DOM
        this.total = total
    }

    render(products) {
        let cart = this.getFromLocal()
        for (let i = 0,len = cart.length; i < len; i++) {
            for (let j = 0,p_len = products.length; j < p_len; j++) {
                if (products[j].id == cart[i].id){
                    this.addToCart(products[j],cart[i].count)
                    break
                }
            }
        }

    }

    getFromLocal() {
        let cart = localStorage.getItem("cart")
        if (cart === null) {
            localStorage.setItem("cart", "[]")
        }
        return JSON.parse(localStorage.getItem("cart"))
    }

    addToLocal() {
        let cart = [];
        for (let i = 0,len = this.products.length; i < len; i++) {
            cart.push({
                id: this.products[i].id,
                count: this.products[i].count
            })
        }
        localStorage.setItem("cart",JSON.stringify(cart))
    }

    removeProduct(id) {
        this.products = this.products.filter(product => product.id !== id)
        this.calculateTotal()
    }

    addToCart(product,count = 1) {
        if (this.hasProducts(product.id)) {
            this.find(product.id).addCount()
        } else {
            this.products.push(new CartItem(product, this))
            this.DOM.append(this.find(product.id).card)
            if (count != 1) {

                this.find(product.id).addCount(count-1)
            }
        }
        this.calculateTotal()
    }

    hasProducts(id) {
        let has = false
        if (this.find(id) != null)
            has = true
        return has
    }

    find(id) {
        for (let i = 0, len = this.products.length; i < len; i++) {
            if (id == this.products[i].id) {
                return this.products[i]
            }
        }
        return null
    }

    calculateTotal() {
        let total = 0
        for (let i = 0, len = this.products.length; i < len; i++) {
            total += parseFloat(this.products[i].total)
        }
        if (Number(total) === total && total % 1 !== 0) {
            total = parseFloat(total).toFixed(2)
        }
        this.total.childNodes[1].children[1].innerText = total
        this.addToLocal()
    }
}

class CartItem {
    init() {
        this.id = undefined
        this.name = undefined
        this.count = 0
        this.price = undefined
        this.curr = undefined
        this.img = undefined
        this.total = undefined
        this.card = undefined
        this.Cart = undefined
    }

    constructor(product, Cart) {
        this.init()
        this.id = product.id
        this.name = product.name
        this.addCount()
        this.price = product.price
        this.curr = product.curr
        this.img = product.img
        this.calculateTotal()
        this.card = this.createCard()
        this.Cart = Cart
        this.Cart.calculateTotal()

    }

    calculateTotal() {
        let total = this.count * this.price
        if (Number(this.price) === this.price && this.price % 1 !== 0) {
            this.total = parseFloat(total).toFixed(2)
        } else {
            this.total = total
        }
    }

    addCount(count = 1) {
        this.count += count
        if (this.count != 1) {
            this.countChange()
        }
    }

    subtractCount() {
        if (this.count != 1) {
            this.count--
            this.countChange()
        }
    }

    countChange() {
        this.calculateTotal()
        this.card.childNodes[1].childNodes[1].childNodes[1].childNodes[1].innerText = this.count
        this.card.childNodes[2].childNodes[0].childNodes[1].childNodes[0].innerText = this.total
        this.Cart.calculateTotal()
    }

    createElement(type, classAdd) {
        let elem = document.createElement(type)
        elem.classList.add(classAdd)
        return elem
    }

    createCard() {
        let card = this.createElement("div", "cart-card")

        let card_img = this.createElement("img", "cart-img")
        card_img.alt = "image"
        card_img.src = './../img/' + this.img
        card.appendChild(card_img)

        let card_content = this.createElement("div", "cart-content")

        let card_title = this.createElement("div", "cart-title")
        card_title.innerText = this.name
        card_content.appendChild(card_title)

        let card_main = this.createElement("div", "cart-main")

        let card_price = this.createElement("div", "cart-price")

        let card_price_value = this.createElement("div", "cart-price-value")
        card_price_value.innerText = this.price
        card_price.appendChild(card_price_value)

        let card_price_curr = this.createElement("div", "cart-price-curr")
        card_price_curr.innerText = this.curr
        card_price.appendChild(card_price_curr)

        card_main.appendChild(card_price)

        let card_counter = this.createElement("div", "cart-counter")

        let subtract = this.createElement("div", "subtract")
        subtract.addEventListener("click", () => {
            this.subtractCount()
        })

        let icon_minus = this.createElement("i", "fa-solid")
        icon_minus.classList.add("fa-minus")
        subtract.appendChild(icon_minus)

        card_counter.appendChild(subtract)

        let count = this.createElement("div", "count")
        count.innerText = this.count
        card_counter.appendChild(count)

        let append = this.createElement("div", "append")
        append.addEventListener("click", () => {
            this.addCount()
        })

        let icon_plus = this.createElement("i", "fa-solid")
        icon_plus.classList.add("fa-plus")
        append.appendChild(icon_plus)

        card_counter.appendChild(append)

        card_main.appendChild(card_counter)

        card_content.appendChild(card_main)

        card.appendChild(card_content)

        let card_aside = this.createElement("div", "cart-aside")

        let card_total = this.createElement("div", "cart-total")

        let card_total_title = this.createElement("div", "cart-total-title")
        card_total_title.innerText = "total"
        card_total.appendChild(card_total_title)

        let card_total_price = this.createElement("div", "cart-total-price")

        let total_value = this.createElement("div", "total-value")
        total_value.innerText = this.total
        card_total_price.appendChild(total_value)

        let total_curr = this.createElement("div", "total-curr")
        total_curr.innerText = this.curr
        card_total_price.appendChild(total_curr)

        card_total.appendChild(card_total_price)

        card_aside.appendChild(card_total)

        let card_remove = this.createElement("div", "cart-remove")

        let remove_button = this.createElement("div", "remove-button")
        remove_button.addEventListener("click", () => {
            this.removeProduct()
        })

        let icon_trash = this.createElement("i", "fa-solid")
        icon_trash.classList.add("fa-trash")

        remove_button.appendChild(icon_trash)

        card_remove.appendChild(remove_button)

        card_aside.appendChild(card_remove)

        card.appendChild(card_aside)

        return card
    }

    removeProduct() {
        this.removeCard()
        this.Cart.removeProduct(this.id)
    }

    removeCard() {
        this.card.remove()
    }
}
export default class Shop {
    init(){
        this.products = undefined;
        this.cart = undefined;
    }
    constructor(products,productDOM,cartDOM) {
        this.init()
        this.cart = new Cart(cartDOM)
        this.products = new Products(products,productDOM,this.cart);
        this.render()
    }

    render(){
        this.renderProducts();
        this.renderCart();
    }

    renderProducts(){
        this.products.render()
    }

    renderCart(){

    }
}

class Products {

    init(){
        this.products = []
        this.DOM = undefined
    }
    constructor(products,DOM,Cart) {
        this.init()
        this.DOM = DOM
        for (let i = 0,len = products.length; i < len; i++) {
            this.products.push(new ProductItem(products[i],Cart));
        }
    }

    render(){
        for (let i = 0,len = this.products.length; i < len; i++) {
            this.DOM.append(this.products[i].card)
        }
    }
}

class ProductItem {
    init(){
        this.id = undefined
        this.name = undefined
        this.desc = undefined
        this.price = 0
        this.curr = undefined
        this.Cart = undefined
        this.img = undefined
        this.card = undefined
    }
    constructor(product,Cart) {
        this.id = product.id
        this.name = product.name
        this.desc = product.desc
        this.price = product.price
        this.curr = product.curr
        this.Cart = Cart
        this.img = this.id+'.'+product.imgFormat;
        this.card = this.createCard();
    }

    createElement(type,classAdd) {
        let elem = document.createElement(type)
        elem.classList.add(classAdd)
        return elem
    }

    createCard(){
        let card = this.createElement("div","card")

        let card_img = this.createElement("img","card-img")
        card_img.src = './../img/'+this.img
        card_img.alt = "image"
        card.appendChild(card_img)

        let card_content = this.createElement("div","card-content")

        let card_title = this.createElement("div","card-title")
        card_title.innerText = this.name
        card_content.appendChild(card_title)

        let card_desc = this.createElement("div","card-desc")
        card_desc.innerText = this.desc
        card_content.appendChild(card_desc)

        card.appendChild(card_content)

        let card_footer = this.createElement("div","card-footer")

        let card_price = this.createElement("div","card-price")

        let card_price_value = this.createElement("div","card-price-value")
        card_price_value.innerText = this.price
        card_price.appendChild(card_price_value)

        let card_price_curr = this.createElement("div","card-price-curr")
        card_price_curr.innerText = this.curr
        card_price.appendChild(card_price_curr)

        card_footer.appendChild(card_price)

        let card_button = this.createElement("div","card-button")
        card_button.innerText = "Buy"
        card_button.addEventListener("click",(e) => this.buttonEvent())

        card_footer.appendChild(card_button)

        card.appendChild(card_footer)

        return card
    }

    buttonEvent(){
        this.Cart.addToCart(this)
    }
}

class Cart {
    init(){
        this.DOM = undefined
        this.products = undefined
    }
    constructor(DOM) {
        this.init()
        this.DOM = DOM
    }

    addToCart(product){
        console.log(product)
        // this.products
    }


}


class CartItem {
    init(){
        this.count = 0
    }
    constructor() {
    }
}


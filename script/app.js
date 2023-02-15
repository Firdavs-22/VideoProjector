import productJson from "./../data/product.json" assert {type :"json"}

class Shop {
    constructor(products,product_place,cart_place) {
        this.products = products;
        this.productLength = products.length
        this.product_place = product_place;
        this.cart_place = cart_place;
    }

    renderProduct(){
        let elem
        for (let product of this.products) {
            elem = this.createCard(
                product.id,
                product.name,
                product.desc,
                product.price,
                product.curr,
                product.imgFormat
            )
            this.product_place.appendChild(elem)
        }
    }

    createCard(id,title,desc,price,curr,img){
        let card = this.createElement("div","card")

        let card_img = this.createElement("img","card-img")
        card_img.src = `./../img/${id}.${img}`
        card_img.alt = "image"
        card.appendChild(card_img)

        let card_content = this.createElement("div","card-content")

        let card_title = this.createElement("div","card-title")
        card_title.innerText = title
        card_content.appendChild(card_title)

        let card_desc = this.createElement("div","card-desc")
        card_desc.innerText = desc
        card_content.appendChild(card_desc)

        card.appendChild(card_content)

        let card_footer = this.createElement("div","card-footer")

        let card_price = this.createElement("div","card-price")

        let card_price_value = this.createElement("div","card-price-value")
        card_price_value.innerText = price
        card_price.appendChild(card_price_value)

        let card_price_curr = this.createElement("div","card-price-curr")
        card_price_curr.innerText = curr
        card_price.appendChild(card_price_curr)

        card_footer.appendChild(card_price)

        let card_button = this.createElement("div","card-button")
        card_button.innerText = "Buy"
        card_button.dataset.id = id
        card_button.addEventListener("click",(e) => this.buttonEvent(e))

        card_footer.appendChild(card_button)

        card.appendChild(card_footer)

        return card
    }

    createElement(type,classAdd) {
        let elem = document.createElement(type)
        elem.classList.add(classAdd)
        return elem
    }
    buttonEvent(e){
        let button = e.target
        alert(button.dataset.id)
    }
}


let product = document.getElementById("product")
let cart = document.getElementById("cart-products")
const VideoProjector = new Shop(productJson,product,cart);
VideoProjector.renderProduct()
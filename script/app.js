import productJson from "./../data/product.json" assert {type :"json"}
import Shop from "./../script/shop.js"

const productDOM = document.getElementById("product")
const cartDOM = document.getElementById("cart-products")
const totalDOM = document.getElementById("total-card")
const buy = document.getElementById("buy");
const shop = new Shop(productJson,productDOM,cartDOM,totalDOM,buy);

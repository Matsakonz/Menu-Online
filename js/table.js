const products = document.querySelectorAll('.productinfo');
const cartItems = document.querySelector('.cart ul');
const cartTotal = document.querySelector('.cart p');
let total = 0;

const value = document.getElementById("table").getAttribute("data-value");
const Value = parseFloat(value);

const checkoutBtn = document.querySelector('.cart button');
let cartData = [];

products.forEach(product => {
	product.addEventListener('click', () => {
		const productInfo = product.parentElement;
		const productName = productInfo.querySelector('h2').textContent;
		const productPrice = productInfo.querySelector('p').textContent;
		
		const cartItem = { name: productName, price: productPrice, table: Value};
		cartData.push(cartItem);
		
		renderCart();
	});
});

function renderCart() {
	cartItems.innerHTML = '';
	let total = 0;

	cartData.forEach((item, index) => {
		const cartItem = document.createElement('li');
		cartItem.innerHTML = `${item.name} - ${item.price} <button class="remove" data-index="${index}">X</button>`;
		cartItems.appendChild(cartItem);
		
		const price = Number(item.price.replace('Price: ฿', ''));
		total += price;
	});

	cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

cartItems.addEventListener('click', event => {
	if (event.target.classList.contains('remove')) {
		const index = event.target.dataset.index;
		cartData.splice(index, 1);
		renderCart();
	}
});

checkoutBtn.addEventListener('click', () => {
	cartData.forEach(orderdata => {
		fetch('http://localhost:3000/checkout/', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(orderdata)
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Failed to checkout');
			}
		})
		.catch(error => alert(error.message));
	})
	alert('Thank you for your order!');
	cartData = [];
	renderCart();
});

// product click
document.getElementById('product').addEventListener("click", activate);
document.getElementById('overlay').addEventListener("click", unactivate);
document.getElementById('close').addEventListener("click", unactivate);
document.getElementById('addcart').addEventListener("click", unactivate);

function activate() {
	document.querySelector('.product').classList.add('activate');
	document.querySelector('.close-btn').classList.add('activate');
	document.querySelector('.overlay').classList.add('activate');
}

function unactivate() {
	document.querySelector('.product').classList.remove('activate');
	document.querySelector('.close-btn').classList.remove('activate');
	document.querySelector('.overlay').classList.remove('activate');
}

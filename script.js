const products = document.querySelectorAll('.product button');
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

products.forEach(product => {
	product.addEventListener('click', () => {
		const productInfo = product.parentElement;
		const productName = productInfo.querySelector('h2').textContent;
		const productPrice = productInfo.querySelector('p').textContent;
		
		const cartItem = document.createElement('li');
		cartItem.textContent = `${productName} - ${productPrice}`;
		
		const price = Number(productPrice.replace('Price: ฿', ''));
		
		total += price;
		cartTotal.textContent = `Total: ฿${total.toFixed(2)}`;
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


  
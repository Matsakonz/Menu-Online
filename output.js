const dataContainer = document.getElementById('data');
const t1 = document.getElementById('1');
const t2 = document.getElementById('2');
const t3 = document.getElementById('3');
const t4 = document.getElementById('4');
const t5 = document.getElementById('5');

fetch('http://localhost:3000/checkout/')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        return response.json();
    })
    .then(data => {
        data.forEach(item => {
            if (item.table == 1) {
                document.getElementById("1").style.display = "block";

                const product = document.createElement('div');
                product.classList.add('product');
                product.setAttribute('data-id', item.id);

                const heading = document.createElement('h2');
                heading.textContent = item.name;
                product.appendChild(heading);

                const price = document.createElement('p');
                price.textContent = `${item.price}`;
                product.appendChild(price);

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'x';
                deleteBtn.addEventListener('click', () => {
                    deleteItem(item.id);
                });
                product.appendChild(deleteBtn);
                
                t1.insertBefore(product, t1.children[1]);
            } else if (item.table == 2) {
                document.getElementById("2").style.display = "block";

                const product = document.createElement('div');
                product.classList.add('product');
                product.setAttribute('data-id', item.id);

                const heading = document.createElement('h2');
                heading.textContent = item.name;
                product.appendChild(heading);

                const price = document.createElement('p');
                price.textContent = `${item.price}`;
                product.appendChild(price);

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'x';
                deleteBtn.addEventListener('click', () => {
                    deleteItem(item.id);
                });
                product.appendChild(deleteBtn);
                
                t2.insertBefore(product, t2.children[1]);
            } else if (item.table == 3) {
                document.getElementById("3").style.display = "block";

                const product = document.createElement('div');
                product.classList.add('product');
                product.setAttribute('data-id', item.id);

                const heading = document.createElement('h2');
                heading.textContent = item.name;
                product.appendChild(heading);

                const price = document.createElement('p');
                price.textContent = `${item.price}`;
                product.appendChild(price);

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'x';
                deleteBtn.addEventListener('click', () => {
                    deleteItem(item.id);
                });
                product.appendChild(deleteBtn);
                
                t3.insertBefore(product, t3.children[1]);
            } else if (item.table == 4) {
                document.getElementById("4").style.display = "block";

                const product = document.createElement('div');
                product.classList.add('product');
                product.setAttribute('data-id', item.id);

                const heading = document.createElement('h2');
                heading.textContent = item.name;
                product.appendChild(heading);

                const price = document.createElement('p');
                price.textContent = `${item.price}`;
                product.appendChild(price);

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'x';
                deleteBtn.addEventListener('click', () => {
                    deleteItem(item.id);
                });
                product.appendChild(deleteBtn);
                
                t4.insertBefore(product, t4.children[1]);
            } else if (item.table == 5) {
                document.getElementById("5").style.display = "block";

                const product = document.createElement('div');
                product.classList.add('product');
                product.setAttribute('data-id', item.id);

                const heading = document.createElement('h2');
                heading.textContent = item.name;
                product.appendChild(heading);

                const price = document.createElement('p');
                price.textContent = `${item.price}`;
                product.appendChild(price);

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'x';
                deleteBtn.addEventListener('click', () => {
                    deleteItem(item.id);
                });
                product.appendChild(deleteBtn);
                
                t5.insertBefore(product, t5.children[1]);
            }
            
        });
    })
    .catch(error => alert(error.message));

function deleteItem(id) {
    fetch(`http://localhost:3000/checkout/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete item');
        }

        const card = dataContainer.querySelector(`[data-id="${id}"]`);
        card.remove();
    })
    .catch(error => alert(error.message));
}

function deleteAllItems(t) {
    fetch('http://localhost:3000/checkout/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        return response.json();
      })
      .then(data => {
        const idsToDelete = data
          .filter(item => item.table === t)
          .map(item => item.id);
  
        return Promise.all(idsToDelete.map(id => {
          return fetch(`http://localhost:3000/checkout/${id}`, {
            method: 'DELETE'
          });
        }));
      })
      .then(() => {
        alert('CheckBill Successfully');
        window.location.reload();
      })
      .catch(error => alert(error.message));
  }
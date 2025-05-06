document.addEventListener('DOMContentLoaded', function() {
    const cart = []; // Массив для хранения товаров в корзине
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button'); // Изменили селектор

    // Функция для обновления отображения корзины
    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.price} руб.`;

            const removeButton = document.createElement('span');
            removeButton.classList.add('remove-item');
            removeButton.textContent = 'Удалить';
            removeButton.dataset.id = item.id; // Сохраняем ID товара для удаления
            removeButton.addEventListener('click', removeItem); // Добавляем обработчик удаления

            li.appendChild(removeButton);
            cartItemsElement.appendChild(li);

            total += item.price;
        });

        cartTotalElement.textContent = total;
    }

    // Функция для добавления товара в корзину
    function addItem(event) {
        const button = event.target;
        const card = button.closest('.course__card'); // Находим родительский элемент .course__card
        const id = card.dataset.courseId;
        const name = card.dataset.courseName;
        const price = parseInt(card.dataset.coursePrice);

        cart.push({ id, name, price }); // Добавляем товар в массив корзины
        updateCart(); // Обновляем отображение корзины
    }

    // Функция для удаления товара из корзины
    function removeItem(event) {
        const idToRemove = event.target.dataset.id; // Получаем ID товара для удаления
        // Фильтруем массив cart, оставляя только те товары, у которых ID не совпадает с ID для удаления
        const indexToRemove = cart.findIndex(item => item.id === idToRemove);
        if (indexToRemove !== -1) {
            cart.splice(indexToRemove, 1);
        }
        updateCart(); // Обновляем отображение корзины
    }

    // Добавляем обработчики на кнопки "Добавить в корзину"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addItem);
    });

    // Инициализируем отображение корзины
    updateCart();

    
    const checkoutButton = document.getElementById('checkout-button');

    checkoutButton.addEventListener('click', () => {
        window.location.href = 'payment.html'; // Переход к оплате
    });

    
});


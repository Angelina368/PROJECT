document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    const paymentOverlay = document.getElementById('payment-overlay');
    const closePaymentForm = document.getElementById('close-payment-form');
    const paymentForm = document.getElementById('payment-form');
    const amountInput = document.getElementById('amount');

    let cart = [];

    // Функция для обновления отображения корзины
    function updateCartDisplay() {
        cartItemsList.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - ${item.price} руб.`;
            cartItemsList.appendChild(listItem);
            total += item.price;
        });

        cartTotalElement.textContent = total;
        amountInput.value = total; // Устанавливаем сумму в поле "Сумма к оплате"
    }

    // Обработчик добавления в корзину
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.course__card');
            const courseId = card.dataset.courseId;
            const courseName = card.dataset.courseName;
            const coursePrice = parseFloat(card.dataset.coursePrice); // Преобразуем в число

            // Добавляем товар в корзину
            cart.push({
                id: courseId,
                name: courseName,
                price: coursePrice
            });

            updateCartDisplay();
        });
    });

    // Обработчик кнопки "Перейти к оплате"
    checkoutButton.addEventListener('click', function() {
        paymentOverlay.style.display = 'flex'; // Делаем окно видимым
    });

    // Обработчик закрытия окна оплаты
    closePaymentForm.addEventListener('click', function() {
        paymentOverlay.style.display = 'none'; // Скрываем окно
    });

    // Обработчик отправки формы оплаты (только для примера)
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем отправку формы

        // Здесь можно добавить код для отправки данных на сервер
        alert('Оплата успешно проведена на сумму: ' + amountInput.value + ' руб.');

        // Очищаем корзину
        cart = [];
        updateCartDisplay();

        paymentOverlay.style.display = 'none'; // Скрываем окно
    });
});
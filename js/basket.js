document.addEventListener('DOMContentLoaded', () => {
// --- Глобальные переменные ---
const cartItemsContainer = document.getElementById('cart-items');  //  Исправлено:  Находим контейнер для элементов корзины
const cartTotalDisplay = document.getElementById('cart-total');
let cart = []; // Массив для хранения товаров в корзине

// --- Функции для работы с корзиной ---

// 1. Добавление товара в корзину
function addToCart(courseId, courseName, coursePrice) {
    // Проверяем, есть ли товар уже в корзине
    const existingItemIndex = cart.findIndex(item => item.courseId === courseId);

    if (existingItemIndex !== -1) {
        // Если товар есть, увеличиваем количество
        cart[existingItemIndex].quantity++;
    } else {
        // Иначе добавляем новый товар
        cart.push({
            courseId: courseId,
            courseName: courseName,
            coursePrice: coursePrice,
            quantity: 1
        });
    }
    updateCartDisplay();
    saveCart(); // Сохраняем корзину в localStorage
}

// 2. Удаление товара из корзины
function removeFromCart(courseId) {
    cart = cart.filter(item => item.courseId !== courseId); // Удаляем товар из массива
    updateCartDisplay();
    saveCart();
}

// 3. Изменение количества товара
function changeQuantity(courseId, change) {
    const itemIndex = cart.findIndex(item => item.courseId === courseId);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity < 1) {
            // Если количество меньше 1, удаляем товар
            removeFromCart(courseId);
        } else {
            updateCartDisplay();
            saveCart();
        }
    }
}

// 4. Расчет общей суммы
function calculateTotal() {
    let total = 0;
    cart.forEach(item => {
        total += item.coursePrice * item.quantity;
    });
    return total;
}

// 5. Отображение корзины (обновление HTML)
function updateCartDisplay() {
    if (!cartItemsContainer || !cartTotalDisplay) {
        console.error("Не найден элемент для отображения корзины.");
        return; //  Прерываем, если контейнеры не найдены.
    }

    // Очищаем содержимое корзины
    cartItemsContainer.innerHTML = '';

    // Отображаем товары в корзине
    cart.forEach(item => {
        const cartItemElement = document.createElement('li');
        cartItemElement.classList.add('cart-item');
        cartItemElement.dataset.courseId = item.courseId; // Добавляем data-атрибут для идентификации товара

        cartItemElement.innerHTML = `
            <span class="item-name">${item.courseName}</span>
            <span class="item-price">${item.coursePrice} руб.</span>
            <div class="item-quantity">
                <button class="decrease-quantity" data-course-id="${item.courseId}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="increase-quantity" data-course-id="${item.courseId}">+</button>
                <button class="remove-from-cart" data-course-id="${item.courseId}">Удалить</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Отображаем общую сумму
    const total = calculateTotal();
    cartTotalDisplay.textContent = total.toFixed(2);

    // Регистрируем обработчики событий (после обновления содержимого корзины)
    registerCartItemEventHandlers();
}

// 6.  Сохранение корзины в localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// 7.  Загрузка корзины из localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    cart = savedCart ? JSON.parse(savedCart) : []; //  Парсим JSON или создаем пустой массив
    updateCartDisplay();  // Отображаем загруженную корзину
}

// 8.  Регистрация обработчиков событий для элементов корзины
function registerCartItemEventHandlers() {
    // Кнопки "+"
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const courseId = this.dataset.courseId;
            changeQuantity(courseId, 1);
        });
    });

    // Кнопки "-"
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const courseId = this.dataset.courseId;
            changeQuantity(courseId, -1);
        });
    });

    // Кнопки "Удалить"
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', function() {
            const courseId = this.dataset.courseId;
            removeFromCart(courseId);
        });
    });
}

// --- Инициализация и обработчики событий для добавления товара ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Загружаем корзину из localStorage
    loadCart();

    // 2. Обработчики для кнопок "Добавить в корзину"
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', function() {
            const courseCard = this.closest('.course__card');
            if (courseCard) {
                const courseId = courseCard.dataset.courseId;
                const courseName = courseCard.dataset.courseName;
                const coursePrice = parseFloat(courseCard.dataset.coursePrice); // Преобразуем в число
                addToCart(courseId, courseName, coursePrice);
            }
        });
    });
  });
});
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const orderItemsElement = document.getElementById("order-items");
    const totalAmountElement = document.getElementById("total-amount");
    const payButton = document.getElementById("pay-button");

    function displayOrderSummary() {
        const cart = getCart();
        let total = 0;
        let orderItemsHTML = "";

        if (cart.length === 0) {
            orderItemsElement.innerHTML = "<p>В вашей корзине ничего нет.</p>";
            totalAmountElement.textContent = "Итого: 0 руб.";
            return;
        }

        for (const item of cart) {
            orderItemsHTML += `<li>${item.courseName} - ${item.coursePrice} руб.</li>`;
            total += Number(item.coursePrice) * item.quantity;
        }

        orderItemsElement.innerHTML = orderItemsHTML;
        totalAmountElement.textContent = `Итого: ${total} руб.`;
    }

    displayOrderSummary();

    payButton.addEventListener("click", () => {
        // Сбор данных из формы
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const cardNumber = document.getElementById("card-number").value;
        const expiryDate = document.getElementById("expiry-date").value;
        const cvv = document.getElementById("cvv").value;

        // Валидация (простая, для примера)
        if (!name || !email || !cardNumber || !expiryDate || !cvv) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        // Отправка данных на сервер 
        // ...

        // Очистка корзины после успешной (как бы) оплаты
        localStorage.removeItem("cart");
        displayOrderSummary(); 
        alert("Оплата прошла успешно!");

       
    });
    
});
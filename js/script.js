"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Настройки темы и шрифта (перенесены вверх, чтобы быть доступными везде)
    const themeSelect = document.getElementById('theme-select');
    const fontSelect = document.getElementById('font-select');

    // Функция для применения темы
    function applyTheme(theme) {
        document.body.classList.toggle('dark', theme === 'dark');
    }

    // Функция для применения шрифта
    function applyFont(font) {
        document.body.className = font === 'default' ? '' : font;
    }

    // Применяем сохраненные настройки при загрузке страницы
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        themeSelect.value = savedTheme;
        applyTheme(savedTheme);
    }

    const savedFont = localStorage.getItem('font');
    if (savedFont) {
        fontSelect.value = savedFont;
        applyFont(savedFont);
    }
    //всплывающее окно настроеек
    const settingsButton = document.getElementById('settings-button');
    const settingsOverlay = document.getElementById('settings-overlay');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsButton = document.getElementById('close-settings');

    // Функция для показа модального окна и затемнения фона
    function showSettings() {
        settingsOverlay.style.display = 'block';
        settingsModal.style.display = 'block';
    }

    // Функция для скрытия модального окна и снятия затемнения
    function hideSettings() {
        settingsOverlay.style.display = 'none';
        settingsModal.style.display = 'none';
    }

    // Обработчик клика по кнопке настроек
    settingsButton.addEventListener('click', showSettings);

    // Обработчик клика по кнопке закрытия настроек
    closeSettingsButton.addEventListener('click', hideSettings);

    // Закрытие при клике вне модального окна (опционально)
    settingsOverlay.addEventListener('click', (event) => {
        if (event.target === settingsOverlay) {
            hideSettings();
        }
    });


    //смена формы регистрации или войти
    function switchToRegister() {
        document.getElementById('login').style.display = 'none';
        document.getElementById('register').style.display = 'block';
    }

    function switchToLogin() {
        document.getElementById('register').style.display = 'none';
        document.getElementById('login').style.display = 'block';
    }

    const closeButton = document.getElementById('settings-close-button');



    // Прослушиватели событий для открытия/закрытия 
    if (settingsButton) {
        settingsButton.addEventListener('click', showSettings);
    }

    if (closeButton) {
        closeButton.addEventListener('click', hideSettings);
    }

    if (settingsOverlay) {
        settingsOverlay.addEventListener('click', (event) => {
            if (event.target === settingsOverlay) { // Close on overlay click
                hideSettings();
            }
        });
    }


    // Выбор темы
    if (themeSelect) {
        themeSelect.addEventListener('change', () => {
            const selectedTheme = themeSelect.value;
            applyTheme(selectedTheme);
            // Сохраните их в локальном хранилище
            localStorage.setItem('theme', selectedTheme);
        });
    }

    // Выбор шрифта
    if (fontSelect) {
        fontSelect.addEventListener('change', () => {
            const selectedFont = fontSelect.value;
            applyFont(selectedFont);
            // Сохраните шрифт в локальном хранилище
            localStorage.setItem('font', selectedFont);
        });
    }

    // Закрыть клавишей Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            hideSettings();
        }
    });


    //  Получение ID преподавателя из URL(если он есть)
    const urlParams = new URLSearchParams(window.location.search);
    const teacherId = urlParams.get('id');

    //  Получение элементов DOM
    const teacherNameElement = document.getElementById("teacher-name");
    const teacherDetailsElement = document.getElementById("teacher-details");
    const reviewGrid = document.querySelector(".review__grid");
    const reviewForm = document.getElementById("review-form");

    //  Функция для отображения отзывов
    const displayReviews = (reviews) => {
        reviewGrid.innerHTML = '';

        if (reviews && reviews.length > 0) {
            reviews.forEach(review => {
                const reviewCard = document.createElement('div');
                reviewCard.classList.add('review__card');
                reviewCard.innerHTML = `<p>${review}</p>`;
                reviewGrid.appendChild(reviewCard);
            });
        } else {
            const noReviewsMessage = document.createElement('p');
            noReviewsMessage.textContent = 'Отзывов пока нет.';
            reviewGrid.appendChild(noReviewsMessage);
        }
    };

    //  Данные о преподавателях  (отзывы)
    const teachersData = {
        "1": {
            name: "Куршакова Юлия",
            details: "Преподаватель по курсам дизайн интерьера, декоратор интерьера",
            reviews: [
                "🌟 Отзыв от Ксении: Я прошла курс декорирования интерьера и осталась в полном восторге! Преподаватель всегда был готов помочь и ответить на все вопросы.",
                "🌟 Отзыв от Михаила: Я был приятно удивлён качеством обучения на курсах. Преподаватель делился актуальными трендами и советами.",
            ]
        },
        "2": {
            name: "Иванов Даниил",
            details: "Преподаватель по курсам дизайн жилых и коммерческих помещений, дизайн среды",
            reviews: [
                "🌟 Отзыв от Алексея: Курс по дизайну жилых и коммерческих помещений превзошел все мои ожидания! Преподаватель делился не только теоретическими знаниями, но и практическими примерами из своего опыта.",
                "🌟 Отзыв от Романа: Курс по дизайну среды был настоящим открытием для меня. Преподаватель делился актуальными трендами и навыками, которые я смогла сразу применить на практике.",
            ]
        },
        "3": {
            name: "Нехорошков Данила",
            details: "Преподаватель по курсам декорирование в дизайне интерьера, 3D-визуализатор",
            reviews: [
                "🌟 Отзыв от Алевтины: Курсы по декорированию в дизайне интерьера были невероятно полезными! Преподаватель вдохновляет на творчество и помогает каждому студенту раскрыть свой потенциал.",
                "🌟 Отзыв от Евгении: Я прошла курс 3D-визуализации и осталась в полном восторге! Преподаватель объясняет сложные вещи простым языком и всегда готов помочь.",
            ]
        },
        "4": {
            name: "Молотова Анна",
            details: "Преподаватель по курсам дизайнер мебели, текстильный декоратор, веб-дизайнер",
            reviews: [
                "🌟 Отзыв от Алевтины: Курс по дизайну мебели стал для меня настоящим открытием! Преподаватель делится уникальными методами и подходами к созданию функциональной и стильной мебели.",
                "🌟 Отзыв от Евгении: Я прошла курс 3D-визуализации и осталась в полном восторге! Преподаватель объясняет сложные вещи простым языком и всегда готов помочь.",
            ]
        },
    };

    // Загрузка данных о преподавателе (при загрузке страницы)
    if (teacherId && teachersData[teacherId]) {
        const teacher = teachersData[teacherId];

        teacherNameElement.textContent = teacher.name;
        teacherDetailsElement.textContent = teacher.details;

        displayReviews(teacher.reviews);
    } else {
        // Если ID преподавателя не найден
        teacherNameElement.textContent = "Преподаватель не найден";
        teacherDetailsElement.textContent = "К сожалению, этого преподавателя не существует.";
    }

    reviewForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const reviewText = document.getElementById('review-text').value;

        if (reviewText.trim() !== '') {


            teachersData[teacherId].reviews.push(reviewText);

            displayReviews(teachersData[teacherId].reviews);
            document.getElementById('review-text').value = '';
        } else {
            alert('Пожалуйста, введите текст отзыва.');
        }
    });
    //функциональность добавления курсов в корзину, отображения корзины и перехода к оплате
    const addToCartButtons = document.querySelectorAll(".add-to-cart-button");
    const goToPaymentButton = document.getElementById("go-to-payment-button");
    const cartList = document.getElementById("cart-list");
    const totalPriceElement = document.getElementById("total-price");
    const payButton = document.getElementById("pay-button");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const saveCart = () => {
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    const displayCart = () => {
        cartList.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.courseName} - ${item.coursePrice} руб. (Кол-во: ${item.quantity})`;
            cartList.appendChild(listItem);
            total += Number(item.coursePrice) * item.quantity;
        });

        totalPriceElement.textContent = `Общая стоимость: ${total} руб.`;
    };

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const courseCard = button.closest(".course__card");
            const courseId = courseCard.dataset.courseId;
            const courseName = courseCard.dataset.courseName;
            const coursePrice = courseCard.dataset.coursePrice;

            const existingCourse = cart.find(item => item.courseId === courseId);

            if (!existingCourse) {
                cart.push({ courseId: courseId, courseName: courseName, coursePrice: coursePrice, quantity: 1 });
            } else {
                existingCourse.quantity++;
            }

            saveCart();
            console.log(`Курс с ID ${courseId} добавлен в корзину.`);
            displayCart();
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.card__list');
  const cardItems = document.querySelectorAll('.card__item');
  const cardListContainer = document.querySelector('.card__list-container');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');

  if (!slider || !cardItems || cardItems.length === 0 || !cardListContainer || !prevButton || !nextButton) {
      console.error('Не найдены элементы слайдера!');
      return;
  }

  let currentIndex = 0;
  const totalCards = cardItems.length;
  let cardWidth = cardListContainer.offsetWidth;

  // Функция обновления положения слайдера
  function updateSlider() {
      const translateX = -currentIndex * cardWidth;
      slider.style.transform = `translateX(${translateX}px)`;
  }

  // Функция перехода к следующему слайду
  function nextSlide() {
      currentIndex = (currentIndex + 1) % totalCards;
      updateSlider();
  }

  // Функция перехода к предыдущему слайду
  function prevSlide() {
      currentIndex = (currentIndex - 1 + totalCards) % totalCards;
      updateSlider();
  }

  // Обработчики кликов на кнопки
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);

  // Обработчик события resize
  window.addEventListener('resize', () => {
      cardWidth = cardListContainer.offsetWidth;
      updateSlider();
  });

  // Начальная установка слайдера
  updateSlider();
});
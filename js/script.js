"use strict";

document.addEventListener('DOMContentLoaded', () => {
   
    const settingsButton = document.getElementById('settings-button');
    const settingsOverlay = document.getElementById('settings-overlay');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsButton = document.getElementById('close-settings');
    const themeSelect = document.getElementById('theme-select');
    const body = document.body;

    // Функция для открытия модального окна
    function openSettings() {
        settingsOverlay.classList.add('active');
        settingsModal.classList.add('active');
    }

    // Функция для закрытия модального окна
    function closeSettings() {
        settingsOverlay.classList.remove('active');
        settingsModal.classList.remove('active');
    }

    // Функция для установки темы
    function setTheme(themeName) {
        if (themeName === 'dark') {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }
        localStorage.setItem('theme', themeName);
    }

    // При загрузке страницы проверяем, есть ли сохраненная тема
    let savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
        themeSelect.value = savedTheme;  // Устанавливаем выбранное значение в select
    } else {
        savedTheme = 'light';  // Светлая тема по умолчанию
        setTheme(savedTheme);
        themeSelect.value = savedTheme;  // Устанавливаем выбранное значение в select
    }

    // Обработчики событий
    settingsButton.addEventListener('click', openSettings);
    closeSettingsButton.addEventListener('click', closeSettings);
    themeSelect.addEventListener('change', function() {
        setTheme(this.value);
    

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
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');

    if (!registerForm) {
        console.error("Форма регистрации не найдена!");
        return;
    }

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;

        if (!name || !email || !password || !confirmPassword) {
            alert("Пожалуйста, заполните все поля!");
            return;
        }

        if (!isValidEmail(email)) {
            alert("Пожалуйста, введите корректный email!");
            return;
        }

        if (password.length < 8) {
            alert("Пароль должен содержать не менее 8 символов!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Пароли не совпадают!");
            return;
        }

        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (users.find(user => user.email === email)) {
            alert("Пользователь с таким email уже зарегистрирован!");
            return;
        }

        const newUser = {
            name: name,
            email: email,
            password: password
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert("Регистрация прошла успешно! Вы будете перенаправлены в личный кабинет.");
        window.location.href = 'cabinet.html'; // Перенаправление в личный кабинет
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    if (!loginForm) {
        console.error("Форма входа не найдена!");
        return;
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert("Пожалуйста, заполните все поля!");
            return;
        }

        // Проверка учетных данных в localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert("Вход выполнен успешно!");
            window.location.href = 'cabinet.html'; // Перенаправление в личный кабинет
        } else {
            alert("Неправильный email или пароль!");
        }
    });
});





document.addEventListener('DOMContentLoaded', () => {
  const userNameElement = document.getElementById('userName');
  const cabinetContentElement = document.getElementById('cabinetContent');

  // Функция для получения имени пользователя из localStorage
  function getUsername() {
    return localStorage.getItem('username');
  }

  // Функция для проверки, авторизован ли пользователь (например, по наличию токена в localStorage)
  function isLoggedIn() {
    //Здесь нужно реализовать вашу логику проверки, авторизован ли пользователь.
    //Например, проверка наличия токена:
    return localStorage.getItem('authToken') !== null; //предполагаем, что токен хранится в localStorage под ключом 'authToken'
  }

  // Функция для отображения контента личного кабинета
  function showCabinetContent() {
    cabinetContentElement.style.display = 'block'; // Показываем блок личного кабинета
  }

  // Функция для скрытия контента личного кабинета
  function hideCabinetContent() {
    cabinetContentElement.style.display = 'none'; // Скрываем блок личного кабинета
  }


  // При загрузке страницы:
 //const username = getUsername();
  if (username) {
    userNameElement.textContent = username; // Отображаем имя пользователя
  }

  if (isLoggedIn()) {
    showCabinetContent(); // Отображаем контент личного кабинета, если пользователь авторизован
  } else {
    hideCabinetContent(); // Скрываем контент личного кабинета, если пользователь не авторизован
    // Дополнительно, можно перенаправить пользователя на страницу входа
    // window.location.href = 'login.html'; // Перенаправляем на страницу входа
  }


  // Пример кода регистрации (предполагается, что у вас есть форма регистрации)
  // Этот код нужно адаптировать под вашу реализацию регистрации
  // Здесь только логика сохранения имени
  // document.getElementById('registrationForm').addEventListener('submit', (event) => {
   event.preventDefault(); // Предотвращаем отправку формы по умолчанию

  const newUsername = document.getElementById('usernameInput').value; // Получаем введенное имя пользователя
   localStorage.setItem('username', newUsername); // Сохраняем имя в localStorage
   userNameElement.textContent = newUsername; // Отображаем имя пользователя сразу после регистрации

  //   // Здесь добавьте остальную логику регистрации (отправка данных на сервер, создание токена и т.д.)
  // });

    // Пример кода авторизации (предполагается, что у вас есть форма авторизации)
    // Этот код нужно адаптировать под вашу реализацию авторизации
    // Здесь только логика сохранения токена и отображения кабинета
    // document.getElementById('loginForm').addEventListener('submit', (event) => {
   event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    //   //Здесь нужно реализовать вашу логику авторизации (отправка данных на сервер, получение токена и т.д.)

 //   //После успешной авторизации:
    localStorage.setItem('authToken', 'YOUR_AUTH_TOKEN'); // Сохраняем токен в localStorage
    showCabinetContent(); // Отображаем контент личного кабинета
    //const username = getUsername();
    if (username) {
    userNameElement.textContent = username; // Отображаем имя пользователя
   }
    // });


  // Пример кода выхода из аккаунта
  // document.getElementById('logoutButton').addEventListener('click', () => {
 localStorage.removeItem('authToken'); // Удаляем токен из localStorage
 hideCabinetContent(); // Скрываем контент личного кабинета
 window.location.href = 'index.html'; // Перенаправляем на главную страницу или страницу входа
  // });


  //Добавляем код для userCourse. Здесь нужно реализовать получение данных о курсе с сервера.
  const userCourseElement = document.getElementById('userCourse');

    function getUserCourse() {
      // Здесь нужно реализовать запрос к серверу для получения информации о курсе пользователя
      // и возвратить эту информацию.  Для простоты примера, оставим заглушку.
    return "Дизайн интерьера для начинающих";
  }

  if (isLoggedIn()) {
      const userCourse = getUserCourse();
      userCourseElement.textContent = userCourse;
  }

  //Добавляем код для userPhoto. Здесь нужно реализовать получение URL изображения с сервера.
  const userPhotoElement = document.getElementById('userPhoto');

  function getUserPhotoUrl() {
      // Здесь нужно реализовать запрос к серверу для получения URL изображения пользователя
      // и возвратить этот URL. Для простоты примера, оставим заглушку.
    return "images/default_user.png";
  }

  if (isLoggedIn()) {
      const userPhotoUrl = getUserPhotoUrl();
      userPhotoElement.src = userPhotoUrl;
  }
});

document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы
    const preloader = document.getElementById('preloader');
    const pageContent = document.getElementById('page-content');

    // Функция для скрытия предзагрузчика и отображения контента
    function hidePreloader() {
        preloader.style.display = 'none';
        pageContent.style.display = 'block'; // Отображаем контент
    }

    // Задержка перед скрытием предзагрузчика (опционально)
    setTimeout(hidePreloader, 1000); // 1 секунда

    // Добавляем остальной код JavaScript (динамическое меню, карточки, слайдер и т.д.)
});

var swiper = new Swiper(".mySwiper", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    
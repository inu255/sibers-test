fetch('http://demo.sibers.com/users') // получаем json  с сервера
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
    listItem.setAttribute('data-userid', id);

    document.querySelector('#dynamicList').append(listItem);

  }

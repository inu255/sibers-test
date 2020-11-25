import {createPopup} from './popup-show.js';

fetch('https://demo.sibers.com/users')
  .then(response => response.json())
  .then(json => {
    // console.log(json);
    // localStorage.clear();
    document.querySelector('#contactsNumber').innerHTML = json.length;
    for (let i = 0; i < json.length; i++) {
      // задаём приоритет у локально изменённых данных контакта
      if (!localStorage.getItem('User' + i)) {
        localStorage.setItem('User' + i, JSON.stringify(json[i]));
      }
    }

    for (let j = 0; j < localStorage.length; j++) {
      createContactItem(j)
    }
  }).then(() => {
    createPopup();
  })

    export function createContactItem(id) {
    let currentUser = JSON.parse(localStorage.getItem('User' + id));
    let listItem = document.createElement('div'),
        itemName = document.createElement('div'),
        itemEmail = document.createElement('div'),
        itemPhone = document.createElement('div'),
        itemCompany = document.createElement('div');
    listItem.classList.add('contacts__item');
    itemName.classList.add('contacts__name', 'contacts__list-item');
    itemEmail.classList.add('contacts__email', 'contacts__list-item');
    itemPhone.classList.add('contacts__phone', 'contacts__list-item');
    itemCompany.classList.add('contacts__company', 'contacts__list-item');

    itemName.innerHTML = currentUser.name;
    itemEmail.innerHTML = currentUser.email;
    itemPhone.innerHTML = currentUser.phone;
    itemCompany.innerHTML = currentUser.company.name;
    itemCompany.innerHTML = currentUser.company.name;


    listItem.appendChild(itemName);
    listItem.appendChild(itemEmail);
    listItem.appendChild(itemPhone);
    listItem.appendChild(itemCompany);
    listItem.setAttribute('data-userid', id);

    // dynamicList.appendChild(listItem);
    if (id === 0) {
      document.querySelector('#dynamicList').insertAdjacentElement('afterbegin', listItem);
    } else {
      document.querySelector('#dynamicList [data-userid="'+ (id - 1) + '"]')
      // document.querySelector('#dynamicList').children[id]
        .insertAdjacentElement('afterend', listItem);
        // такая конструкция нужна для того, чтобы применять эту функцию
        // и при создании списка контактов при загрузке страницы,
        // и для вывода результатов поиска, и для мгновенного отображения
        // элементов изменённого через попап контакта
    }

  }
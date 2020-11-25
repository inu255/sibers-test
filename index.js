// import {createPopup} from './popup-show.js';
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
      createContactItem(j)
    }
  }).then(() => {
    createPopup();
  })

    // export
    function createContactItem(id) {
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

// тут будет поиск

// import {createContactItem} from './contacts.js';
// import {createPopup} from './popup-show.js';

let nameInput = document.querySelector('.popup-edit__name'),
    emailInput = document.querySelector('.popup-edit__email'),
    phoneInput = document.querySelector('.popup-edit__phone'),
    companyInput = document.querySelector('.popup-edit__company');

function editContacts(id) {
  document.querySelector('.popup-edit__save').addEventListener('click', (event) => {
    event.preventDefault();
    nameInput.value && editUser(id, nameInput.value);
    emailInput.value && editUser(id, false, emailInput.value);
    phoneInput.value && editUser(id, false, false, phoneInput.value);
    companyInput.value && editUser(id, false, false, false, companyInput.value);

    document.querySelector('#dynamicList [data-userid="'+ id + '"]').remove();
    createContactItem(id);
    createPopup();

    document.querySelector('.popup-overlay').style = 'display: none';
    document.querySelector('.popup-edit').style = 'display: none';
    document.querySelector('.popup-show').style = 'display: none';
    // сделать скрытие попапов через функцию
  })
}

function editUser(userId, newName, newEmail, newPhone, newCompany) {
  let user = JSON.parse(localStorage.getItem('User' + userId));

  if (newName) { user.name = newName }
  if (newEmail) { user.name = newEmail }
  if (newPhone) { user.name = newPhone }
  if (newCompany) { user.name = newCompany }

  localStorage.setItem('User' + userId, JSON.stringify(user));
}

function closePopups() {

}

document.querySelector('.popup-edit__hide').addEventListener('click', (event) => {
  document.querySelector('.popup-overlay').style = 'display: none';
  document.querySelector('.popup-edit').style = 'display: none';
  document.querySelector('.popup-show').style = 'display: none';
})

document.querySelector('.popup-edit__cancel').addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelector('.popup-edit').style = 'display: none';
  document.querySelector('.popup-show').style = 'display: block';
})

// import {editContacts} from './popup-edit.js';

function createPopup() {
  let shownItems = document.querySelectorAll('#dynamicList > *');

  for (let i = 0; i < shownItems.length; i++) {
    shownItems[i].addEventListener('click', function(event) {
      document.querySelector('.popup-overlay').style = 'display: block';
      document.querySelector('.popup-show').style = 'display: block';

      let extractedName = JSON.parse(localStorage.getItem('User' + i)).name,
          extractedEmail = JSON.parse(localStorage.getItem('User' + i)).email,
          extractedPhone = JSON.parse(localStorage.getItem('User' + i)).phone,
          extractedCompany = JSON.parse(localStorage.getItem('User' + i)).company.name;

      document.querySelector('.popup-show__name').innerHTML = extractedName;

      document.querySelector('#email').innerHTML = extractedEmail;
      document.querySelector('#email').setAttribute('href', 'mailto:' + extractedEmail);

      document.querySelector('#phone').innerHTML = extractedPhone;
      document.querySelector('#phone').setAttribute('href', 'tel:' + extractedPhone);

      document.querySelector('#company').innerHTML = extractedCompany;

        nameInput.value = extractedName;
        emailInput.value = extractedEmail;
        phoneInput.value = extractedPhone;
        companyInput.value = extractedCompany;

      document.querySelector('.popup-show__edit').addEventListener('click', (event) => {
        document.querySelector('.popup-show').style = 'display: none';
        document.querySelector('.popup-edit').style = 'display: block';
        editContacts(i);
      })
    })
  }
}

document.querySelector('.popup-show__hide').addEventListener('click', (event) => {
  document.querySelector('.popup-overlay').style = 'display: none';
  document.querySelector('.popup-show').style = 'display: none';
  document.querySelector('.popup-edit').style = 'display: none';
})

document.querySelector('.popup-overlay').addEventListener('click', (event) => {
  document.querySelector('.popup-overlay').style = 'display: none';
  document.querySelector('.popup-edit').style = 'display: none';
  document.querySelector('.popup-show').style = 'display: none';
})

//# sourceMappingURL=index.js.map

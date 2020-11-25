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

// import {editContacts} from './popup-edit.js';

function createPopup() {
  let shownItems = document.querySelectorAll('#dynamicList > *');

  for (let i = 0; i < shownItems.length; i++) {
    shownItems[i].addEventListener('click', function(event) {
      document.querySelector('.popup-overlay').style = 'display: block';
      document.querySelector('.popup-show').style = 'display: block';
      document.querySelector('.popup-show__name')
        .innerHTML = JSON.parse(localStorage.getItem('User' + i)).name;

      document.querySelector('#email').innerHTML = JSON.parse(localStorage.getItem('User' + i)).email;
      document.querySelector('#email')
        .setAttribute('href', 'mailto:' + JSON.parse(localStorage.getItem('User' + i)).email);

      document.querySelector('#phone').innerHTML = JSON.parse(localStorage.getItem('User' + i)).phone;
      document.querySelector('#phone')
        .setAttribute('href', 'tel:' + JSON.parse(localStorage.getItem('User' + i)).phone);

      document.querySelector('#company')
        .innerHTML = JSON.parse(localStorage.getItem('User' + i)).company.name;

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

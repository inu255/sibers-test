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

      console.log(extractedName, extractedEmail, extractedPhone, extractedCompany)

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

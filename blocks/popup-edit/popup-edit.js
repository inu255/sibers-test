let nameInput = document.querySelector('input.popup-edit__name'),
    emailInput = document.querySelector('input.popup-edit__email'),
    phoneInput = document.querySelector('input.popup-edit__phone'),
    companyInput = document.querySelector('input.popup-edit__company');

function editContacts(id) {
  document.querySelector('.popup-edit__save').addEventListener('click', (event) => {
    event.preventDefault();
    let user = JSON.parse(localStorage.getItem('User' + id));

    if (nameInput.value) user.name = nameInput.value[0].toUpperCase() + nameInput.value.slice(1);
    if (emailInput.value) user.email = emailInput.value;
    if (phoneInput.value) user.phone = phoneInput.value;
    if (companyInput.value) user.company.name = companyInput.value;

    localStorage.setItem('User' + id, JSON.stringify(user));
    window.location.reload();
  })
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

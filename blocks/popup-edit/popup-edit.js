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

fetch('http://demo.sibers.com/users')
  .then(response => response.json())
  .then(json => {
    // console.log(json);
    localStorage.clear();
    for (let i = 0; i < json.length; i++) {
      if (!localStorage.getItem('User' + i)) { // задаём приоритет у локально изменённых данных контакта
        localStorage.setItem('User' + i, JSON.stringify(json[i]));
      }
    }

    let dynamicList = document.querySelector('#dynamicList');

    for (let j = 0; j < localStorage.length; j++) {
      let currentUser = JSON.parse(localStorage.getItem('User' + j));
      let listItem = document.createElement('div'),
          itemName = document.createElement('div'),
          itemEmail = document.createElement('div'),
          itemPhone = document.createElement('div'),
          itemCompany = document.createElement('div');
      listItem.classList.add('list__item', 'item');
      itemName.classList.add('item__name', 'item__column');
      itemEmail.classList.add('item__email', 'item__column');
      itemPhone.classList.add('item__phone', 'item__column');
      itemCompany.classList.add('item__company', 'item__column');

      itemName.innerHTML = currentUser.name;
      itemEmail.innerHTML = currentUser.email;
      itemPhone.innerHTML = currentUser.phone;
      itemCompany.innerHTML = currentUser.company.name;
      itemCompany.innerHTML = currentUser.company.name;


      listItem.appendChild(itemName);
      listItem.appendChild(itemEmail);
      listItem.appendChild(itemPhone);
      listItem.appendChild(itemCompany);
      listItem.id = 'User' + j;

      dynamicList.appendChild(listItem);
    }
  }).then(() => {
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

        document.querySelector('.popup-show__edit').addEventListener('click', () => {
          document.querySelector('.popup-show').style = 'display: none';
          document.querySelector('.popup-edit').style = 'display: block';
        })

        let nameInput = document.querySelector('.popup-edit__name'),
            emailInput = document.querySelector('.popup-edit__email'),
            phoneInput = document.querySelector('.popup-edit__phone'),
            companyInput = document.querySelector('.popup-edit__email');
        document.querySelector('.popup-edit__save').addEventListener('click', (event) => {
          event.preventDefault();
          // nameInput.value && localStorage.setItem('')
        })

      })
    }



    document.querySelector('.popup-show__hide').addEventListener('click', () => {
      document.querySelector('.popup-overlay').style = 'display: none';
      document.querySelector('.popup-show').style = 'display: none';
      document.querySelector('.popup-edit').style = 'display: none';
    })

    document.querySelector('.popup-edit__hide').addEventListener('click', () => {
      document.querySelector('.popup-overlay').style = 'display: none';
      document.querySelector('.popup-edit').style = 'display: none';
      document.querySelector('.popup-show').style = 'display: none';
    })

    document.querySelector('.popup-edit__cancel').addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('.popup-edit').style = 'display: none';
      document.querySelector('.popup-show').style = 'display: block';
    })

    document.querySelector('.popup-overlay').addEventListener('click', () => {
      document.querySelector('.popup-overlay').style = 'display: none';
      document.querySelector('.popup-edit').style = 'display: none';
      document.querySelector('.popup-show').style = 'display: none';
    })

  })

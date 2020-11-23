fetch('http://demo.sibers.com/users')
  .then(response => response.json())
  .then(json => {
    console.log(json);
    for (let i = 0; i < json.length; i++) {
      localStorage.setItem('User' + i, json[i]);
    }
    console.log(localStorage.getItem('User7'))

    let dynamicList = document.querySelector('#dynamicList');

    for (let j = 0; j < localStorage.length; j++) {
      let currentUser = localStorage.getItem('User' + j);
      console.log(currentUser);
      let listItem = document.createElement('div'),
          itemName = document.createElement('div'),
          itemEmail = document.createElement('div'),
          itemPhone = document.createElement('div'),
          itemCompany = document.createElement('div');
      listItem.classList.add('list__item', 'item');
      itemName.classList.add('item__name');
      itemEmail.classList.add('item__email');
      itemPhone.classList.add('item__phone');
      itemCompany.classList.add('item__company');

      itemName.innerHTML = currentUser.name;
      itemEmail.innerHTML = currentUser.email;
      itemPhone.innerHTML = currentUser.phone;
      // itemCompany.innerHTML = currentUser.company.name;
      itemCompany.innerHTML = 'sas';


      listItem.appendChild(itemName);
      listItem.appendChild(itemEmail);
      listItem.appendChild(itemPhone);
      listItem.appendChild(itemCompany);

      dynamicList.appendChild(listItem);
    }
  })

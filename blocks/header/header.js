let headerInput = document.querySelector('.header__search');

// когда пользователь вводит что-то в строку поиска,
// список контактов выстраивается заново
headerInput.addEventListener('input', () => {
  let filterable = document.querySelectorAll('.contacts__item');

  for (let i = 0; i < filterable.length; i++) {
    // скрываем все элементы списка, чтобы отом отбразить только отфильтрованные
    filterable[i].style = 'display: none';
  }
    if (headerInput.value === '') {
      for (let k = 0; k <= filterable.length - 1; k++) {
        filterable[k].style = 'display: block'; // отображаем все элементы, если строка поиска пуста
      }
    } else {
      let newStr = headerInput.value[0].toUpperCase() + headerInput.value.slice(1); // то что ввёл пользователь

      for (let i = 0; i < localStorage.length; i++) {
        // введённый в строку поиска текст сравнивается
        // со свойством name соответствующего контакта
        if (JSON.parse(localStorage.getItem('User' + i)).name.indexOf(newStr) === 0) {
          // и, если совпадение есть, элемент этого контакта выводится на страницу
          filterable[i].style = 'display: block';
        }
      }
    }

})

let headerInput = document.querySelector('.header__search');

headerInput.addEventListener('input', () => {
  let filterable = document.querySelectorAll('.contacts__item');

  for (let i = 0; i < filterable.length; i++) {
    filterable[i].style = 'display: none';
  }
    if (headerInput.value === '') {
      for (let k = 0; k <= filterable.length - 1; k++) {
        filterable[k].style = 'display: block';
      }
    } else {
      let newStr = headerInput.value[0].toUpperCase() + headerInput.value.slice(1);

      for (var i = 0; i < localStorage.length; i++) {
        if (JSON.parse(localStorage.getItem('User' + i)).name.indexOf(newStr) === 0) {
          filterable[i].style = 'display: block';
        }
      }
    }

})

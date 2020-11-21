fetch('http://demo.sibers.com/users')
  // Загружаем данные в формате json
  .then(response => response.json())
  // Делаем запрос к GitHub
  .then(json => {
    console.log(json)
  })

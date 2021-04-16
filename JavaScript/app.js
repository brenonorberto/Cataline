var submitButton = document.querySelector('#app form button')
var zipCodeField = document.querySelector('#app form input')
var content = document.querySelector('#app main')

submitButton.addEventListener('click', run)

function run(event) {
    event.preventDefault() //Cancela o evento se for cancelável, sem parar a propagação do mesmo. NESSE CASO A ATUALIZAÇÃO DA PAGINA
    
    var zipCode = zipCodeField.value

    // Tratamento
    zipCode = zipCode.replace(' ', '')
    zipCode = zipCode.replace('.', '')
    zipCode = zipCode.replace('-', '')
    zipCode = zipCode.trim() // tirar os espaços antes e depois do texto

    axios.get('https://viacep.com.br/ws/' + zipCode + '/json/')
    .then(function (response) {
        if (response.data.erro) {
            throw new Error({ message: 'Cep inválido', status: 200 })
        }
        content.innerHTML = ''
        createLine(response.data.logradouro)
        createLine(response.data.localidade + '/' + response.data.uf)
        createLine(response.data.bairro)


    }).catch(function (error) {
        if (status != 200) {
            content.innerHTML = ''
            console.log(error)
            createLine('Ops, tem algo errado!')
        }

    });
}

function createLine(text) {
    var line = document.createElement('p')
    var text = document.createTextNode(text)

    line.appendChild(text)
    content.appendChild(line)
}
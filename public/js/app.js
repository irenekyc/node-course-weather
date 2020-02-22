
//fetch > then : async function, you request to get data from a JSON file and get the data

const url = 'http://localhost:3000/weather?address='

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    messageOne.textContent= " "
    messageTwo.textContent=" "
    const location = search.value
    const addressurl = url + location 
    fetch(addressurl).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                return messageOne.textContent = data.error
            } else {
                messageTwo.textContent=data.summary
        }
    })
    })
})
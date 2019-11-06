console.log('client js file')



const getForecast = function(address) {
    fetch(`/weather?address=${address}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            msg1.textContent = ''
            msg2.textContent = data.error
        } else{
            msg1.textContent = data.forecast
            msg2.textContent = data.location
        }
    })
})
}

const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    getForecast(input.value)
})
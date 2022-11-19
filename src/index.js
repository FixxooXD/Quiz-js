const Btn = document.getElementById("btn");
const config= require('../secret.json'); 

const MY_KEY = config.API_KEY;


Btn.addEventListener('click', getquiz);

async function getquiz(){
 const fetchData = await fetch(`https://quizapi.io/api/v1/questions?apiKey=${MY_KEY}&category=Linux`);
     
const data = await fetchData.json();
console.log(data)
console.log(data[0].question);
}

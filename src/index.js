const NextQueBtn = document.getElementById("btn");
// selected all the options as a one
const optionBtn = document.querySelectorAll("#option");
const question = document.querySelector("#question");
const option1 = document.querySelector(".option-0");
const option2 = document.querySelector(".option-2");
const option3 = document.querySelector(".option-3");
const option4 = document.querySelector(".option-4");
const category = document.getElementById("category");
const op1 = document.getElementById("op1");
const QuesCount = document.getElementById("questionCount");
const startBtn = document.getElementById('startBtn');
const rulesPopup = document.querySelector('#rules');
const timerLeft = document.getElementById('timeleft');
let correctAns;
let firstOption;
let secondOption;
let thirdOption;
let fourtOption;
let questionsCounter = 0;
let counter;

// This Flag will tell that the user didn't select any option and he clicked the nextQuestion button if it is false
let optionsNotClickedFlag ;

function startTimer(time){
  optionsNotClickedFlag = false;
  counter = setInterval(timer, 1000);
  function timer(){
    timerLeft.innerHTML = time;
    console.log(time)
    if(time <= 9){ //if timer is less than 9
      timerLeft.innerHTML = "0" + time; //add a 0 before time value
     }
     time--;
     if(time < 0){ //if timer is less than 0
      clearInterval(counter); //TO Stop Counter
      doSomething();
  }
}
}

startBtn.addEventListener('click', ()=>{
  rulesPopup.style.display= 'none'
  getquiz()
  optionsNotClickedFlag = false;
})

//  Its an onclick function added the the  HtmlFile it will disable all the option Btn if any of the button is clicked
const doSomething = () =>{
  clearInterval(counter);
  optionsNotClickedFlag = true;
  option1.disabled = true;
  option2.disabled = true;
  option3.disabled = true;
  option4.disabled = true;

  //  this feature is also added symontaniously onclick of any of the options
  // it will turn of bordercolor of the correct option wheather it was  clicked or not so the if the user click the wrong option
  // it show both  the worong as will as the correct option
  if (option1.innerHTML == correctAns) {
    option1.style.borderColor = "green";
    //   option1.innerHTML = `${firstOption}  <i id="check" class="fa-regular fa-circle-check p-1"></i>`;
  }
  if (option2.innerHTML == correctAns) {
    option2.style.borderColor = "green";
    // option2.innerHTML += `${secondOption}  <i id="check" class="fa-regular fa-circle-check p-1"></i>`;
  }
  if (option3.innerHTML == correctAns) {
    option3.style.borderColor = "green";
    //       option3.innerHTML = `${thirdOption}  <i id="check" class="fa-regular fa-circle-check p-1"></i>`;
  }
  if (option4.innerHTML == correctAns) {
    option4.style.borderColor = "green";
    //         option4.innerHTML = `${fourtOption}  <i id="check" class="fa-regular fa-circle-check p-1"></i>`;
  }
}

// Calling getquiz() Onlcik ON the NextQue Btn;
NextQueBtn.addEventListener("click", getquiz);

async function getquiz() {
  const fetchData = await fetch(
    `https://quizapi.io/api/v1/questions?apiKey=BEXiGL47aq49e6JIjlo8xxSpYDDqOUEQ89QmwBlJ`
  );

  // questionsCounter  = questionsCounter + 1;
  // converting the Respone to Json and stored in Data Variable
  const data = await fetchData.json();
  // console.log(data);
  question.innerHTML = data[0].question;

  const firstObj = data[0];
  const answer = firstObj.correct_answers;

  //Getting the Correct Answer
  Object.keys(answer).forEach((i) => {
    if (answer[i] === "true") {
      // storing the correct answer key into "correctAns"
      correctAns = i;
    }
  });
  // console.log(correctAns);

  //Now am getting the key of correctAnswer but not getting the value of the key for that,
  // I used the .Includes() method because every CorrectAnswer key has _a_ ,_b_.. in it so i just checked that
  // so now i just reassigned the key value of the correct answer key into "CorrectAns"
  if (correctAns.includes("_a_")) {
    // console.log("a");
    correctAns = firstObj.answers.answer_a;
  }
  if (correctAns.includes("_b_")) {
    // console.log("b");
    correctAns = firstObj.answers.answer_b;
  }
  if (correctAns.includes("_c_")) {
    // console.log("c");
    correctAns = firstObj.answers.answer_c;
  }
  if (correctAns.includes("_d_")) {
    // console.log("d");
    correctAns = firstObj.answers.answer_d;
  }

  // so here i just added the options in to the options Btn and also the category from the Api response
  category.innerHTML = await firstObj.category;
  option1.innerHTML = await firstObj.answers.answer_a;
  option2.innerHTML = await firstObj.answers.answer_b;
  option3.innerHTML = await firstObj.answers.answer_c;
  option4.innerHTML = await firstObj.answers.answer_d;

  // just trying  something by creating variable of differnt options and assigning it the value respectively
  firstOption = await firstObj.answers.answer_a;
  secondOption = await firstObj.answers.answer_b;
  thirdOption = await firstObj.answers.answer_c;
  fourtOption = await firstObj.answers.answer_d;

  // converting the default color of border  ONclicking on this button
  option1.style.borderColor = "#ECEFF1";
  option2.style.borderColor = "#ECEFF1";
  option3.style.borderColor = "#ECEFF1";
  option4.style.borderColor = "#ECEFF1";

  // converting the attribut of button from  disabled true to false so the options can be clicked once Again
  option1.disabled = false;
  option2.disabled = false;
  option3.disabled = false;
  option4.disabled = false;

  // counting the  Number questions and adding +1 on every click
  questionsCounter += 1;
  QuesCount.innerHTML = questionsCounter;

  // doSomething()
  // A Option is clicked
  if(optionsNotClickedFlag == true)
  startTimer(15); //calling startTimer function
 else{
  // UseR Didn't select anyof the option
  // this will stop the counter at the moment when the nextQuestion  is clicked
  clearInterval(counter);
  // At the same Point it will Restart the counter
  startTimer(15);
 }


}
// most Important Part Because i had created "optionBtn" as a QuerySelectorAll I have to Iterate individulally
// to each optionsBtns so i had created a forEach  loop to itereation over each options
// and also added the If else check and a onClick eventListener init .
// the If  else statement is checking the innerHtml of the options and compating it value with the correctAns variable
// if the innerHtml Matches with the correct ans then you can see what will happen and also  of not
optionBtn.forEach((options) => {
  options.addEventListener("click", () => {
    if (options.innerHTML == correctAns) {
      options.innerHTML +=
        '<i id="check" class="fa-regular fa-circle-check p-1"></i>';
      options.style.borderColor = "green";
    }
    else{
      options.innerHTML += `<i id="cross" class="fa-regular fa-circle-xmark p-1 text-red-600"></i>`;
      options.style.borderColor = "red";
    }
  });
});

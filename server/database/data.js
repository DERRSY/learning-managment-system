// var readlineSync = require("readline-sync");

// console.log("welcome to F.R.I.E.N.D.S. quiz");

// //this is line breaker, like it leaves a line.
// console.log("\n");


// var username = readlineSync.question("Your Name? ");

// console.log("\n");

// console.log("Welcome to THE QUIZ, " + username + "!");

// var score = 0;
// function quiz(question, answer){
//   var userAnswer = readlineSync.question(question);
//   if(userAnswer == answer){
//     console.log("correct! ");
//     score++;
//   }
//   else{
//     console.log("wrong! ");
//     score--;
//   }
//   console.log("your score is ",score);
//   console.log("-------------------");
// }

// //questions
// var questions = [
//   {question:"how many iron man suits did tony stark create in the cinematic universe? ",
//   answer:"85"},
//   {question:"Name of Thor's original hammer",
//   answer:"mjolnir"},
//   {question:"Where was Mjolnir forged?",
//   answer:"Nidavellir"},
//   {question:"Father of the God of Thunder",
//   answer:"Odin"},
//   {question:"Who is the god of mischief?",
//   answer:"Loki"},
//   {question:"Did you like the quiz?",
//   answer:"yes"}
// ];

// //LOOP
// for(var i=0; i<questions.length; i++){
//   var currentq = questions[i];
//   quiz(currentq.question, currentq.answer);
// }

// //To display the final score.
// console.log("YOUR FINAL SCORE IS: " + score+"/10")
// module.exports = questions
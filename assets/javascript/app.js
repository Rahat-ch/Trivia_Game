$(document).ready(function(){

  //questions object for game
  var questions = [{
    question: "What was the first Pokemon created in the franchise?",
    choices: ["Pikachu", "Clefairy", "Mew", "Rhydon"],
    correctChoice: "Rhydon",
  }, {
    question: "What was the first Pokemon according to Kanto Lore?",
    choices: ["Pikachu", "Clefairy", "Mew", "Bulbasaur"],
    correctChoice: "Mew",
  }, {
    question: "What was the first Pokemon in the Kanto Pokedex?",
    choices: ["Pikachu", "Clefairy", "Caterpie", "Bulbasaur"],
    correctChoice: "Bulbasaur",
  }, {
    question: "What Pokemon was the original mascot for the franchise?",
    choices: ["Pikachu", "Charmander", "Clefairy", "Meowth"],
    correctChoice: "Clefairy",
  }, {
    question: "What is the first Legendary Pokemon shown in the Anime?",
    choices: ["Pikachu", "Moltres", "Ho-Oh", "Charizard"],
    correctChoice: "Ho-Oh",
  }, {
    question: "Where can you capture Mewtwo in the original games?",
    choices: ["SS Anne Truck", "Safari Zone", "Cerulean Cave", "Victory Road"],
    correctChoice: "Cerulean Cave",
  }];

  // game object with functions

  var trivia = {
    questions: questions,
    currentQuestion: 0,
    timer: 30,
    correctAnswers: 0,
    incorrectAnswers: 0,
    notAnswered: 0,

    //function for timer
    timeLeft: function(){
      trivia.timer --;
      $("#timer").html("You have " + trivia.timer + " seconds remaining");
      if (trivia.timer<=0) {
        console.log("Time up");
        trivia.noAnswer();
      }
    },
    //function to load question and answers as well as to start the timer
    
    loadQuestion: function(){
      timer = setInterval(trivia.timeLeft,1000);
      var qp = $("<p>");
      var myQuestion = questions[trivia.currentQuestion].question;
      qp.text(myQuestion);
      $("#display").html(qp);
      for (var i = 0; i < questions[trivia.currentQuestion].choices.length; i++) {
        var answerChoices = $("<button>");
        answerChoices.addClass("choices");
        answerChoices.attr("data-name",questions[trivia.currentQuestion].choices[i]);
        answerChoices.text(questions[trivia.currentQuestion].choices[i]);
        $("#display").append(answerChoices);
      }
    },

    //switch to the next question
    nexQuestion: function(){
      trivia.timer = 30;
      $("#timer").html(trivia.timer);
      trivia.currentQuestion++;
      trivia.loadQuestion();
    },

    //if no answer with end game logic
    noAnswer: function(){
      clearInterval(timer);
      trivia.notAnswered++;
      var tooLate = $("<h2>");
      var realAnswer = $("<h3>");
      tooLate.addClass("answerMessage");
      tooLate.text("You took too long and the Pokemon ran away!");
      realAnswer.addClass("answerMessage");
      realAnswer.html("The correct answer was " + questions[trivia.currentQuestion].correctChoice);
      $("#display").html(tooLate);
      $("#display").append(realAnswer);
      if(trivia.currentQuestion == questions.length-1){
        setTimeout(trivia.results,3*1000);
      } else {
        setTimeout(trivia.nexQuestion,3*1000);
      };
    },

    //results function
    results: function(){
      clearInterval(timer);
      var finished = $("<h2>");
      var right = $("<h3>");
      var wrong = $("<h3>");
      var neither = $("<h3>");
      var startOver = $("<button>")
      finished.addClass("answerMessage");
      finished.html("You're done trainer!");
      right.addClass("answerMessage");
      right.html("Right Answers: " + trivia.correctAnswers);
      wrong.addClass("answerMessage");
      wrong.html("Wrong Answers: " + trivia.incorrectAnswers);
      neither.addClass("answerMessage");
      neither.html("Not Answered: " + trivia.notAnswered);
      startOver.addClass("refresh");
      startOver.html("Refresh");
      $("#display").html(finished);
      $("#display").append(right);
      $("#display").append(wrong);
      $("#display").append(neither);
      $("#display").append(startOver);
    },

    //pass whatever choice the player clicks and determine if it is correct or incorrect
    clicked: function(e){
      clearInterval(timer);
      if ($(e.target).data("name") == questions[trivia.currentQuestion].correctChoice) {
        trivia.answeredCorrectly();
      } else {
        trivia.answeredIncorrectly();
      }
    },

    //when user answers correctly let them know and add to correctAnswers counter then check if there is another question to answer
    answeredCorrectly: function(){
        console.log("Correct");
        clearInterval(timer);
        trivia.correctAnswers ++;
        var yay = $("<h2>");
        yay.addClass("answerMessage");
        yay.html("Correct! It's super effective!")
        $("#display").html(yay);
        if(trivia.currentQuestion == questions.length-1){
          setTimeout(trivia.results,3*1000);
        } else {
          setTimeout(trivia.nexQuestion,3*1000);
        }
    },

    //when user answers incorrectly let them know and add to incorrectAnswers counter then check if there is another question to answer
    answeredIncorrectly: function(){
        console.log("Incorrect");
        clearInterval(timer);
        trivia.incorrectAnswers ++;
        var nay = $("<h2>");
        var realAnswer = $("<h3>");
        nay.addClass("answerMessage");
        nay.html("Incorrect! You're a terrible Pokemon Trainer!")
        realAnswer.addClass("answerMessage");
        realAnswer.html("The correct answer was " + questions[trivia.currentQuestion].correctChoice);
        $("#display").html(nay);
        $("#display").append(realAnswer);
        if(trivia.currentQuestion == questions.length-1){
          setTimeout(trivia.results,3*1000);
        } else {
          setTimeout(trivia.nexQuestion,3*1000);
        }
    },

    //refresh the game
    refresh: function(){
      trivia.currentQuestion = 0;
      trivia.correctAnswers = 0;
      trivia.incorrectAnswers = 0;
      trivia.notAnswered = 0;
      trivia.timer= 30;
      trivia.loadQuestion();
    },
  };

  //end of game object


  //click function to begin game - removes start button and then loads first question and answer choices

  $("#start").click(function(){
      $("#start").remove();
      $('#audio').get(0).play();
      trivia.loadQuestion();
  });

  // click function for dynamically created choices buttons
  $(document).on('click', '.choices',function(e){
    trivia.clicked(e);
  })


  //click function for dynamically created refresh button
  $(document).on('click', '.refresh',function(){
    trivia.refresh();
  })


});

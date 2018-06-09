//Display questions with a timer
// display options 
//capture results
//evaluate result for correct or incorrect 
// update counter for correct and incorrect 
// dispaly result 
// repeat the above till all questions run out 
// display final result 
// options to restart game 
// varibales i need 
// hold the questions 



$.fn.trivia = function() {
    var _t = this;    //identifies the thing clicked 
    _t.userPick = null; // capturs the user answer 
    _t.answers = {  //keeps track of the result 
        correct: 0,
        incorrect: 0
    };
    _t.images = null;  // if i feel like adding images 
    _t.count = 20; // time count to answer thr question 
    _t.current = 0; // start arrray for the question

    _t.questions = [{  // object for questions - target 10 questions ..
        question: "Which number should come next in the pattern? 37, 34, 31, 28 ",
        choices: ["25", "38", "44", "41"],
        images: ["../images/"], // add a image if it feels like 
        correct: 0
    }, {
        question: "What is the capital of Burundi ? ",
        choices: ["Bujumbura", "Djibouti", "Mogadishu", "Asmara"],
        correct: 0

    }, {
        question: "What is the longest River in the world?",
        choices: ["Nile", "Yangtze", "Amazon", "Mississippi"],
        correct: 2

    }, 
    ];

    _t.ask = function() {
        if (_t.questions[_t.current]) { // starts at 
            $("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
            $("#question_div").html(_t.questions[_t.current].question);
            var choicesArr = _t.questions[_t.current].choices;
            var buttonsArr = [];

            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button>');
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                $('#choices_div').append(button);
            }
            window.triviaCounter = setInterval(_t.timer, 1000); // count down in one sec interval 
        } else {
            $('body').append($('<div />', {
                text: 'Unanswered: ' + (
                    _t.questions.length - (_t.answers.correct + _t.answers.incorrect)),
                class: 'result'
            }));
            $('#start_button').text('Restart').appendTo('body').show();
        }
    };
    _t.timer = function() { 
        _t.count--;  // count down from 20 
        if (_t.count <= 0) { 
            setTimeout(function() { // Display an alert box after _t.next + 1000 (in _t.next func)  :
                _t.nextQ();
            });

        } else {
            $("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
        }
    };
    _t.nextQ = function() {
        _t.current++;
        clearInterval(window.triviaCounter);
        _t.count = 30;
        $('#timer').html("");
        setTimeout(function() {
            _t.cleanUp();
            _t.ask();
        }, 1000)
    };
    _t.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).html('');
        });
        $('.correct').html('Correct answers: ' + _t.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + _t.answers.incorrect);
    };
    _t.answer = function(correct) {
        var string = correct ? 'correct' : 'incorrect';
        _t.answers[string]++;
        $('.' + string).html(string + ' answers: ' + _t.answers[string]);
    };
    return _t;
};
 
// Trivia Function ends (fun of having first calss functions) 

var Trivia;

$("#start_button").click(function() {
    $(this).hide();
    $('.result').remove();
    $('div').html('');
    Trivia = new $(window).trivia();
    Trivia.ask();
});

$('#choices_div').on('click', 'button', function(e) {
    var userPick = $(this).data("id"),
        _t = Trivia || $(window).trivia(),
        index = _t.questions[_t.current].correct,
        correct = _t.questions[_t.current].choices[index];

    if (userPick !== index) {
        $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
        _t.answer(false);
    } else {
        $('#choices_div').text("Correct!!! The correct answer was: " + correct);
        _t.answer(true);
    }
    _t.nextQ();
});
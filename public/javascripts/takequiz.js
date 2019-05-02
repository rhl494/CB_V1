$("#takequizform").on("submit", function(e){
    e.preventDefault();
    recalculate();
});
var stored_scoreToBeat = $('.quizScore').attr('id');

function recalculate(){
    var obj = {};

    obj.stored_quizScore = 0;
    console.log(stored_scoreToBeat);

    $("input[type=checkbox]:checked").each(function(){
        if($(this).val() > 0) {
            obj.stored_quizScore += parseInt($(this).val());
            // $(this).css("margin", "10px");
        } else {
            obj.stored_quizScore --;
        }
    });
    if(obj.stored_quizScore >= stored_scoreToBeat) {
        $(".replacewithresoult").replaceWith("<p> 'You Passed!' </p>").removeClass('hidden');

    } else {
        $(".replacewithresoult").replaceWith("<p> 'You Failed!' </p>").removeClass('hidden');
    }

    $.ajax({
        type: 'POST',
        url: '/takequiz/',
        data: obj,
        success: function (result) {
            console.log(result);
        },
        error: function (xhr, status, error) {
            console.log('Error: ')
        }
    });

    $("#replacewithscore").replaceWith( "<h2>Quiz Finished! - You scored " + obj.stored_quizScore  +"</h2>" );

    $("input[type=submit]").remove();

    $("#countdown").hide();

    if ($("input[type=checkbox]").val()==0) {
        $(this).css("color", "red");
    } else {

    }

}




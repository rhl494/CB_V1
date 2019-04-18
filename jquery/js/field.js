var counter = 0;
$(function(){
    $('p#add_field').click(function(){
    counter += 1;
    $('#container').append(
        '</br><strong>Question ' + counter + '</strong><br />'
        + '<input id="field_' + counter + '" name="item[]' + '" type="text" />' 
       // +'<strong>quantity ' + counter + '</strong>' 
       // +'<input class="qty" id="quantity' + counter + '" name="quantity[]' + '" type="text" />' 
       // +'<strong>rate ' + counter + '</strong>' 
       // +'<input id="rate' + counter + '" name="rate[]' + '" type="text" />' 
       // +'<strong>Amount ' + counter + '</strong>' 
       // +'<input id="field_' + counter + '" name="amount[]' + '" type="text" />' 
       // +'<strong>img ' + counter + '</strong>' 
       // +'<input id="field_' + counter + '" name="image[]' + '" type="file" />'
		+ '<p>\n</p>'
        +'<strong>Answer (' + counter + ')</strong>' 
        +'<input id="true_' + counter + '" name="bool' + counter +  '[]" type="radio" value="true"/>True' 
        +'<input id="false_' + counter + '" name="bool' + counter + '[]" type="radio" value="false"/>False'   
		+ '<p>\n\n</p>'
        );
    });
	
	//This is for the multiple choice questions
    $('p#add_field2').click(function(){
    counter += 1;
    $('#container').append(
        '</br><strong>Question ' + counter + '</strong><br />'
        + '<input id="field_' + counter + '" name="item[]' + '" type="text" />' 
       // +'<strong>quantity ' + counter + '</strong>' 
       // +'<input class="qty" id="quantity' + counter + '" name="quantity[]' + '" type="text" />' 
       // +'<strong>rate ' + counter + '</strong>' 
       // +'<input id="rate' + counter + '" name="rate[]' + '" type="text" />' 
       // +'<strong>Amount ' + counter + '</strong>' 
       // +'<input id="field_' + counter + '" name="amount[]' + '" type="text" />' 
       // +'<strong>img ' + counter + '</strong>' 
       // +'<input id="field_' + counter + '" name="image[]' + '" type="file" />'
	   /*
		+ '<p>\n</p>'
        +'<strong>Choice (' + counter + ')</strong>' 
        +'<input id="choice_' + counter + '" name="bool' + counter +  '[]" type="radio" value="true"/><input id="rate' + counter
		+ '" name="rate[]' + '" type="text" />' 
		*/
		+ '<p>\n</p>'
        +'<strong>Choice (' + 1 + ')</strong>' 
        +'<input id="choice_' + 1 + '" name="bool' + 1 +  '[]" type="radio" value="true"/><input id="rate' + 1
		+ '" name="rate[]' + '" type="text" />' 
		
		+ '<p>\n</p>'
        +'<strong>Choice (' + 2 + ')</strong>' 
        +'<input id="choice_' + 2 + '" name="bool' + 1 +  '[]" type="radio" value="true"/><input id="rate' + 2
		+ '" name="rate[]' + '" type="text" />' 
		
		+ '<p>\n</p>'
        +'<strong>Choice (' + 3 + ')</strong>' 
        +'<input id="choice_' + 3 + '" name="bool' + 1 +  '[]" type="radio" value="true"/><input id="rate' + 3
		+ '" name="rate[]' + '" type="text" />' 
		
		+ '<p>\n</p>'
        +'<strong>Choice (' + 4 + ')</strong>' 
        +'<input id="choice_' + 4 + '" name="bool' + 1 +  '[]" type="radio" value="true"/><input id="rate' + 4
		+ '" name="rate[]' + '" type="text" />' 
		
        //+'<input id="false_' + counter + '" name="bool' + counter + '[]" type="radio" value="false"/>False'   
		+ '<p>\n\n</p>'
        );
    });
});
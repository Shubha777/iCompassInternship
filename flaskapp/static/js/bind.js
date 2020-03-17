
var data=[];

function addBr(text){
    return text.replace(/\n/g, "<br />");

}
var Message;
Message = function (arg) {
    this.text = arg.text, this.message_side = arg.message_side;
    this.image = arg.image, this.message_side = arg.message_side ;
    this.buttons = arg.buttons 

    this.draw = function (_this) {
        return function () {
            var $message;
            if (this.text){
            $message = $($('.message_template').clone().html());
            $message.addClass(_this.message_side).find('.text').html(addBr(_this.text));
            $('.messages').append($message);
            return setTimeout(function () {
                return $message.addClass('appeared');
            }, 0);
        }
        if (this.image)
        {           
            $message = $($('.message_template ').clone().html());
            $message.addClass(_this.message_side)
            .html(addBr('<div class="singleCard">' +'<img class="imgcard" src="' + _this.image + '">'));
            $('.messages').append($message);
            return setTimeout(function () {
                return $message.addClass('appeared');
            }, 0);
        }

        if (this.buttons)
        {
          {
            var suggestions = this.buttons;
            var suggLength = this.buttons.length;
            $message = $($('.message_template').clone().html());
            $message
            .html(addBr('<div class="singleCard"> <div class="suggestions"><div class="menu"></div></div></diV>'));
            $('.messages').append($message);
            // Loop through suggestions
            for (i = 0; i < suggLength; i++) {
                $('<div class="menuChips" data-payload=\''+(suggestions[i].payload)+'\'>' + suggestions[i].title + "</div>").appendTo(".menu");
            }
            return setTimeout(function () {
                return $message.addClass('appeared');
            }, 0);
        }
    }

         }
    }(this);
    return this;
};

//here I have to add the other functionality : buttons + images
function showBotMessage(msg){
       
        for (i=0 ; i < msg.length; i++)
        {     
            if(msg[i].hasOwnProperty("text"))
            {
                readOutLoud(msg[i].text);
                message = new Message({
                    text: msg[i].text, 
                    message_side: 'left'
               });

               message.draw();
               $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
            }
            if(msg[i].hasOwnProperty("image"))
            {
                message = new Message({
                    image: msg[i].image, 
                    message_side: 'left'
               });

               message.draw();
               $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
            }

            if (msg[i].hasOwnProperty("buttons")) {

                message = new Message({
                    buttons: msg[i].buttons, 
                    message_side: 'left'
               });
                
               message.draw();
               $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
            }
        }
}

function showUserMessage(msg){
    $messages = $('.messages');
    message = new Message({
        text: msg,
        message_side: 'right'
    });
    message.draw();
    $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
    $('#msg_input').val('');
}
// say to bot handles the communication between flask route "chat" and the js:
// if there is a response from the bot it would call showBotMessage which would
// show up the result on the screen
function sayToBot(text){
    document.getElementById("msg_input").placeholder = "Ecrire votre message ici ..."
    $.post("/chat",
            {
                //csrfmiddlewaretoken:csrf,
                text:text,
            },
            function(jsondata, status){
                if(jsondata["status"]=="success"){
                    data=jsondata;
                    response = jsondata["response"] ; 
                   // console.log(data);
                    if(response){showBotMessage(response);}
                }
            });

}
getMessageText = function () {
    var $message_input;
    $message_input = $('.message_input');
    return $message_input.val();
};

$("#say").keypress(function(e) {
if(e.which == 13) {
$("#saybtn").click();
}
});

$('.send_message').click(function (e) {
msg = getMessageText();
if(msg){
showUserMessage(msg);
sayToBot(msg);
$('.message_input').val('');
}
});

$('.message_input').keyup(function (e) {
if (e.which === 13) {
msg = getMessageText();
if(msg){
showUserMessage(msg);
sayToBot(msg);
$('.message_input').val('') ;
}
}
});


// ------------------------------------------ Toggle chatbot -----------------------------------------------
$('#profile_div').click(function () {
	$('.profile_div').toggle();
	$('.chat_window').toggle();
});

$('#close').click(function () {
	$('.profile_div').toggle();
	$('.chat_window').toggle();
});


// on click of suggestions, get the value and send to rasa
$(document).on("click", ".menu .menuChips", function () {
	var text = this.innerText;
	var payload= this.getAttribute('data-payload');
	console.log("button payload: ",this.getAttribute('data-payload'))
    showUserMessage(text);
    sayToBot(text);
    $('.message_input').val('');
    $('.suggestions').remove(); //delete the suggestions  
});

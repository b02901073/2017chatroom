$('input[type="submit"]').mousedown(function() {
    $(this).css('background', '#2ecc71');
});
$('input[type="submit"]').mouseup(function() {
    $(this).css('background', '#1abc9c');
});

$('#loginform').click(function() {
    $('.login').fadeToggle('slow');
    $(this).toggleClass('green');
});

$('#login_click').click(function() {
    console.log('login confirmation');
    window.location.href = 'chat.html';
});

$('#registerform').click(function() {
    $('.register').fadeToggle('slow');
    $(this).toggleClass('green');
});

$('#regis_click').click(function() {
    console.log('register confirmation');
    window.location.href = 'login.html';
});

$(document).mouseup(function(e) {
    var container = $(".login");
    var container2 = $(".register");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide();
        $('#loginform').removeClass('green');
    }
    if (!container2.is(e.target) // if the target of the click isn't the container...
        && container2.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container2.hide();
        $('#registerform').removeClass('green');
    }
});

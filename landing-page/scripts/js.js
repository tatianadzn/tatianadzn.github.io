$(document).ready(function(){
    $('.sidenav')
        .sidenav()
        .on('click tap', 'li a', () => {
            $('.sidenav').sidenav('close');
        });
});

$('#textarea1').val('');
M.textareaAutoResize($('#textarea1'));
$(document).ready(function () {

    $('.js--remove').on('click', function (e){
        e.preventDefault();

        $(this).closest('section').remove();
        $('.js--event-data').css({
            height: 'auto',
            overflow: 'hidden'
        });
    })
});
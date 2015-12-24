$(document).ready(function() {
    $('#articleDelete').click(function(e) {
        e.preventDefault();

        var link = $(this).attr('href');
        $.ajax({
            url: link,
            type: 'DELETE',
            success: function(result) {
                window.location.replace('/articles/?message=deleted');
            }
        });
    });
});
$(document).ready(function() {
    $('#articleDelete').click(function(e) {
        e.preventDefault();

        var link = $(this).attr('href');
        $.ajax({
            url: link,
            type: 'DELETE',
            dataType: 'json',
            success: function(result) {
                window.location.replace('/articles');
            },
            error: function(err) {
                console.log(err);
            }
        });
    });
});
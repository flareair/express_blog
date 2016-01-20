$(document).ready(function() {

    // article form submit handler
    $('#articleForm button[type="submit"]').click(function(e) {
        e.preventDefault();
        var $form = $('#articleForm');
        var link = $form.attr('action');

        var data = {};
        // normalize serialized form data
        $.map($form.serializeArray(), function(item){
            data[item['name']] = item['value'];
        });
        // Clears form warnings
        function clearWarnings() {
            $form.find('.form-group').each(function() {
                $(this).removeClass('has-error');
                $(this).find('span').remove();
            });
        }

        // ajax request
        $.ajax({
            url: link,
            // chooses type of request
            type: (link === '/articles/add') ? 'POST': 'PUT',
            data: data,
            dataType: 'json',
            success: function(result) {
                // redirects on success
                window.location.replace('/articles/' + result.id);
            },
            error: function(err) {
                // console.log(err);
                clearWarnings();
                var errors = err.responseJSON;
                // show errors
                for (var error in errors) {
                    var $field = $form.find('[name='+ errors[error].path +']');

                    $field.after('<span class="help-block">' + errors[error].message +'</span>');

                    $field.parent().addClass('has-error');

                }
            }
        });

    });
});
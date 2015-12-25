$(document).ready(function() {
    $('#articleForm button[type="submit"]').click(function(e) {
        e.preventDefault();
        var $form = $('#articleForm');
        var link = $form.attr('action');

        var data = {};

        $.map($form.serializeArray(), function(item){
            data[item['name']] = item['value'];
        });

        function clearWarnings() {
            $form.find('.form-group').each(function() {
                $(this).removeClass('has-error');
                $(this).find('span').remove();
            });
        }

        $.ajax({
            url: link,
            type: (link === '/articles/add') ? 'POST': 'PUT',
            data: data,
            dataType: 'json',
            success: function(result) {
                window.location.replace('/articles/' + result.id);
            },
            error: function(err) {
                console.log(err);
                clearWarnings();
                var errors = err.responseJSON;
                for (var error in errors) {
                    var $field = $form.find('[name='+ errors[error].path +']');

                    $field.after('<span class="help-block">' + errors[error].message +'</span>');

                    $field.parent().addClass('has-error');

                }
            }
        });

    });
});
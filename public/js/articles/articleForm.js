$(document).ready(function() {
    $('#articleForm button[type="submit"]').click(function(e) {
        e.preventDefault();
        var $form = $('#articleForm');
        var link = $form.attr('action');

        var ajaxProps = {};

        if (link === '/articles/add') {
            ajaxProps.type = 'POST';
            ajaxProps.successCb = function(result) {
                window.location.replace('/articles/' + result.id + '/?message=saved');
            };
        } else {
            ajaxProps.type = 'PUT',
            ajaxProps.successCb = function(result) {
                // console.log(result);
                window.location.replace('/articles/' + result.id + '/?message=updated');
            };
        }

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
            type: ajaxProps.type,
            data: data,
            dataType: 'json',
            success: ajaxProps.successCb,
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

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function checkAnswer(form)
{
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
            if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            }
        });
      $.ajax({
            type:"POST",
            url:"/check",
            data:$(form).serialize(),
            beforeSend: function(xhr, settings) {
                $.ajaxSettings.beforeSend(xhr, settings);
            },
            success:function(data)
            {
            console.log(data);
              // console.log(data);
              if(data.trim()=="0")
              {
                $.notify({
                      message: 'Flag is incorrect!'
                    },{
                      type: 'danger'
                    });
              }
              else if(data.trim()=="-1")
              {
                $.notify({
                      message: 'Please select the difficulty level!'
                    },{
                      type: 'warning'
                    });
              }
              else if(data.trim()=="2")
              {
                $.notify({
                      message: 'Already Solved!'
                    },{
                      type: 'info'
                    });
              }
              else if(data.trim()=="1")
              {
               // $('input').val("solved");
                $.notify({
                      message: 'Flag is correct!'
                    },{
                      type: 'success'
                    });
              }
            }
          });
}
function getHint(hintId)
{
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
            if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            }
        });
      $.ajax({
            type:"POST",
            url:"/hint",
            data:{id : hintId},
            beforeSend: function(xhr, settings) {
                $.ajaxSettings.beforeSend(xhr, settings);
            },
            success:function(data)
            {
              console.log(data);
//
            $('#hintParagraph').html(data);
            }
          });
}
function getFile(hintId)
{
        $.ajaxSetup({
            beforeSend: function(xhr, settings) {
            if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                }
            }
        });
      $.ajax({
            type:"POST",
            url:"/file",
            data:{id : hintId},
            beforeSend: function(xhr, settings) {
                $.ajaxSettings.beforeSend(xhr, settings);
            },
            xhrFields: {
              responseType: 'blob'
          },
            success:function(data)
            {
              const blob = new Blob([data], { type: 'application/zip' });                
                // Create a temporary anchor element
                const a = document.createElement('a');
                a.style.display = 'none';
                
                // Set the URL of the blob as the href attribute
                a.href = URL.createObjectURL(blob);
                
                // Set the download attribute with desired file name
                a.download = 'filename.zip'; // You can provide any filename and extension
                
                // Append the anchor element to the body
                document.body.appendChild(a);
                
                // Trigger a click event to start the download
                a.click();
                
                // Cleanup
                URL.revokeObjectURL(a.href);
                document.body.removeChild(a);
//
            $('#hintParagraph').html(data);
            }
          });
}

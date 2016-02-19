$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  var add_task = $('.add_task');
  $('#add_task_area').on('click', '.add_task', function(e){
    e.preventDefault();
    $.ajax({
      url: '/tasks/new',
      method: 'GET',
      dataType: 'text',
    }).done(function(response) {
      console.log(response)
      $('#task_list').append(response)
    });
    $(this).remove();
  });

  $('#task_list').on('submit', 'form', function(e){
    e.preventDefault();
    var formInput = $(this).serialize()
    $.ajax({
      url: '/tasks',
      method: 'POST',
      data: formInput
    }).done(function(response){
      $('#task_list ul').append(response);
    });
    $(this).remove();
    $('#add_task_area').append(add_task)
  }) ;

  $('#task_list').on('click', '.delete_button', function(e){
    e.preventDefault();
    console.log($(this).parent().attr('id'))
    var data = {task_id: $(this).parent().attr('id')}
    $.ajax({
      url: '/tasks',
      method: 'DELETE',
      data: data
    }).done(function(response){
    $('#'+response).remove();
  });
  });
  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});

// TODOS
// *-- Make sure that the 3rd milestone works
// * Make sure that add new milestone works
// * Make use of a template system
// * Some basic validation in the dates

var counter = 3;

$(document).ready(function () {
  initDateTimePickers();
  initDeleteButtons();
  initAddMilestone();
  initDownloadCSVForm();
  //moustacheTrial();
});

var moustacheTrial= function(){
  var template = $('#template').html();
  console.log(template);
  Mustache.parse(template);   // optional, speeds up future uses
  var rendered = Moustache.render(template);
  $('#target').html(rendered);
};

var initDownloadCSVForm = function(){
  $('form.download_csv').on('submit', function(e){
    e.preventDefault();
    // Gather all the form data and send it to server
    data = $(this).serialize();

    $.ajax({
      type: 'POST',
      url: '/milestones',
      data: data,
      dataType: 'json',
      success: function(e){
        downloadFile('Projectworkflow.csv', e.file);
      },
      error: function(e){
        console.log('error', e);
      }
    });
    this.reset();
  });
};

var downloadFile = function(filename, data){
  var element = document.createElement('a');
  element.setAttribute('href', "data:text/csv;charset=utf-8," + encodeURIComponent(data));
  element.setAttribute('download', filename);
  element.style.display = 'none';

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

var initDeleteButtons = function(){
  $(document).on('click', '.milestone .deletebutton', function(e){
    e.preventDefault();
    $(this).parents('.milestone').remove();
  });
};

var initDeleteButton = function (element){
  element.on('click', '.milestone .deletebutton', function(e){
    console.log('click');
    e.preventDefault();
    $(this).parents('.milestone').remove();
  });
};

var initDateTimePickers = function(){
  $('.datetimepicker').datetimepicker({
    format: 'YYYY/MM/DD HH:mm'
  });
};

var initDateTimePicker = function(element){
    console.log("Inside initDatetimepicker");
    $(element).datetimepicker({
      format: 'YYYY/MM/DD HH:mm'
    });
};

var initAddMilestone = function() {
  $(document).on('click', '.add_milestone', function(e){
    e.preventDefault();
    addMileStone();
  });
};

var addMileStone = function(){
  var milestone = $('#template');
  milestone = $("<div class='row milestone'> \
      <div class='col-sm-3'>\
        <input type='text' name='milestone["+counter+"][name]' class='form-control input-lg milestonename' placeholder='Name of Milestone' /> \
      </div> \
      <div class='col-sm-4'> \
          <div class='form-group'> \
              <div class='input-group date'> \
                  <input type='text' name='milestone["+counter+"][start-time]' class='form-control input-lg datetimepicker start-time' placeholder='Start Date and Time'/> \
                  <span class='input-group-addon'> \
                      <span class='glyphicon glyphicon-time'></span> \
                  </span> \
              </div> \
          </div> \
      </div> \
      <div class='col-sm-4'> \
          <div class='form-group'> \
              <div class='input-group date'> \
                  <input type='text' name='milestone["+counter+"][end-time]'class='form-control input-lg datetimepicker end-time' placeholder='End Date and Time'/> \
                  <span class='input-group-addon'> \
                      <span class='glyphicon glyphicon-time'></span> \
                  </span> \
              </div> \
          </div> \
      </div> \
      <div class='col-sm-1'> \
          <button type='button' class='btn btn-lg btn-danger deletebutton'> \
            <span class='glyphicon glyphicon-trash'></span>&nbsp; \
          </button> \
        </div> \
    </div> ");
  console.log("MILESTONE", milestone);
  button = milestone.find('button');
  initDeleteButton(button);

  picker = milestone.find('.datetimepicker');

  initDateTimePicker(picker);
  $('.milestones').append(milestone);
  counter++;
};

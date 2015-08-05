var counter = 3;

$(document).ready(function () {
  initDateTimePickers();
  initDeleteButtons();
  initAddMilestone();
  initDownloadCSVForm();
  initLinkagesOnClick();
});

//*************
//DOWNLOAD
//*************

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



//***************
//INITIALIZATIONS
//***************

var initDeleteButtons = function(){
  $(document).on('click', '.milestone .deletebutton', function(e){
    e.preventDefault();
    $(this).parents('.milestone').remove();
  });
};


var initDateTimePickers = function(){
  $('.datetimepicker').datetimepicker({
    format: 'YYYY/MM/DD HH:mm'
  });
};


var initLinkagesOnClick = function (){
  $('.start_datetimepicker').on("dp.change", function(e){
    $(e.currentTarget).parents('.milestone').find('.end_datetimepicker').data("DateTimePicker").minDate(e.date);
  });
};

var initLinkageOnClick = function (element){
  element.find('.start_datetimepicker').on("dp.change", function(e){
    element.find('.end_datetimepicker').data("DateTimePicker").minDate(e.date);
  });
};


var initAddMilestone = function() {
  $(document).on('click', '.add_milestone', function(e){
    e.preventDefault();
    addMileStone();
  });
};





//***************
//ADD MILESTONES
//***************

var addMileStone = function(){

  var template = $('#milestone_template').html();
  Mustache.parse(template); // optional, but makes stuff faster
  var rendered = Mustache.render(template, {counter: counter});
  milestone = $(rendered);
  $('.milestones').append(milestone);
  initDateTimePickers();
  initLinkageOnClick(milestone);

  counter++;
};




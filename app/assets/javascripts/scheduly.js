// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/
/*jshint multistr: true */

var milestonenames = [];
var startdates = [];
var starttimes = [];
var enddates = [];
var endtimes = [];
var finalinfo = [];


$(document).ready(function () {
  initDateTimePickers();
  initDeleteButtons();
  initAddMilestone();
  downloadCSV();
});



//MAIN FUNCTION TO DOWNLOAD CSV
var downloadCSV = function(){
  //Disable Download Button
  $('.download').click(function(){
    $('.download').prop('disabled',true);
  });

  //STEP 1: Compile all the needed information from inputs
  compileInfo();

  //STEP 2: Prepare the dates, times, etc.
  prepareFile();

  //STEP 3: Downloads the file
  downloadFile();

  //STEP 4: Reset Everything
  resetForm();

};


//STEP 1: Compile all the needed information from inputs
var compileInfo = function(){
  $('.download').click(function(){
    $('.milestonename').each(function(){
      milestonenames.push($(this).val());
    });
    console.log(milestonenames);
  });

  $('.download').click(function(){
    $('.start-time').each(function(){
      var startd = $(this).val().substring(0,10);
      var startt = $(this).val().substring(11,19);
      startdates.push(startd);
      starttimes.push(startt);
    });
    console.log(startdates);
    console.log(starttimes);
  });

  $('.download').click(function(){
    $('.end-time').each(function(){
      var endd = $(this).val().substring(0,10);
      var endt = $(this).val().substring(11,19);
      enddates.push(endd);
      endtimes.push(endt);
    });
    console.log(endtimes);
    console.log(enddates);
  });
};


//STEP 2: Prepare the dates, times, etc.
var prepareFile = function(){
  $('.download').click(function(){
    finalinfo.push(["Subject","Start Date","Start Time","End Date","End Time","All Day Event","Description","Location","Private"]);
    for (var i = 0, l=milestonenames.length; i<l; ++i){
      var temp = [];
      temp.push(milestonenames[i]);
      temp.push(startdates[i]);
      temp.push(starttimes[i]);
      temp.push(enddates[i]);
      temp.push(endtimes[i]);
      temp.push("FALSE");
      temp.push("A cool event!");
      temp.push("Somewhere over the rainbow!");
      temp.push("FALSE");
      console.log(temp);
      finalinfo.push(temp);
    }
    //finalinfo.push(milestonenames, startdates, starttimes, enddates, endtimes);
    console.log(finalinfo);
  });
};


//STEP 3: Downloads the file
var downloadFile = function(){
  $('.download').click(function(){
    //Populates CSV
    var csvRows = [];

    for(var i=0, l=finalinfo.length; i<l; ++i){
        csvRows.push(finalinfo[i].join(','));
    }

    console.log("csv", csvRows);

    //Creates file
    var csvString = csvRows.join("\r\n");

    console.log("csvString", csvString);

    var a         = document.createElement('a');
    a.href        = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csvString);
    a.target      = '_blank';
    a.download    = 'projectworkflow.csv';

    document.body.appendChild(a);
    a.click();

  });
};

//STEP 4: Reset Everything
var resetForm = function(){
  $('.download').click(function(){
    milestonenames = [];
    startdates = [];
    starttimes = [];
    enddates = [];
    endtimes = [];
    finalinfo = [];
    $('.download').prop("disabled", false);
  });
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
  $('.datetimepicker').datetimepicker();
};

var initDateTimePicker = function(element){
    console.log("Inside initDatetimepicker");
    $(element).datetimepicker();
};

var initAddMilestone = function() {
  $(document).on('click', '.add_milestone', function(e){
    e.preventDefault();
    addMileStone();
  });
};

var addMileStone = function(){
  milestone = $("<div class='row milestone'> \
      <div class='col-sm-3'>\
        <input type='text' class='form-control input-lg milestonename' placeholder='Name of Milestone' /> \
      </div> \
      <div class='col-sm-4'> \
          <div class='form-group'> \
              <div class='input-group date'> \
                  <input type='text' class='form-control input-lg datetimepicker start-time' placeholder='Start Date and Time'/> \
                  <span class='input-group-addon'> \
                      <span class='glyphicon glyphicon-time'></span> \
                  </span> \
              </div> \
          </div> \
      </div> \
      <div class='col-sm-4'> \
          <div class='form-group'> \
              <div class='input-group date'> \
                  <input type='text' class='form-control input-lg datetimepicker end-time' placeholder='End Date and Time'/> \
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



  button = milestone.find('button');
  console.log("button", button);
  initDeleteButton(button);

  picker = milestone.find('.datetimepicker');
  console.log("picker", picker);

  initDateTimePicker(picker);
  $('.milestones').append(milestone);
  counter++;
};

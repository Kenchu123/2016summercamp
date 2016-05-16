    $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });
 

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 32 
    });

    $(".button-collapse").sideNav();

    $(document).ready(function() {
        $('select').material_select();
    });

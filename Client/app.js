
(function($){
    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
          Genre : this["genre"].value,
        	Director: this["director"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        }).then(location.reload());

        e.preventDefault();
    }
    
    $('#my-form').submit( processForm );
  })(jQuery);

  
   $("#getMovieButton").click(function(){
    var edit = document.getElementById("editContainer");
    var add = document.getElementById("addContainer");

    if (edit.style.display === "block") {
      edit.style.display = "none";
    }
    if (add.style.display === "block"){
      add.style.display === "none";
    }
      let id = $("#movieSelector option:selected").val();

    $.ajax({
      url: 'https://localhost:44325/api/movie/'+ id,
      dataType: 'json',
      type: 'GET'
    }).then(function(data){
      
      $("#search").html("");
      let title = data["title"];
      let genre = data["genre"];
      let director = data["director"];
      if(title !== undefined && genre !== undefined && director !== undefined){
        var header = $(` <tr class=' bg-info text-center text-dark'><th> ` + title + ` </th> <th> ` + genre + `</th><th> ` + director + `</th>`);
        $("#search").append(header);
      }
      

    });
    
  });

  $('#editMovieButton').click(function(e){

    
    let id = $("#movieSelector option:selected").val();
    
    $("#search").html("");
    var edit = document.getElementById("editContainer");
    var add = document.getElementById("addContainer");
  if (edit.style.display === "none" && id !== "") {
    edit.style.display = "block";
  } else {
    edit.style.display = "none";
  }
  if (add.style.display === "block") {
    add.style.display = "none";
  }
    // display movie

    $.ajax({
      url: 'https://localhost:44325/api/movie/'+ id,
      dataType: 'json',
      type: 'GET'
    }).then(function(data){
      
      $("#search").html("");
      let title = data["title"];
      let genre = data["genre"];
      let director = data["director"];
      if(title !== undefined && genre !== undefined && director !== undefined){
      var header = $(` <tr class=' bg-warning text-center text-dark'><th> ` + title + ` </th> <th> ` + genre + `</th><th> ` + director + `</th>`);
      $("#search").append(header);
      }
    });
  });

  $('#addMovieButton').click(function(e){
    
    $("#search").html("");
  
    var add = document.getElementById("addContainer");
    var edit = document.getElementById("editContainer");
  if (add.style.display === "none") {
    add.style.display = "block";
  } else {
    add.style.display = "none";
  }
  if (edit.style.display === "block") {
    edit.style.display = "none";
  }
  });

  $('#deleteMovieButton').click(function(e){
    
    let id = $("#movieSelector option:selected").val();
    $.ajax({
      url: 'https://localhost:44325/api/movie/' + id,
      type: 'delete',
      success: function(response){
        location.reload();
      }
    });
  });
  
$(document).ready(function(){
  $.ajax({
      url: 'https://localhost:44325/api/movie',
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      success: function( data, textStatus, jQxhr ){

        var header = $(" <tr class='text-center'><th> " + 'Title ' + " </th> <th> " + "Genre " + "</th><th> " + "Director"+ "</th><tr> ");

        $("#response #movies").append(header);
        for(let i = 0; i < data.length; i ++ ){

          let title = data[i]["title"];
          let genre = data[i]["genre"];
          let director = data[i]["director"];
          
          var movie = $("<tr class='text-center'><td>"+ title +"</td><td>"+ genre +" </td><td> "+ director +"</td>");
          $('#movieSelector').append(`<option value='${data[i].movieId}'>${title}</option>`);
          $("#response #movies").append(movie);
        }

        //  $('#response pre').html( data );
      },
      error: function( jqXhr, textStatus, errorThrown ){
          console.log( errorThrown );
      }
  });
}) 
    //   console.log("hello");
    //   let id = $("#movieSelector option:selected").val();
    //   console.log(id); // "5"
    //   id = parseInt(id); // "5" => 5
    //   console.log(id); // 5 

    //   $.get("https://localhost:44325/api/movie/5", function(data, status){
    //     console.log('success');
    //     alert("success");
    //     console.log(status);
    //     //console.log(`${data[0]}`);
    //     // $('#response pre').apend("hello world");
    //   },function(data,status){
    //     console.log('fail');
    //   })
    // });


//})(jQuery);


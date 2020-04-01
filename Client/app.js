
(function($){
    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
          Genre : this["genre"].value,
        	Director: this["director"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie/',
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
        });

        e.preventDefault();
    }
    $('#my-form').submit( processForm );
  })(jQuery);

   $("#getMovieButton").click(function(){

      let id = $("#movieSelector option:selected").val();

    $.ajax({
      url: 'https://localhost:44325/api/movie/'+ id,
      dataType: 'json',
      type: 'GET'
    }).then(function(data){
      
      let title = data["title"];
      let genre = data["genre"];
      let director = data["director"];
      var header = $(" <tr class='text-center bg-info text-dark col-sm-12'><th> " + title + " </th> <th> " + genre + "</th><th> " + director + "</th><tr> ");
      // alert("title: " + title + "\n" +
      //       "genre: " + genre + "\n" +
      //       "director: " + director + "\n");
      $("#search").append(header);

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


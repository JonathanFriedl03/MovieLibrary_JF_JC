(function($){
    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
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
        });

        e.preventDefault();
    }


    $('#my-form').submit( processForm );

    $(document).ready(function(){
      $.ajax({
          url: 'https://localhost:44325/api/movie',
          dataType: 'json',
          type: 'get',
          contentType: 'application/json',
          success: function( data, textStatus, jQxhr ){

            var header = $(" <tr><th> " + 'Title ' + " </th> <th> " + "Genre " + "</th><th> " + "Director"+ " </th><tr> ");

            $("#response pre").append(header);
            for(let i = 0; i < data.length; i ++ ){

              let title = data[i]["title"];
              let genre = data[i]["genre"];
              let director = data[i]["director"];
              var movie = $(" <tr><td> "+ title +" </td><td> "+ genre +" </td><td> "+ director +" </td> ");
              $("#response pre").append(movie);
            }

            //  $('#response pre').html( data );
          },
          error: function( jqXhr, textStatus, errorThrown ){
              console.log( errorThrown );
          }
      });
    })
})(jQuery);

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPISample.Data;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    [Route("api/[controller]")] 
    [ApiController]
    public class MovieController : ControllerBase
    {
        private ApplicationContext _context;
        public MovieController(ApplicationContext context)
        {
            _context = context;
        }
        // GET api/movie
        [HttpGet]
        public IActionResult Get()
        {
            // Retrieve all movies from db logic
            var movieList = _context.Movies.ToList(); // sends back a list of movies
            return Ok(movieList);
        }

        // GET api/movie/5
        [HttpGet("{id}")] // get movie by id
        public IActionResult Get(int id) // trying to use postman to send an id and get a single movie
        {
            // Retrieve movie by id from db logic
            var movie = _context.Movies.Where(m => m.MovieId == id).SingleOrDefault();
            // return Ok(movie);
            return Ok(new string[] { movie.Title, movie.Genre, movie.Director });
        }

        // POST api/movie
        [HttpPost]
        public IActionResult Post([FromBody]Movie value)
        {
            // Create movie in db logic
            return Ok();
        }

        // PUT api/movie
        [HttpPut]
        public IActionResult Put([FromBody] Movie movie)
        {
            // Update movie in db logic
            _context.Movies.Add(movie);
            _context.SaveChanges();
            return Ok();
        }

        // DELETE api/movie/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // Delete movie from db logic
            return Ok();
        }
    }
}
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
<<<<<<< HEAD
            var movie = _context.Movies;
            if (movie == null)
            {
                return BadRequest();
            }
            return Ok(_context.Movies);

=======
            var movieList = _context.Movies.ToList();
            return Ok(movieList);
>>>>>>> aecef619c206c748a9a1148c8639bf7e91b58814
        }

        // GET api/movie/5
        [HttpGet("{id}")] // get movie by id
        public IActionResult Get(int id)
        {
            // Retrieve movie by id from db logic
            var movie = _context.Movies.Where(m => m.MovieId == id).SingleOrDefault();
            return Ok(movie);
            //return Ok(new string[] { movie.Title, movie.Genre, movie.Director });
        }

        // POST api/movie
        [HttpPost]
        public IActionResult Post([FromBody] Movie value)
        {
            // Create movie in db logic
            Movie movie = new Movie();
            movie.Title = value.Title;
            movie.Genre = value.Genre;
            movie.Director = value.Director;
            _context.Movies.Add(movie);
            _context.SaveChanges();
            return Ok();
        }

        // PUT api/movie
        [HttpPut]
        public IActionResult Put([FromBody] Movie movie)
        {
            // Update movie in db logic
            Movie movieToEdit = _context.Movies.Where(m => m.MovieId == movie.MovieId).SingleOrDefault();
            movieToEdit.Title = movie.Title;
            movieToEdit.Genre = movie.Genre;
            movieToEdit.Director = movie.Director;
            _context.SaveChanges();
            return Ok();
        }

        // DELETE api/movie/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Movie movie = _context.Movies.Where(m => m.MovieId == id).SingleOrDefault();
            _context.Remove(movie);
            _context.SaveChanges();
            // Delete movie from db logic
            return Ok();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API_Assignment.Data;
using API_Assignment.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_Assignment.Controllers
{
    [Route( "api/[controller]" )]
    [ApiController]
    public class ManufacturerApiController : ControllerBase
    {
        private readonly DatabaseContext _context;
        public ManufacturerApiController( DatabaseContext context )
        {
            _context = context;
        }
        // GET: api/ManufacturerApi
        [HttpGet]
        public IEnumerable<VehicleManufacturer> Get()
        {
            return _context.Manufacturers.ToArray();
        }

        // GET: api/ManufacturerApi/5
        [HttpGet( "{id}" )]
        public ActionResult<VehicleManufacturer> Get( string id )
        {
            int providedID;
            try
            {
                providedID = int.Parse( id );
            }
            catch
            {
                return BadRequest();
            }
            try
            {
                VehicleManufacturer found = _context.Manufacturers.Where( x => x.ID == providedID ).Single();
                return found;
            }
            catch
            {
                return NotFound();
            }
        }

        // POST: api/ManufacturerApi
        [HttpPost]
        public ActionResult Post( string name )
        {
            if ( string.IsNullOrWhiteSpace( name ) )
            {
                return BadRequest();
            }
            try
            {
                if ( _context.Manufacturers.Any( x => x.Name.ToUpper() == name.ToUpper() ) )
                {
                    return BadRequest( "Already Exist" );
                }
                else
                {
                    _context.Manufacturers.Add( new VehicleManufacturer() { Name = name } );
                    _context.SaveChanges();
                    return Ok();
                }
            }
            catch
            {
                return StatusCode( 500 );
            }
        }

        // PUT: api/ManufacturerApi/5
        [HttpPut( "{id}" )]
        public ActionResult Put( string id, string name )
        {
            int providedID;
            VehicleManufacturer found;
            try
            {
                providedID = int.Parse( id );
            }
            catch
            {
                return BadRequest();
            }
            try
            {
                found = _context.Manufacturers.Where( x => x.ID == providedID ).Single();
            }
            catch
            {
                return NotFound();
            }
            if ( string.IsNullOrWhiteSpace( name ) )
            {
                return BadRequest();
            }
            try
            {
                if ( _context.Manufacturers.Any( x => x.Name.ToUpper() == name.ToUpper() ) )
                {
                    return BadRequest( "Already Exist" );
                }
                else
                {
                    found.Name = name ?? found.Name;
                    _context.SaveChanges();
                    return Ok();
                }
            }
            catch
            {
                return StatusCode( 500 );
            }
        }

        // DELETE: api/ManufacturerApi/5
        [HttpDelete( "{id}" )]
        public ActionResult Delete( string id )
        {
            VehicleManufacturer found;
            int providedID;
            try
            {
                providedID = int.Parse( id );
            }
            catch
            {
                return BadRequest();
            }
            try
            {
                found = _context.Manufacturers.Where( x => x.ID == providedID ).Single();
            }
            catch
            {
                return NotFound();
            }
            try
            {
                _context.Manufacturers.Remove( found );
                _context.SaveChanges();
                return Ok();
            }
            catch
            {
                return StatusCode( 500 );
            }
        }
    }
}

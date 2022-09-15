using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using API_Assignment.Data;
using API_Assignment.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_Assignment.Controllers
{
    [Route( "api/[controller]" )]
    [ApiController]
    public class ModelApiController : ControllerBase
    {
        private readonly DatabaseContext _context;
        public ModelApiController( DatabaseContext context )
        {
            _context = context;
        }
        // GET: api/ModelApi
        [HttpGet]
        public IEnumerable<VehicleModel> Get()
        {
            return _context.Models.ToArray();
        }

        // GET: api/ModelApi/5
        [HttpGet( "{id}" )]
        public ActionResult<VehicleModel> Get( string id )
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
                VehicleModel found = _context.Models.Where( x => x.ID == providedID ).Single();
                return found;
            }
            catch
            {
                return NotFound();
            }
        }

        // POST: api/ModelApi
        [HttpPost]
        public ActionResult Post( string manufacturerID, string name )
        {
            int providedManufacturerID;
            //VehicleModel found;
            if ( string.IsNullOrWhiteSpace( manufacturerID ) || string.IsNullOrWhiteSpace( name ) )
            {
                return BadRequest();
            }
            try
            {
                providedManufacturerID = int.Parse( manufacturerID );
            }
            catch
            {
                return BadRequest();
            }
            try
            {
                _context.Manufacturers.Where( x => x.ID == providedManufacturerID ).Single();
            }
            catch
            {
                return NotFound( "Manufacturer ID not found" );
            }
            try
            {

                _context.Models.Add( new VehicleModel() { ManufacturerID = providedManufacturerID, Name = name } );
                _context.SaveChanges();
                return Ok();
            }
            catch
            {
                return StatusCode( 500 );
            }
        }

        // PUT: api/ModelApi/5
        [HttpPut( "{id}" )]
        public ActionResult Put( string id, string manufacturerID, string name )
        {
            int providedManufacturerID;
            int providedID;
            VehicleModel found;
            if ( string.IsNullOrWhiteSpace( manufacturerID ) || string.IsNullOrWhiteSpace( name ) )
            {
                return BadRequest();
            }
            try
            {
                providedID = int.Parse( id );
                providedManufacturerID = int.Parse( manufacturerID );
            }
            catch
            {
                return BadRequest();
            }
            try
            {
                _context.Manufacturers.Where( x => x.ID == providedManufacturerID ).Single();
            }
            catch
            {
                return NotFound( "Manufacturer ID not found" );
            }
            try
            {
                found = _context.Models.Where( x => x.ID == providedID ).Single();
            }
            catch
            {
                return NotFound();
            }


            try
            {
                found.ManufacturerID = providedManufacturerID;
                found.Name = name ?? found.Name;
                _context.SaveChanges();
                return Ok();

            }
            catch
            {
                return StatusCode( 500 );
            }

        }

        // DELETE: api/ModelApi/5
        [HttpDelete( "{id}" )]
        public ActionResult Delete( string id )
        {
            VehicleModel found;
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
                found = _context.Models.Where( x => x.ID == providedID ).Single();
            }
            catch
            {
                return NotFound();
            }
            try
            {
                _context.Models.Remove( found );
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

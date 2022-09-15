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
    public class VehicleApiController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public VehicleApiController( DatabaseContext context )
        {
            _context = context;
        }
        // GET: api/VehicleApi
        [HttpGet]
        public IEnumerable<Vehicle> Get()
        {
            return _context.Vehicles.ToArray();
        }

        // GET: api/VehicleApi/5
        [HttpGet( "{vin}" )]
        public ActionResult<Vehicle> Get( string vin )
        {
            try
            {
                Vehicle found = _context.Vehicles.Where( x => x.VIN == vin ).Single();
                return found;
            }
            catch
            {
                return NotFound();
            }
        }

        // POST: api/VehicleApi
        [HttpPost]
        public ActionResult Post( string vin, string modelID, string dealershipID, string trimLevel )
        {
            int providedModelID;
            int providedDealershipID;
            if ( string.IsNullOrWhiteSpace( vin ) || string.IsNullOrWhiteSpace( modelID ) || string.IsNullOrWhiteSpace( dealershipID ) || string.IsNullOrWhiteSpace( trimLevel ) )
            {
                return BadRequest();
            }
            try
            {
                providedModelID = int.Parse( modelID );
                providedDealershipID = int.Parse( dealershipID );
            }
            catch
            {
                return BadRequest();
            }
            if ( _context.Vehicles.Any( x => x.VIN == vin ) )
            {
                return BadRequest( "Already Exist" );
            }
            if ( vin.Length > 17 || vin.Any( x => !char.IsLetterOrDigit( x ) ) )
            {

                return BadRequest();
            }
            try
            {
                _context.Models.Where( x => x.ID == providedModelID ).Single();
            }
            catch
            {
                return NotFound( "Model Does not Exist" );
            }
            try
            {
                _context.Dealerships.Where( x => x.ID == providedDealershipID ).Single();
            }
            catch
            {
                return NotFound( "Dealer Does not Exist" );
            }
            try
            {
                _context.Vehicles.Add( new Vehicle() { VIN = vin, ModelID = providedModelID, DealershipID = providedDealershipID, TrimLevel = trimLevel } );
                _context.SaveChanges();
                return Ok();
            }
            catch
            {
                return StatusCode( 500 );
            }
        }

        // PUT: api/VehicleApi/5
        [HttpPut( "{vin}" )]
        public ActionResult Put( string vin, string modelID, string dealershipID, string trimLevel )
        {
            int providedModelID;
            int providedDealershipID;
            Vehicle found;

            if ( string.IsNullOrWhiteSpace( vin ) || string.IsNullOrWhiteSpace( modelID ) || string.IsNullOrWhiteSpace( dealershipID ) || string.IsNullOrWhiteSpace( trimLevel ) )
            {
                return BadRequest();
            }
            try
            {
                providedModelID = int.Parse( modelID );
                providedDealershipID = int.Parse( dealershipID );
            }
            catch
            {
                return BadRequest();
            }
            try
            {
                _context.Models.Where( x => x.ID == providedModelID ).Single();
                _context.Dealerships.Where( x => x.ID == providedDealershipID ).Single();
            }
            catch
            {
                return NotFound( "Either ModelID or DealerShipID not found" );
            }
            try
            {
                found = _context.Vehicles.Where( x => x.VIN == vin ).Single();
            }
            catch
            {
                return NotFound( "VIN is not found" );
            }

            try
            {
                found.ModelID = providedModelID;
                found.DealershipID = providedDealershipID;
                found.TrimLevel = trimLevel ?? found.TrimLevel;
                _context.SaveChanges();
                return Ok();

            }
            catch
            {
                return StatusCode( 500 );
            }
        }

        // DELETE: api/VehicleApi/5
        [HttpDelete( "{vin}" )]
        public ActionResult Delete( string vin )
        {
            Vehicle found;
            try
            {
                found = _context.Vehicles.Where( x => x.VIN == vin ).Single();
            }
            catch
            {
                return NotFound();
            }
            try
            {
                _context.Vehicles.Remove( found );
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

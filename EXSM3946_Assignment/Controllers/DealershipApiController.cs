using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using API_Assignment.Data;
using API_Assignment.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_Assignment.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class DealershipApiController : ControllerBase
  {
    private readonly DatabaseContext _context;
    public DealershipApiController(DatabaseContext context)
    {
      _context = context;
    }
    // GET: api/DealershipApi
    [HttpGet]
    public IEnumerable<Dealership> Get()
    {
      return _context.Dealerships.ToArray();
    }

    // GET: api/DealershipApi/5
    [HttpGet("{id}")]
    public ActionResult<Dealership> Get(string id)
    {
      int providedID;
      try
      {
        providedID = int.Parse(id);
      }
      catch
      {
        return BadRequest();
      }
      try
      {
        Dealership found = _context.Dealerships.Where(x => x.ID == providedID).Single();
        return found;
      }
      catch
      {
        return NotFound();
      }
    }

    // POST: api/DealershipApi
    [HttpPost]
    public ActionResult Post(string name, string manufacturerID, string address, string phoneNumber)
    {
      int providedManufacturerID;
      //VehicleModel found;
      if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(manufacturerID) || string.IsNullOrWhiteSpace(address) || string.IsNullOrWhiteSpace(phoneNumber))
      {
        return BadRequest();
      }
      try
      {
        providedManufacturerID = int.Parse(manufacturerID);
      }
      catch
      {
        return BadRequest();
      }
      try
      {
        _context.Manufacturers.Where(x => x.ID == providedManufacturerID).Single();
      }
      catch
      {
        return NotFound("Manufacturer ID not found");
      }

      try
      {
        _context.Dealerships.Add(new Dealership() { Name = name, ManufacturerID = providedManufacturerID, Address = address, PhoneNumber = phoneNumber });
        _context.SaveChanges();
        return Ok();
      }
      catch
      {
        return StatusCode(500);
      }
    }

    // PUT: api/DealershipApi/5
    [HttpPut("{id}")]
    public ActionResult Put(string id, string name, string manufacturerID, string address, string phoneNumber)
    {
      int providedManufacturerID;
      int providedID;
      Dealership found;
      if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(manufacturerID) || string.IsNullOrWhiteSpace(address) || string.IsNullOrWhiteSpace(phoneNumber))
      {
        return BadRequest();
      }
      try
      {
        providedID = int.Parse(id);
        providedManufacturerID = int.Parse(manufacturerID);
      }
      catch
      {
        return BadRequest();
      }
      try
      {
        _context.Manufacturers.Where(x => x.ID == providedManufacturerID).Single();
      }
      catch
      {
        return NotFound("Manufacturer ID not found");
      }
      try
      {
        found = _context.Dealerships.Where(x => x.ID == providedID).Single();
      }
      catch
      {
        return NotFound(" Provided Dealership ID does not match");
      }
      try
      {
        found.Name = name ?? found.Name;
        found.ManufacturerID = providedManufacturerID;
        found.Address = address ?? found.Address;
        found.PhoneNumber = phoneNumber ?? found.PhoneNumber;
        _context.SaveChanges();
        return Ok();

      }
      catch
      {
        return StatusCode(500);
      }

    }

    // DELETE: api/DealershipApi/5
    [HttpDelete("{id}")]
    public ActionResult Delete(string id)
    {
      Dealership found;
      int providedID;
      try
      {
        providedID = int.Parse(id);
      }
      catch
      {
        return BadRequest();
      }
      try
      {
        found = _context.Dealerships.Where(x => x.ID == providedID).Single();
      }
      catch
      {
        return NotFound();
      }
      try
      {
        _context.Dealerships.Remove(found);
        _context.SaveChanges();
        return Ok();
      }
      catch
      {
        return StatusCode(500);
      }
    }
  }
}

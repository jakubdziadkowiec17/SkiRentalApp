using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Models.Entities;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalController : ControllerBase
    {
        private ApplicationDbContext _context { get; }
        public RentalController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rental>>> GetRentalList()
        {
            return await _context.Rental
                                .OrderByDescending(c => c.RentalDate)
                                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Rental>> GetRental(int id)
        {
            var rental = await _context.Rental.FindAsync(id);
            if (rental == null)
            {
                return NotFound();
            }
            return rental;
        }

        [HttpPost]
        public async Task<ActionResult<Rental>> PostRental(Rental rental)
        {
            var equipment = await _context.Equipment.FindAsync(rental.EquipmentId);
            if (equipment != null)
            {
                rental.Price = rental.Hours * equipment.PricePerHour;

                _context.Rental.Add(rental);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetRental", new { id = rental.Id }, rental);
            }
            return BadRequest();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRental(int id, Rental rental)
        {
            var equipment = await _context.Equipment.FindAsync(rental.EquipmentId);
            if (id != rental.Id || equipment == null)
            {
                return BadRequest();
            }
            rental.Price = rental.Hours * equipment.PricePerHour;

            _context.Update(rental);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRental(int id)
        {
            var rental = await _context.Rental.FindAsync(id);
            if (rental == null)
            {
                return NotFound();
            }
            _context.Rental.Remove(rental);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
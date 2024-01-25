using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Models.Entities;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipmentController : ControllerBase
    {
        private ApplicationDbContext _context { get; }
        public EquipmentController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Equipment>>> GetEquipmentList()
        {
            return await _context.Equipment
                                .OrderByDescending(c => c.Id)
                                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Equipment>> GetEquipment(string id)
        {
            var equipment = await _context.Equipment.FindAsync(id);

            if (equipment == null)
            {
                return NotFound();
            }
            return equipment;
        }

        [HttpPost]
        public async Task<ActionResult<Equipment>> PostEquipment(Equipment equipment)
        {
            if (equipment.CategoryId == 0)
            {
                return BadRequest();
            }
            _context.Equipment.Add(equipment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEquipment), new { id = equipment.Id }, equipment);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEquipment(string id, Equipment equipment)
        {
            if (id != equipment.Id || equipment.CategoryId == 0)
            {
                return BadRequest();
            }

            _context.Update(equipment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEquipment(string id)
        {
            var equipment = await _context.Equipment.FindAsync(id);
            if (equipment == null)
            {
                return NotFound();
            }
            _context.Equipment.Remove(equipment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
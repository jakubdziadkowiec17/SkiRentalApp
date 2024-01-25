using System.ComponentModel.DataAnnotations;

namespace webapi.Models.Entities
{
    public class Equipment
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Series { get; set; }
        public int Size { get; set; }
        public string Color { get; set; }
        public int PricePerHour { get; set; }
        public int CategoryId { get; set; }
    }
}

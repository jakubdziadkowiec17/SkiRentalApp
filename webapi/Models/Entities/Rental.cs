using System.ComponentModel.DataAnnotations;

namespace webapi.Models.Entities
{
    public class Rental
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public int Hours { get; set; }
        public int Price { get; set; }
        public bool Returned { get; set; }
        public DateTime RentalDate { get; set; }
        public string EquipmentId { get; set; }
    }
}

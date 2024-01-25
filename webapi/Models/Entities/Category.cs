using System.ComponentModel.DataAnnotations;

namespace webapi.Models.Entities
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}

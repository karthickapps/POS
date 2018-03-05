using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace POS.Core.Models
{
    [Table("Customer")]
    public class Customer : BaseEntity
    {
        [StringLength(10)]
        public string Id { get; set; }

        [Required]
        [StringLength(40)]
        public string Name { get; set; }

        [StringLength(250)]
        public string Description { get; set; }

        [StringLength(500)]
        public string Address { get; set; }
    }
}
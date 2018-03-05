using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace POS.Core.Models
{
    [Table("Vendors")]
    public class Vendor : BaseEntity
    {
        [StringLength(35)]
        public string Id { get; set; }

        [StringLength(100)]
        [Required]
        public string Name { get; set; }

        [StringLength(250)]
        public string Description { get; set; }

        [StringLength(300)]
        [Required]
        public string Address { get; set; }

        [Required]
        public int Mobile { get; set; }
    }
}
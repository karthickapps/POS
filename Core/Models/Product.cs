using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace POS.Core.Models
{
    [Table("Products")]
    public class Product : BaseEntity
    {
        [StringLength(35)]
        public string Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(200)]
        public string Description { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        [StringLength(35)]
        public string ProductTypeId { get; set; }


        [ForeignKey("ProductTypeId")]
        public ProductType ProductType { get; set; }
    }
}
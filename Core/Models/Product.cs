using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace POS.Core.Models
{
    [Table("Products")]
    public class Product : TableMetadata
    {
        [StringLength(40)]
        public string Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(200)]
        public string Description { get; set; }

        [Required]
        public decimal Amount { get; set; }
    }
}
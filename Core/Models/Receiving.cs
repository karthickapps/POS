using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace POS.Core.Models
{
    [Table("Receivings")]
    public class Receiving : BaseEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(35)]
        public string VendorId { get; set; }

        [Required]
        [StringLength(35)]
        public string ProductId { get; set; }

        [Required]
        public int Qty { get; set; }

        [Required]
        public DateTime PurchasedAt { get; set; }

        [Required]
        public decimal Price { get; set; }

        [ForeignKey("VendorId")]
        public Vendor Vendor { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; }
    }
}
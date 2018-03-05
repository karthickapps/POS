using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace POS.Core.Models
{
    [Table("Stock")]
    public class Stock : BaseEntity
    {
        [StringLength(35)]
        public string ProductId { get; set; }

        [Required]
        public int Qty { get; set; }

        [ForeignKey("ProductId")]
        public Product Product { get; set; }
    }
}
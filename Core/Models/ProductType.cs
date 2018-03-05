using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace POS.Core.Models
{
    [Table("ProductTypes")]
    public class ProductType : BaseEntity
    {
        [StringLength(35)]
        public int Id { get; set; }
    }
}
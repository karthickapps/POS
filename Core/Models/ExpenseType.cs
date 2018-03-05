using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace POS.Core.Models
{
    [Table("ExpenseTypes")]
    public class ExpenseType : BaseEntity
    {
        [StringLength(35)]
        public string Id { get; set; }
    }
}
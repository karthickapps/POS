using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace POS.Core.Models
{
    [Table("Expenses")]
    public class Expense : BaseEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(35)]
        public string ExpenseTypeId { get; set; }

        [StringLength(200)]
        public string Description { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public DateTime SpentOn { get; set; }

        [ForeignKey("ExpenseTypeId")]
        public ExpenseType ExpenseType { get; set; }
    }
}
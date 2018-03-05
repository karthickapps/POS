using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace POS.Core.Models
{
    public class BaseEntity
    {
        [Required]
        [MinLength(5)]
        [StringLength(35)]
        public string CreatedBy { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        [MinLength(5)]
        [StringLength(35)]
        public string UpdatedBy { get; set; }

        [Required]
        public DateTime UpdatedAt { get; set; }

        [ForeignKey("CreatedBy")]
        public User CreatedUser { get; set; }

        [ForeignKey("UpdatedBy")]
        public User UpdatedUser { get; set; }
    }
}
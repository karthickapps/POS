using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace POS.Core.Models
{
    [Table("Users")]
    public class User
    {
        [MinLength(5)]
        [StringLength(35)]
        public string Id { get; set; }

        [StringLength(100)]
        [Required]
        public string UserName { get; set; }

        [MinLength(5)]
        [StringLength(30)]
        [Required]

        public string Password { get; set; }

        [Required]
        public Role Role { get; set; }
    }
}
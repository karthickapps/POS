using System.ComponentModel.DataAnnotations;

namespace POS.Core.Models
{
    public class User
    {
        [MinLength(5)]
        [StringLength(35)]
        public string UserId { get; set; }

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
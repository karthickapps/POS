using System.ComponentModel.DataAnnotations;

namespace POS.Controllers.Resources
{
    public class LoginResource
    {
        [MinLength(5)]
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
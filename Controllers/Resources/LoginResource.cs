using System.ComponentModel.DataAnnotations;

namespace pos.Controllers.Resources
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
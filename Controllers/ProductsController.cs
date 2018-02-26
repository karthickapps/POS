using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace POS.Controllers
{
    [Authorize(Roles = "Administrator")]
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        [AllowAnonymous]
        [HttpGet("[action]")]
        public IEnumerable<string> All()
        {
            return new List<string>
            {
                "Pen",
                "Pencil",
                "Paper"
            };
        }

        [HttpGet("[action]")]
        public IEnumerable<string> ProtectedAll()
        {
            return new List<string>
            {
                "Audi",
                "Mercedez",
                "BMW"
            };
        }
    }
}
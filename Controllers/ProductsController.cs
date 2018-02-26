using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace pos.Controllers
{
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
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
    }
}
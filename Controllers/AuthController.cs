using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using POS.Controllers.Resources;

namespace POS.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class AuthController : Controller
    {
        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody]LoginResource loginData)
        {
            if (!this.ModelState.IsValid)
            {
                await this.HttpContext.SignOutAsync();
                return BadRequest(ModelState);
            }

            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Name, "barry", ClaimValueTypes.String));
            claims.Add(new Claim(ClaimTypes.Role, "Administrator", ClaimValueTypes.String));

            var userIdentity = new ClaimsIdentity("SuperSecureLogin");
            userIdentity.AddClaims(claims);

            var userPrincipal = new ClaimsPrincipal(userIdentity);

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                userPrincipal,
                new AuthenticationProperties
                {
                    ExpiresUtc = DateTime.UtcNow.AddMinutes(20),
                    IsPersistent = false,
                    AllowRefresh = false
                });

            return Ok(new OkResponseResource { Status = ResponseStatus.Success, ResponseText = "Signed in successfully." });
        }

        [HttpPost("[action]")]
        public async Task<OkResponseResource> Logout()
        {
            await HttpContext.SignOutAsync();
            return new OkResponseResource { Status = ResponseStatus.Success, ResponseText = "Signed out successfully." };
        }
    }
}
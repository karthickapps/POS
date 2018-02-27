using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using POS.Persistance;

namespace POS
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
                 {
                     // Dangareous here. Will need to change this in next release.
                     // Go with custom token authentication.
                     options.Cookie.HttpOnly = false;

                     options.Cookie.Name = "POS_Auth";

                     options.SlidingExpiration = true;

                     options.ExpireTimeSpan = TimeSpan.FromMinutes(2);

                     options.Events.OnRedirectToAccessDenied = (context) =>
                     {
                         context.Response.StatusCode = 401;
                         return Task.CompletedTask;
                     };

                     options.Events.OnRedirectToLogin = (context) =>
                     {
                         context.Response.StatusCode = 401;
                         return Task.CompletedTask;
                     };
                 });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("AdministratorOnly", policy => policy.RequireRole("Administrator"));
            });


            var connectionString = Configuration.GetConnectionString("PosDbContext");

            services.AddEntityFrameworkNpgsql().AddDbContext<PosDbContext>(options => options.UseNpgsql(connectionString));

            services.AddMvc(config =>
            {
                var policy = new AuthorizationPolicyBuilder()
                   .RequireAuthenticatedUser()
                   .Build();
                config.Filters.Add(new AuthorizeFilter(policy));
            });


            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseAuthentication();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3000/");
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}

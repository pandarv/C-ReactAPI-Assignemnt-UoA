
using API_Assignment.Data;
using Microsoft.EntityFrameworkCore;

namespace EXSM3946_Assignment;

public class Program
{
    public static void Main( string[] args )
    {
        var builder = WebApplication.CreateBuilder( args );

        // Add services to the container.

        builder.Services.AddControllersWithViews();
        builder.Services.AddSwaggerGen();
        //builder.Services.AddDbContext<DatabaseContext>();
        builder.Services.AddDbContext<DatabaseContext>( options => options.UseMySql( "server=localhost;user=root;database=api_assignment", ServerVersion.Parse( "10.4.24-mariadb" ) ) );

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if ( !app.Environment.IsDevelopment() )
        {
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();


        app.MapControllerRoute(
            name: "default",
            pattern: "{controller}/{action=Index}/{id?}" );

        app.MapFallbackToFile( "index.html" );

        app.Run();
    }
}


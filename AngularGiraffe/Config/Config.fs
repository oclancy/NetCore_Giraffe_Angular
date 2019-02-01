module AngularGiraffe.Config

open System
open System.IO
open Microsoft.Extensions.Logging
open Microsoft.Extensions.DependencyInjection
open Giraffe
open Giraffe.Razor
open Microsoft.AspNetCore.Cors.Infrastructure
open Microsoft.AspNetCore.Builder
open Microsoft.Extensions.Hosting
open AngularGiraffe.Hubs
open Microsoft.AspNetCore.Http
open Data.Auth
open Microsoft.AspNetCore.Identity
open Microsoft.EntityFrameworkCore
open Microsoft.Extensions.Configuration
open Handlers
open DataHandler
open System.Threading.Tasks
open FSharp.Control.Tasks.V2

// ---------------------------------
// Web app
// ---------------------------------

//let notLoggedIn =
//    redirectTo false "/"

let doNothing (next : HttpFunc) (ctx : HttpContext): HttpFuncResult =
    task {
      return! Task.FromResult (None)
    }

//let redirectNotLoggedIn = requiresAuthentication notLoggedIn

let mustBeLoggedIn = requiresAuthentication doNothing 


let webApp =
    choose [
        GET >=>
            choose [
                route "/" >=> htmlFile "./wwwroot/app/index.html"

                mustBeLoggedIn >=>
                 choose [
                    route "/data" >=> htmlFile "./wwwroot/data/index.html"
                    route "/auth" >=> json true
                    route "/logout" >=> LogoutHandler
                ]
                route "/auth" >=> json false

                
            ]
        POST >=>
              choose [
                route "/login" >=> LoginHandler
                mustBeLoggedIn >=> 
                        route "/data" >=> 
                        choose [
                            POST  >=> DataHandler 
                        ]
              ]
      
        setStatusCode 404 >=> htmlFile "./wwwroot/app/index.html"
        
      ]

// ---------------------------------
// Error handler
// ---------------------------------

let errorHandler (ex : Exception) (logger : ILogger) =
    logger.LogError(EventId(), ex, "An unhandled exception has occurred while executing the request.")
    clearResponse >=> setStatusCode 500 >=> text ex.Message

// ---------------------------------
// Config and Main
// ---------------------------------

let configureCors (builder : CorsPolicyBuilder) =
    builder.WithOrigins("http://localhost:8080")
           .AllowAnyMethod()
           .AllowAnyHeader()
           |> ignore

type MyStartup( config: IConfiguration ) =

    let m_config : IConfiguration  = config

    member this.Configure (app : IApplicationBuilder) =
        let env = app.ApplicationServices.GetService<IHostingEnvironment>()
        (match env.IsDevelopment() with
        | true  -> app.UseDeveloperExceptionPage()
        | false -> app.UseGiraffeErrorHandler errorHandler)
            .UseAuthentication()  
            .UseCors(configureCors)
            .UseStaticFiles( new StaticFileOptions( ServeUnknownFileTypes = true ))
            .UseSignalR(fun routes ->
                routes.MapHub<AppHub>(PathString("/apphub"))
            ) 
            .UseGiraffe(webApp) |> ignore

    member this.ConfigureServices ( services : IServiceCollection) =

        let sp  = services.BuildServiceProvider()
        let env = sp.GetService<IHostingEnvironment>()
        let viewsFolderPath = Path.Combine(env.ContentRootPath, "Views")
        services.AddRazorEngine viewsFolderPath |> ignore
        services.AddCors() |> ignore
        services.AddGiraffe() |> ignore
        services.AddSignalR() |> ignore
    
        services.AddDbContext<ApplicationDbContext>( fun options ->
                  options.UseSqlServer(m_config.GetConnectionString("DefaultConnection") ) 
                        |> ignore ) 
                  |> ignore

        services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders() |> ignore
    
    //member this.ConfigureLogging (builder : ILoggingBuilder) =
    //    let filter (l : LogLevel) = l.Equals LogLevel.Information
    //    builder.AddFilter(filter)
    //           .AddConsole()
    //           .AddDebug() |> ignore


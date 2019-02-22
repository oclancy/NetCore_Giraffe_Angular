﻿module AngularGiraffe.Config

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
open DataService
open Microsoft.AspNetCore.Authentication
open Microsoft.AspNetCore.Authentication.OpenIdConnect
open System.Numerics
open Microsoft.AspNetCore.Identity
open Microsoft.AspNetCore.Authentication.Cookies


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

let challenge (scheme : string) (redirectUri : string) : HttpHandler =
        fun (next : HttpFunc) (ctx : HttpContext) ->
            task {
                do! ctx.ChallengeAsync(
                        scheme,
                        AuthenticationProperties(RedirectUri = redirectUri))
                return! next ctx
            }

let mustBeLoggedIn   =
    fun (next : HttpFunc) (ctx : HttpContext) ->
       task {
            let handle = challenge OpenIdConnectDefaults.AuthenticationScheme ctx.Request.Path.Value
            return! (requiresAuthentication handle) next ctx
       }

let webApp =
    choose [
        GET >=>
            choose [
                mustBeLoggedIn >=>
                route "/" >=> htmlFile "./wwwroot/app/index.html"
                    
                //route "/secure2" >=> mustBeLoggedIn >=> text "Success"
                   
                //route "/secure" >=> mustBeLoggedIn >=> text "Success"
                   
                route "/data" >=> htmlFile "./wwwroot/data/index.html"

                mustBeLoggedIn  >=>
                 choose [
                    
                    route "/auth" >=> json true
                    route "/logout" >=> LogoutHandler
                ]
                route "/auth" >=> json false
            ]
        POST >=>
              choose [
                //route "/login" >=> LoginHandler
                mustBeLoggedIn >=> 
                        route "/data" >=> 
                        choose [
                            POST  >=> DataHandler 
                        ]
              ]
      
        setStatusCode 404 >=> text "unknown"
        
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
           |>ignore


type MyStartup( env:IHostingEnvironment, config :IConfiguration, loggerFactory:ILoggerFactory  ) =

    let m_config : IConfiguration = config
    let m_env = env

    member __.Configure (app : IApplicationBuilder) =

        (match m_env.IsDevelopment() with
        | true  -> app.UseDeveloperExceptionPage()
        | false -> app.UseGiraffeErrorHandler errorHandler)
            
            .UseCors(configureCors)
            .UseStaticFiles( new StaticFileOptions( ServeUnknownFileTypes = true ))
            .UseSignalR(fun routes ->
                routes.MapHub<AppHub>(PathString("/apphub"))
            ) 
            .UseAuthentication()  
            .UseGiraffe(webApp) |> ignore

    member __.ConfigureServices ( services : IServiceCollection ) =

        let viewsFolderPath = Path.Combine(m_env.ContentRootPath, "Views")
        services.AddRazorEngine viewsFolderPath |> ignore

        services.AddDbContext<ApplicationDbContext>( fun options ->
                  options.UseSqlServer(m_config.GetConnectionString("DefaultConnection") ) 
                        |> ignore ) 
                  |> ignore

        services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders() |> ignore

        
        services.AddAuthentication( fun o->
            o.DefaultAuthenticateScheme <- OpenIdConnectDefaults.AuthenticationScheme
            //o.DefaultChallengeScheme <- OpenIdConnectDefaults.AuthenticationScheme
         ) 
         .AddOpenIdConnect(fun options ->

            // need this if using Identity for sign in 
            //options.SignInScheme <- IdentityConstants.ExternalScheme;

            let domain = "https://firmus-software.eu.auth0.com"

             // Set the authority to your Auth0 domain
            options.Authority <- domain;

            // Configure the Auth0 Client ID and Client Secret
            options.ClientId <- "UoLXKlBrxaEI6c1LU3HhberKBBPnc0WT"
            options.ClientSecret <- "u5-aR9MtPi0ka1tB2Y5l43yFYDJr6gc6oKI_RKD9ElPLAh2i6VQTeu5Rr2AHlHxt";

            // Set response type to code
            options.ResponseType <- "code";
            // Configure the scope
            options.Scope.Clear();
            options.Scope.Add("openid");

            // Set the callback path, so Auth0 will call back to http://localhost:3000/callback
            // Also ensure that you have added the URL as an Allowed Callback URL in your Auth0 dashboard
            options.CallbackPath <- new PathString("/authcallback");

            // Configure the Claims Issuer to be Auth0
            options.ClaimsIssuer <- "Auth0";
            options.SaveTokens <- true;

            options.Events <- new OpenIdConnectEvents(
            
              
                // handle the logout redirection
                OnRedirectToIdentityProviderForSignOut = fun context ->
                
                    let mutable logoutUri = sprintf "https://%s}/v2/logout?client_id=%s" domain options.ClientId;

                    let mutable postLogoutUri = context.Properties.RedirectUri;
                    if not (String.IsNullOrEmpty(postLogoutUri)) then
                    
                        if postLogoutUri.StartsWith("/") then 
                            // transform to absolute
                            let request = context.Request;
                            postLogoutUri <- request.Scheme + "://" + request.Host.Host + request.PathBase + postLogoutUri;
                    
                        logoutUri <- logoutUri + "&returnTo= "+ Uri.EscapeDataString(postLogoutUri);
                    
                    context.Response.Redirect(logoutUri);
                    context.HandleResponse();

                    Task.CompletedTask;
                
            )
        ) |> ignore
    
        
        
        services.AddSingleton( StockDetailService )
        |> ignore

        services.AddCors() |> ignore
        services.AddGiraffe() |> ignore
        services.AddSignalR() |> ignore




module AngularGiraffe.App

open System
open System.IO
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open AngularGiraffe.Config
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.Configuration.Json

let configureAppConfiguration  (context: WebHostBuilderContext) (config: IConfigurationBuilder) =  
    config
        .AddJsonFile("appsettings.json",false,true)
        .AddJsonFile(sprintf "appsettings.%s.json" context.HostingEnvironment.EnvironmentName ,true)
        .AddEnvironmentVariables() |> ignore

[<EntryPoint>]
let main _ =
    let contentRoot = Directory.GetCurrentDirectory()
    //let webRoot     = Path.Combine(contentRoot, "WebRoot")
    WebHostBuilder()
        .UseKestrel()
        .UseContentRoot(contentRoot)
        .ConfigureAppConfiguration(configureAppConfiguration)
        //.Configure(Action<IApplicationBuilder> configureApp)
        .UseIISIntegration()
        //.UseWebRoot(webRoot)
        .UseStartup<MyStartup>()
        .Build()
        .Run()
    0
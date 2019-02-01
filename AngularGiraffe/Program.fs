module AngularGiraffe.App

open System
open System.IO
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open AngularGiraffe.Config
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.Configuration.Json
open Microsoft.Extensions.Logging
open NLog.Web

let configureAppConfiguration  (context: WebHostBuilderContext) (config: IConfigurationBuilder) =  
    config
        .AddJsonFile("appsettings.json",false,true)
        .AddJsonFile(sprintf "appsettings.%s.json" context.HostingEnvironment.EnvironmentName ,true)
        .AddEnvironmentVariables() |> ignore

[<EntryPoint>]
let main _ =
    // NLog: setup the logger first to catch all errors
    NLog.Web.NLogBuilder.ConfigureNLog("nlog.config")
        .GetCurrentClassLogger()
        |> ignore

    let contentRoot = Directory.GetCurrentDirectory()
    //let webRoot     = Path.Combine(contentRoot, "WebRoot")
    WebHostBuilder()
        .UseKestrel()
        .ConfigureLogging( fun (logging:ILoggingBuilder) -> 
            logging.ClearProviders() 
                   .SetMinimumLevel(Microsoft.Extensions.Logging.LogLevel.Trace)
            |> ignore
        )
        .UseNLog()
        .UseContentRoot(contentRoot)
        .ConfigureAppConfiguration(configureAppConfiguration)
        //.Configure(Action<IApplicationBuilder> configureApp)
        .UseIISIntegration()
        //.UseWebRoot(webRoot)
        .UseStartup<MyStartup>()
        .Build()
        .Run()

    NLog.LogManager.Shutdown()
    0
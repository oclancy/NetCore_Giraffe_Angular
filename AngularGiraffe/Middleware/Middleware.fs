module Middleware

open Microsoft.Extensions.DependencyInjection
open DataService
open Microsoft.Extensions.Logging
open Microsoft.AspNetCore.SignalR
open AngularGiraffe.Hubs
open Microsoft.Extensions.Hosting
    
    type IServiceCollection with
        member __.AddDataService =
            __.AddSingleton<StockDetailService>( fun ctx ->
                let logger = ctx.GetRequiredService<ILogger<StockDetailService>>()
                //let hub = ctx.GetRequiredService<IHubContext<AppHub>>()
                new StockDetailService(logger)
                )
            
        

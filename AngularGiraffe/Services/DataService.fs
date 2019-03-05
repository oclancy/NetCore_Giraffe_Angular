module DataService

open Microsoft.AspNetCore.SignalR
open System.Threading
open Microsoft.Extensions.Logging
open AngularGiraffe.Hubs
open Firmus.Data
open Microsoft.Extensions.Hosting
open System.Threading.Tasks

type StockDetailService ( logger: ILogger<StockDetailService>, hub: IHubContext<AppHub> ) = 
    
    let _logger:ILogger<StockDetailService> = logger
    let _hub:IHubContext<AppHub> = hub
    

    let publish (sd:StockProviders.StockDetail) = 

            _hub.Clients
                .All
                .SendAsync("StockDetail", sd) 
            |> Async.AwaitTask
            |> ignore

            Thread.Sleep(5000)


    let start( cts:CancellationToken )= 
        async{
            
            while not cts.IsCancellationRequested do 
                    Seq.iter publish StockProviders.GetEuroNextRows 
            
        } 

    interface IHostedService with 
        
        // Triggered when the application host is ready to start the service.
        member this.StartAsync( cancellationToken:CancellationToken ) =
            start cancellationToken |> Async.StartAsTask :> _
            

        // Summary:
        // Triggered when the application host is performing a graceful shutdown.
        member this.StopAsync(cancellationToken:CancellationToken ) =
            Task.CompletedTask

    
    
 
    
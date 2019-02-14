module DataService

open Microsoft.AspNetCore.SignalR
open System.Threading
open Microsoft.Extensions.Logging
open AngularGiraffe.Hubs
open Firmus.Data

type StockDetailService ( logger: ILogger<StockDetailService>, hub: IHubContext<AppHub> ) = 
    
    let _logger:ILogger<StockDetailService> = logger
    let _hub:IHubContext<AppHub> = hub
    
    let cts: CancellationTokenSource = new CancellationTokenSource()
    let ct: CancellationToken = cts.Token

    let publish (sd:StockProviders.StockDetail) = 

            _hub.Clients
                .All
                .SendAsync("StockDetail", sd) 
            |> Async.AwaitTask
            |> ignore

            Thread.Sleep(5000)


    let start = 
        async{
            
            while not ct.IsCancellationRequested do 
                    Seq.iter publish StockProviders.GetEuroNextRows 
            
        } 

    do
        let task = start
        Async.Start(task)
    
    
 
    
module DataService

open Microsoft.AspNetCore.SignalR
open System.Threading
open System.Threading.Tasks
open Microsoft.Extensions.Logging
open AngularGiraffe.Hubs
open Firmus.Data

type StockDetailService ( logger: ILogger<StockDetailService>, hub: IHubContext<AppHub> ) as x = 
    
    let _logger:ILogger<StockDetailService> = logger
    let _hub:IHubContext<AppHub> = hub
    
    let cts: CancellationTokenSource = new CancellationTokenSource()
    let ct: CancellationToken = cts.Token

    let publish sd:StockDetail = 
        _hub.StockDetail(sd)
        Thread.Sleep(5000)

    let start = 
        async{
            
            while not ct.IsCancellationRequested do 
                    Seq.fold publish StockProviders.GetEuroNextRows 
            
        } 

    do
        let task = x.start
        Async.Start(task)
    
    
 
    
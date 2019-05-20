module DataService

open Microsoft.Extensions.Logging
open Firmus.Data

type StockDetailService ( logger: ILogger<StockDetailService> ) = 
    
    let _logger:ILogger<StockDetailService> = logger
    let PAGE_SIZE:int = 50
    
    //let publish (sd:StockProviders.StockDetail) = 

    //        _hub.Clients
    //            .All
    //            .SendAsync("StockDetail", sd) 
    //        |> Async.AwaitTask
    //        |> ignore

    //        Thread.Sleep(100)


    //let start( cts:CancellationToken )= 
    //    async{
            
    //        while not cts.IsCancellationRequested do 
    //                //Seq.iter publish StockProviders.GetEuroNextRows 
    //                None |> ignore

            
    //    } 
        
    member this.GetStocks( filter:string, page:int ) : Async<StockProviders.StockDetail[]> = 
        async{
            return StockProviders.GetEuroNextRows
                        |> Seq.filter( fun sd -> sd.Symbol.StartsWith(filter))
                        |> Seq.skip (page * PAGE_SIZE)
                        |> Seq.take 50
                        |> Seq.toArray
            //return [| {Symbol="test"; ISIN="";Name="";Open=1.1;Last=1.1;LastDateTime="";High=11.1;Low=1.1} |]
        }

    //interface IHostedService with 
        
    //    // Triggered when the application host is ready to start the service.
    //    member this.StartAsync( cancellationToken:CancellationToken ) =
    //        start cancellationToken |> Async.StartAsTask :> _
            

    //    // Summary:
    //    // Triggered when the application host is performing a graceful shutdown.
    //    member this.StopAsync(cancellationToken:CancellationToken ) =
    //        Task.CompletedTask

    
    
 
    
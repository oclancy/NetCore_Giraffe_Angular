module AngularGiraffe.Hubs

open System
open Microsoft.AspNetCore.SignalR
open System.Threading.Tasks
open Microsoft.Extensions.Logging
open Firmus.Data

type IGiraffeHubClient =
    interface
        abstract Send: msg: string -> Task
        abstract StockDetail: detail: Firmus.Data.StockProviders.StockDetail -> Task
    end

type IGiraffeHubServer =
    interface
        abstract Broadcast: msg:string -> unit
        abstract Broadcast: msg:int -> unit
    end


type AppHub (logger : ILogger<AppHub>) = 
    
    inherit Hub<IGiraffeHubClient>()

    let _logger = logger    

    interface IGiraffeHubServer with 
        
        member this.Broadcast( msg:string ) =
               this.Clients.All.Send(msg) |>Async.AwaitTask |> ignore
        
        member this.Broadcast( msg:int ) =
            this.Clients.All.Send(msg.ToString()) |>Async.AwaitTask |> ignore

    override this.OnConnectedAsync() =
        async{
            _logger.LogInformation( "Connected" + this.Context.UserIdentifier )
            } |> Async.StartAsTask :> _

        
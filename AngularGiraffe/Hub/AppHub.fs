module AngularGiraffe.Hubs

open System
open System.Linq
open Microsoft.AspNetCore.SignalR
open System.Threading.Tasks
open Microsoft.Extensions.Logging
open Firmus.Data
open Microsoft.AspNetCore.Authorization
open Microsoft.Extensions.Configuration
open DataService
open Firmus.Data.StockProviders

type IGiraffeHubClient =
    interface
        abstract Send: msg: string -> Task
        abstract StockDetail: detail: StockProviders.StockDetail -> Task
        abstract StockDetails: detail: StockProviders.StockDetail[] -> Task
        abstract Roles: roles:string[] -> Task 
    end

type IGiraffeHubServer =
    interface
        abstract Broadcast: msg:string -> unit
        abstract Broadcast: msg:int -> unit
        abstract Roles: unit -> unit
        abstract StockFilter: filter:string -> unit
    end

[<Authorize>]
type AppHub (logger : ILogger<AppHub>, 
             config: IConfiguration,
             dataService: StockDetailService) = 
    
    inherit Hub<IGiraffeHubClient>()

    let _logger = logger    
    let _dataService = dataService

    //interface IGiraffeHubServer with
        
    member this.StockFilter(filter: string)  = 
        let data = dataService.GetStocks(filter, 0)
                        |> Async.RunSynchronously
        this.Clients
            .Caller
            .StockDetails(data) 
                |> Async.AwaitTask
                |> ignore
        
    member this.Broadcast( msg:string ) =
            this.Clients.All.Send(msg) |>Async.AwaitTask |> ignore
        
    //member this.Broadcast( msg:int ) =
    //    this.Clients.All.Send(msg.ToString()) |>Async.AwaitTask |> ignore

    member this.Roles( ) =
        let claims = this.Context
                        .User
                        .Claims
                        .Where( fun claim -> claim.Issuer = config.["Auth0:Domain"])
                        .Select( fun claim -> claim.Value )
                        .ToArray()

        this.Clients.Caller.Roles(claims) |>Async.AwaitTask |> ignore

    override this.OnConnectedAsync() =
        async{
            _logger.LogInformation( "Connected" + this.Context.UserIdentifier )
            } |> Async.StartAsTask :> _

        
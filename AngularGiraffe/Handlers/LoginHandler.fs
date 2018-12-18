module Handlers

    open Microsoft.AspNetCore.Http
    open FSharp.Control.Tasks.V2
    open Giraffe
    open Microsoft.AspNetCore.Identity
    open Data.Auth
    open System.Threading.Tasks

    [<CLIMutable>]
    type LoginModel =
        {
            Username : string
            Password : string
        }

    let LoginHandler (next : HttpFunc) (ctx : HttpContext) =
            task {
                let! model = ctx.BindJsonAsync<LoginModel>()
                let signInManager = ctx.GetService<SignInManager<ApplicationUser>>()
                let! result = signInManager.PasswordSignInAsync(model.Username, model.Password, true, false)
            
                match result.Succeeded with
                | true  -> ctx.SetStatusCode( 200 )
                | false -> ctx.SetStatusCode( 403 )

                return! Task.FromResult (Some ctx)
            }

    let LogoutHandler (next : HttpFunc) (ctx : HttpContext) =
            task {
                let signInManager = ctx.GetService<SignInManager<ApplicationUser>>()
                
                signInManager.SignOutAsync() |> Async.AwaitTask |> ignore

                return! Task.FromResult (Some ctx)
            }


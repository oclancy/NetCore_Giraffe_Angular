module DataHandler
    open FSharp.Control.Tasks.V2
    open Microsoft.AspNetCore.Http
    open Giraffe

    type testData = {
      Name:string;
    }
    
    let DataHandler (next : HttpFunc) (ctx : HttpContext) =
        task{

            let p = [|{ Name="Oliver" } |]
            return! ctx.WriteJsonAsync(p);
        }
     
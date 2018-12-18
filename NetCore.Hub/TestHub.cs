using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NetCore.Hubs
{
    public class TestHub : Hub<IClient>
    {
        public async Task Send( string message )
        {
            await Clients.All.recieve( message + "-> send" ); 
        }
    }

    public interface IClient
    {
        Task recieve( string message );
    }
}

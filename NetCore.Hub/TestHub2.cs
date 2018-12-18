using Microsoft.AspNetCore.SignalR;
using NetCore.Hubs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NetCore.Hub
{
    public class TestHub2 : Hub<IClient2>
    {
        public async Task Broadcast( string message )
        {
            await Clients.All.Send( message + "-> Send2" );
        }

        public async Task Send3( string message )
        {
            await Clients.All.another( message + "-> Send3" );
        }

    }

    public interface IClient2
    {
        Task Send( string message );
        Task another( string message );
    }
}

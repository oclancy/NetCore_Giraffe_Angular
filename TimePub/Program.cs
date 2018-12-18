﻿using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading.Tasks;

namespace TimePub
{
    class Program
    {
        static async Task Main(string[] args)
        {
            await new HostBuilder()
            .ConfigureServices( ( hostContext, services ) =>
            {
                services.AddHostedService<TimeService>();
            } )
            .RunConsoleAsync();
        }
    }
}

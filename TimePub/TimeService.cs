﻿using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace TimePub
{
    class TimeService : IHostedService
    {
        public Task StartAsync( CancellationToken cancellationToken )
        {
            throw new NotImplementedException();
        }

        public Task StopAsync( CancellationToken cancellationToken )
        {
            throw new NotImplementedException();
        }
    }
}

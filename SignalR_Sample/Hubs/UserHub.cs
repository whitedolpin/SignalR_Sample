using Microsoft.AspNetCore.SignalR;

namespace SignalR_Sample.Hubs
{
    public class UserHub : Hub
    {
        public static int totalView { get; set; } = 0;

        public static int totalUser { get; set; } = 0;

        public override  Task OnConnectedAsync()
        {
            totalUser++;
             Clients.All.SendAsync("updateTotalUser", totalUser).GetAwaiter().GetResult();
            return  base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            totalUser--;
            Clients.All.SendAsync("updateTotalUser", totalUser).GetAwaiter().GetResult();
            return base.OnDisconnectedAsync(exception);
        }

        public async Task<string> NewWindownLoaded()
        {
            totalView++;
            // send update to all client
            await Clients.All.SendAsync("updateTotalViews", totalView);
            return $"total views -{totalView}";
        }
        
    }
}

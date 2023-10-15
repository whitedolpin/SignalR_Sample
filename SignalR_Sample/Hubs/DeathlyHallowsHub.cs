using Microsoft.AspNetCore.SignalR;

namespace SignalR_Sample.Hubs
{
    public class DeathlyHallowsHub : Hub        
    {
        public Dictionary<string, int> GetRaceStatus()
        {
            return SD.DealthyHallowRace;
        }
    }
}

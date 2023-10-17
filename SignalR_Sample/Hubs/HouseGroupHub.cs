using Microsoft.AspNetCore.SignalR;
using System.Text.RegularExpressions;

namespace SignalR_Sample.Hubs
{
    public class HouseGroupHub : Hub
    {
        public static List<string> GroupJoined {  get; set; }  =  new List<string>();   

        public async Task JoinHouse(string houseName)
        {
            if (!GroupJoined.Contains(Context.ConnectionId + ":" + houseName))
            {
                GroupJoined.Add(Context.ConnectionId + ":" + houseName);
                string houseList = "";
                foreach (var str in GroupJoined)
                {
                    if (str.Contains(Context.ConnectionId))
                    {
                        houseList += str.Split(':')[1]+"";   
                    }    
                }

                await Clients.Caller.SendAsync("subscriptionStatus", houseList, houseName, true);

                await Groups.AddToGroupAsync(Context.ConnectionId, houseName);    
            }
        }
        public async Task LeaveHouse(string houseName)
        {
            if (!GroupJoined.Contains(Context.ConnectionId + ":" + houseName))
            {
                GroupJoined.Remove(Context.ConnectionId + ":" + houseName);
                string houseList = "";
                foreach (var str in GroupJoined)
                {
                    if (str.Contains(Context.ConnectionId))
                    {
                        houseList += str.Split(':')[1] + "";
                    }
                }

                await Clients.Caller.SendAsync("subscriptionStatus", houseList, houseName, false);
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, houseName);
            }
        }
    }
}

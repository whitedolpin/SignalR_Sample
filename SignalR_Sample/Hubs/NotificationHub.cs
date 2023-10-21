﻿using Microsoft.AspNetCore.SignalR;

namespace SignalR_Sample.Hubs
{
    public class NotificationHub : Hub
    {
        public static int notificationCounter = 0;
        public static List<string> messages = new();

        public async Task SendMessage(string message)
        {
            if (!string.IsNullOrEmpty(message))
            {
                notificationCounter++;  
                messages.Add(message);
                await LoadMessage();
            }

        }
        public async Task LoadMessage()
        {
            await Clients.All.SendAsync("LoadNotification",messages, notificationCounter);
        }
    }
}

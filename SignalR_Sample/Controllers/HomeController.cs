﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalR_Sample.Data;
using SignalR_Sample.Hubs;
using SignalR_Sample.Models;
using SignalR_Sample.Models.ViewModel;
using System.Diagnostics;
using System.Security.Claims;

namespace SignalR_Sample.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHubContext<DeathlyHallowsHub> _deathlyHub;
        private readonly ApplicationDbContext _context;
        public HomeController(ILogger<HomeController> logger, IHubContext<DeathlyHallowsHub> deathlyHub, ApplicationDbContext context)
        {
            _logger = logger;
            _deathlyHub = deathlyHub;   
            _context = context; 
        }

        public IActionResult Index()
        {
            return View();
        }
        [Authorize]
		public IActionResult Chat()
		{
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            ChatVM chatVM = new()
            {
                Rooms = _context.ChatRooms.ToList(),
                MaxRoomAllowed = 4,
                UserId = userId,
            };
			return View(chatVM);
		}
		public IActionResult AdvancedChat()
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			ChatVM chatVM = new()
			{
				Rooms = _context.ChatRooms.ToList(),
				MaxRoomAllowed = 4,
				UserId = userId,
			};
			return View(chatVM);
		}
		public async Task<IActionResult> DeathlyHallows(string type)
        {
            if (SD.DealthyHallowRace.ContainsKey(type))
            {
                SD.DealthyHallowRace[type]++;
            }
            await _deathlyHub.Clients.All.SendAsync("updateDeathlyHallowCount", 
                SD.DealthyHallowRace[SD.Cloak],
                SD.DealthyHallowRace[SD.Stone],
                SD.DealthyHallowRace[SD.Wand]
                );
            return Accepted();  
        }
        public IActionResult Notification()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
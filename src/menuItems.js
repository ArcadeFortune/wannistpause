const menuItems = [
  {
    name: "Klasse Wechesln",
    content: "changeclass",
    type: "modal",
  },
  {
    name: "Stundenplan",
    content: "timetable",
    type: "submenu",
  },
  {
    name: "Pomodoro",
    content: "pomodoro",
    type: "modal",
  },
  {
    name: "Pomodoro Stoppen",
    content: "pomodoroStop",
    type: "modal",
  },
  { 
    name: "Über mich", 
    content: "aboutme", 
    type: "submenu" 
  },
  { 
    name: "Einstellungen", 
    content: "settings",
    type: "submenu"
  },
  { 
    name: "Vorschau", 
    content: "preview", 
    link: "https://wannistpause-git-develpoment-arcadefortune.vercel.app/",
    type: "link" 
  },
];


export default menuItems;
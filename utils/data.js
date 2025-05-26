import { getId } from "./utils";
import { IoIosBluetooth, IoIosFingerPrint, IoIosGlobe, IoIosNotifications, IoIosSwitch, IoIosWifi } from 'react-icons/io'
import { IoAccessibility, IoBatteryFull, IoHandLeft, IoSearch, IoSettingsOutline, IoSunny, IoVolumeHigh } from "react-icons/io5";
import { CgDarkMode, CgSandClock } from "react-icons/cg";
import { MdAssistant, MdDarkMode, MdWallpaper } from "react-icons/md";
import { FaLock, FaUsers } from "react-icons/fa";
import { LuDock } from "react-icons/lu";

export const initialStructure = [
    { id: 1, name: 'Documents', type: 'folder', children: [
      { id: 2, name: 'sample.pdf', type: 'file' },
      { id: 3, name: 'sample.docx', type: 'file' }
    ]},
    { id: 4, name: 'Projects', type: 'folder', children: [
      { id: 5, name: 'main.py', type: 'file' }
    ]},
    { id: 6, name: 'Downloads', type: 'folder', children: [
      { id: 7, name: 'image.jpg', type: 'file' }
    ]},
    { id: 8, name: 'Music', type: 'folder', children: [
      { id: 9, name: 'Telugu songs', type: 'folder', children: [] },
      { id: 10, name: 'English songs', type: 'folder', children: [] }
    ]}
  ];

  export const initialNotes = [
    {
        id: getId(),
        folderName: 'Personal',
        sort: 'dateModified',
        order: 'asc',
        notes: [
        { id: getId(), title: 'My first note', content: 'This is my first note', dateCreated: new Date(), dateModified: new Date() },
        { id: getId(), title: 'My second note', content: 'This is my second note', dateCreated: new Date(), dateModified: new Date() }
        ]
    },
    {
        id: getId(),
        folderName: 'Work',
        sort: 'dateModified',
        order: 'asc',
        notes: [
        { id: getId(), title: 'Meeting notes', content: 'Meeting notes', dateCreated: new Date(), dateModified: new Date() }
        ]
    }
];

export const appMenus = {
  "clock": ["File", "Edit", "View", "Window", "Help"],
  "calculator": ["Edit", "View", "Window", "Help"],
  "notes": ["File", "Edit", "Format", "View", "Window", "Help"],
  "finder": ["File", "Edit", "View", "Go", "Window", "Help"],
  "photobooth": ["File", "Edit", "View", "Camera", "Window", "Help"],
  "photos": ["File", "Edit", "Image", "View", "Window", "Help"],
  "vscode": ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Window", "Help"],
  "sudoko": ["File", "Edit", "Format", "View", "Window", "Help"],
  "vlcplayer": ["File", "Playback", "Audio", "Video", "Subtitle", "Tools", "View", "Help"],
  "dictionary": ["File", "Edit", "Go", "Search", "Window", "Help"],
  "settings": ["Edit", "View", "Window", "Help"],
  "shortcuts": ["File", "Edit", "View", "Shortcut", "Window", "Help"],
  "tips": ["File", "Edit", "View", "Window", "Help"],
}

export const apps = [
  "finder",
  "terminal",
  "clock",
  "calculator",
  "notes",
  "photos",
  "safari",
  "settings",
  "vscode",
  "vlcplayer",
  "calendar",
  "sudoko",
  "compiler",
  "appstore",
  "siri",
  "photobooth",
  "2048",
  "chess",
  "tictactoe",
  "news",
  "music",
  "reminders",
  "shortcuts",
  "weather",
  "screenshot",
  "facetime",
  "dictionary",
  "tips",
];

export const settingsItems = [
    { id: 0, text: "Wi-Fi", icon: IoIosWifi, bgColor: "bg-blue-500" },
    { id: 1, text: "Bluetooth", icon: IoIosBluetooth, bgColor: "bg-blue-500" },
    { id: 2, text: "Network", icon: IoIosGlobe, bgColor: "bg-blue-500" },
    { id: 3, text: "Battery", icon: IoBatteryFull, bgColor: "bg-green-500" },
    { type: "spacer" },
    { id: 5, text: "General", icon: IoSettingsOutline, bgColor: "bg-gray-500" },
    { id: 6, text: "Accessibility", icon: IoAccessibility, bgColor: "bg-blue-500" },
    { id: 7, text: "Appearance", icon: CgDarkMode, bgColor: "bg-black" },
    { id: 8, text: "Apple Intelligence & Siri", icon: MdAssistant, bgColor: "bg-teal-500" },
    { id: 9, text: "Control Center", icon: IoIosSwitch, bgColor: "bg-gray-500" },
    { id: 10, text: "Displays", icon: IoSunny, bgColor: "bg-blue-500" },
    { id: 11, text: "Desktop & Dock", icon: LuDock, bgColor: "bg-black" },
    { id: 12, text: "Spotlight", icon: IoSearch, bgColor: "bg-gray-500" },
    { id: 13, text: "Wallpaper", icon: MdWallpaper, bgColor: "bg-teal-500" },
    { type: "spacer" },
    { id: 15, text: "Notifications", icon: IoIosNotifications, bgColor: "bg-red-500" },
    { id: 16, text: "Sound", icon: IoVolumeHigh, bgColor: "bg-red-500" },
    { id: 17, text: "Focus", icon: MdDarkMode, bgColor: "bg-violet-500" },
    { id: 18, text: "Screen Time", icon: CgSandClock, bgColor: "bg-violet-500" },
    { type: "spacer" },
    { id: 20, text: "Lock Screen", icon: FaLock, bgColor: "bg-black" },
    { id: 21, text: "Privacy & Security", icon: IoHandLeft, bgColor: "bg-blue-500" },
    { id: 22, text: "Touch ID & Password", icon: IoIosFingerPrint, bgColor: "bg-white", iconColor: "text-red-500" },
    { id: 23, text: "Users & Groups", icon: FaUsers, bgColor: "bg-blue-500" },
  ];

// export const shortcutColors = [
//   "bg-[#ee5f64]",
//   "bg-[#fc7e5f]",
//   "bg-[#f39f45]",
//   "bg-[#e7c112]",
//   "bg-[#37c051]",
//   "bg-[#00c4a5]",
//   "bg-[#66c4eb]",
//   "bg-[#1687ff]",
//   "bg-[#4565c2]",
//   "bg-[#4060c0]",
//   "bg-[#7544af]",
//   "bg-[#af70d9]",
//   "bg-[#ea7dc9]",
//   "bg-[#7b8690]",
//   "bg-[#90a996]",
//   "bg-[#b79e7f]"
// ]



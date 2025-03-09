import { getId } from "./utils";

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
}

export const apps = [
  "finder",
  "terminal",
  "clock",
  "launchpad",
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
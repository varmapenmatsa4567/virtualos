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
]
import Window from "@/components/Window";
import { initialNotes } from "@/utils/data";
import { useState, useEffect } from "react";
import Folder from "./Folder";
import Note from "./Note";
import { formatDateTimeforNotes, getId, noteDate } from "@/utils/utils";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import NoteContextMenu from "@/components/context-menu/NoteContextMenu";
import NoteFolderContextMenu from "@/components/context-menu/NoteFolderContextMenu";
import { sortNotes } from "./utils";
import NoteFolderDialog from "@/components/dialogs/NoteFolderDialog";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar/Toolbar";
import Underline from "@tiptap/extension-underline";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";


const Notes = ({ fileStructure, setFileStructure, ...props }) => {
    // Load notes from local storage or use initialNotes if local storage is empty
    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem('notes');
        return savedNotes ? JSON.parse(savedNotes) : initialNotes;
    });

    const editor = useEditor({
        extensions: [
         StarterKit.configure({
            underline: true,
            heading: {
                levels: [2, 3, 4], // Only allow h2, h3, h4
            },
         }),
        Table,
        TableCell,
        TableHeader,
        TableRow,
        Underline],
        content: '<h2></h2>',
        editorProps: {
            attributes: {
                class: "bg-transparent outline-none overflow-auto cursor-text"
            }
        },
        onUpdate: ({ editor }) => {
            enforceFirstLineHeading(editor);
            // Save content whenever the editor is updated
            if (selectedFolder && selectedNote) {
                const newContent = editor.getHTML();
                handleContentChange(newContent);
            }
        }
    })

    const [selectedFolder, setSelectedFolder] = useState(notes[0]?.id || null); // Set to the first folder's ID by default
    const [selectedNote, setSelectedNote] = useState(notes[0]?.notes[0]?.id || null); // Set to the first note's]); // No note selected initially
    const [noteContent, setNoteContent] = useState("");
    const [currentNote, setCurrentNote] = useState(null);

    const [folderName, setFolderName] = useState("New Folder");
    const [noteTitle, setNoteTitle] = useState("New Note");

    // Save notes to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    // Effect to update the noteContent when a different note is selected
    useEffect(() => {
        if (selectedFolder !== null && selectedNote !== null && editor) {
            const folder = notes.find(folder => folder.id === selectedFolder);
            if (folder) {
                const note = folder.notes.find(note => note.id === selectedNote);
                setCurrentNote(note);
                
                // Update editor content only if different from current content
                if (note && editor.getHTML() !== note.content) {
                    editor.commands.setContent(note.content || '');
                }
            }
        } else if (editor) {
            editor.commands.setContent('');
        }
    }, [selectedFolder, selectedNote, notes, editor]);

    // Function to handle textarea changes and save content
    const handleContentChange = (newContent) => {
        // Update the notes state with the new content and date modified
        const updatedNotes = notes.map(folder => {
            if (folder.id === selectedFolder) {
                return {
                    ...folder,
                    notes: folder.notes.map(note => {
                        if (note.id === selectedNote) {
                            return {
                                ...note,
                                content: newContent,
                                dateModified: new Date(),
                            };
                        }
                        return note;
                    }),
                };
            }
            return folder;
        });

        setNotes(updatedNotes);
    };

    const handleFolderSortChange = (sort, folderId) => {
        const updatedNotes = notes.map(folder => {
            if (folder.id === folderId) {
                return {
                    ...folder,
                    sort: sort,
                };
            }
            return folder;
        });

        setNotes(updatedNotes);
    }

    const handleFolderOrderChange = (order, folderId) => {
        const updatedNotes = notes.map(folder => {
            if (folder.id === folderId) {
                return {
                    ...folder,
                    order: order,
                };
            }
            return folder;
        });

        setNotes(updatedNotes);
    }

    const createNewFolder = () => {
        const newFolder = {
            id: getId(),
            folderName: folderName,
            sort: 'dateModified',
            order: 'asc',
            notes: [],
        };

        setNotes([...notes, newFolder]);
        setFolderName("New Folder");
    };

    const deleteFolder = (folderId) => {
        console.log(folderId);
        const updatedNotes = notes.filter(folder => folder.id !== folderId);
        setSelectedFolder(updatedNotes[0]?.id || null); // Select the first folder by default
        setNotes(updatedNotes);
    }

    const deleteNote = (noteId) => {
        const updatedNotes = notes.map(folder => {
            if (folder.id === selectedFolder) {
                return {
                    ...folder,
                    notes: folder.notes.filter(note => note.id !== noteId),
                };
            }
            return folder;
        });

        setSelectedNote(null); // Deselect the note
        setNotes(updatedNotes);
    }

    const createNewNote = () => {
        if (selectedFolder === null) return; // No folder selected

        const newNote = {
            id: getId(),
            content: "<h2></h2>",
            dateCreated: new Date(),
            dateModified: new Date(),
        };

        const updatedNotes = notes.map(folder => {
            if (folder.id === selectedFolder) {
                return {
                    ...folder,
                    notes: [...folder.notes, newNote],
                };
            }
            return folder;
        });

        setNoteTitle("New Note");
        setNotes(updatedNotes);
        setSelectedNote(newNote.id); // Select the newly created note
    };

    const duplicateNote = (noteId) => {
        const folder = notes.find(folder => folder.id === selectedFolder);
        if (!folder) return;

        const note = folder.notes.find(note => note.id === noteId);
        if (!note) return;

        const newNote = {
            id: getId(),
            title: note.title,
            content: note.content,
            dateCreated: new Date(),
            dateModified: new Date(),
        };

        const updatedNotes = notes.map(folder => {
            if (folder.id === selectedFolder) {
                return {
                    ...folder,
                    notes: [...folder.notes, newNote],
                };
            }
            return folder;
        });

        setNotes(updatedNotes);
    }

    // Reset selectedNote to null when changing folders
    const handleFolderChange = (folderId) => {
        setSelectedFolder(folderId);
        const folder = notes.find(folder => folder.id === folderId);
        if (folder && folder.notes.length > 0) {
            setSelectedNote(folder.notes[0].id);
        } else {
            setSelectedNote(null);
        }
    };

    return (
        <Window
            {...props}
            isCustomized={true}
            customSize={{ width: "1000px", height: "600px" }}
            toolbar={
                <div className="pl-[380px] justify-between">
                    <Toolbar
                        createNewNote={createNewNote}
                        editor={editor}
                    />
                </div>
            }
        >
            <div className="h-full w-full flex">
                <div className="bg-[#2a282c] w-[200px] h-full flex flex-col gap-1 p-2 justify-between">
                    <div className="flex flex-col gap-1">
                        {notes.map((folder) => (
                            <ContextMenu key={folder.id}>
                                <ContextMenuTrigger>
                                    <Folder
                                        isSelected={selectedFolder === folder.id}
                                        onClick={() => handleFolderChange(folder.id)}
                                        folderName={folder.folderName}
                                        count={folder.notes.length}
                                    />
                                </ContextMenuTrigger>
                                <NoteFolderContextMenu 
                                    deleteFolder={() => deleteFolder(folder.id)}
                                    order={folder.order}
                                    sort={folder.sort}
                                    handleFolderSortChange={(sort) => handleFolderSortChange(sort, folder.id)}
                                    handleFolderOrderChange={(order) => handleFolderOrderChange(order, folder.id)}
                                />
                            </ContextMenu>
                        ))}
                    </div>
                    <NoteFolderDialog 
                        folderName={folderName}
                        setFolderName={setFolderName}
                        createNewFolder={createNewFolder}
                    />
                </div>
                <div className={`bg-[#261f22] w-[250px] flex flex-col gap-1 p-2 ${notes.find(folder => folder.id === selectedFolder)?.notes.length === 0 && "justify-center"}`}>
                    {selectedFolder !== null && sortNotes(notes.find(folder => folder.id === selectedFolder))?.notes.map((note) => (
                        <ContextMenu key={note.id}>
                            <ContextMenuTrigger>
                                <Note
                                    dateModified={noteDate(note.dateModified)}
                                    isSelected={selectedNote === note.id}
                                    onClick={() => setSelectedNote(note.id)}
                                    folderName={note.title}
                                    content={note.content}
                                />
                            </ContextMenuTrigger>
                            <NoteContextMenu 
                                deleteNote={() => deleteNote(note.id)}
                                duplicateNote={() => duplicateNote(note.id)}
                            />
                        </ContextMenu>
                    ))}
                    {selectedFolder !== null && notes.find(folder => folder.id === selectedFolder)?.notes.length === 0 && (
                        <p className="text-[#5b5759] text-2xl font-semibold text-center">No Notes</p>
                    )}
                </div>
                <div onClick={() => editor.commands.focus()} className="flex-1 h-full bg-[#1e1e1e] text-white px-4 p-2 overflow-auto cursor-text flex flex-col">
                    <p className="text-center text-sm text-[#818181]">{selectedNote && formatDateTimeforNotes(currentNote?.dateModified)}</p>
                    <EditorContent editor={editor} className="flex-1 caret-yellow-500"/>
                </div>
            </div>
        </Window>
    );
};

const enforceFirstLineHeading = (editor) => {
    const { state } = editor;
    const { doc } = state;
    
    // Get first node
    const firstNode = doc.firstChild;
    
    // If document is empty, ensure h2
    if (doc.childCount === 0) {
      editor.commands.setContent('<h2></h2>');
      return;
    }
    
    // If first node isn't h2, convert it
    if (firstNode.type.name !== 'heading' || firstNode.attrs.level !== 2) {
      editor.chain()
        .focus()
        .setNode('heading', { level: 2 })
        .run();
    }
  };

export default Notes;
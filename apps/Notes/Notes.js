import Window from "@/components/Window";
import { initialNotes } from "@/utils/data";
import { useState, useEffect } from "react";
import Folder from "./Folder";
import Note from "./Note";
import { getId, noteDate } from "@/utils/utils";
import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu";
import NoteContextMenu from "@/components/context-menu/NoteContextMenu";
import NoteFolderContextMenu from "@/components/context-menu/NoteFolderContextMenu";
import { sortNotes } from "./utils";
import NoteFolderDialog from "@/components/dialogs/NoteFolderDialog";
import NewNoteDialog from "@/components/dialogs/NewNoteDialog";

const Notes = ({ fileStructure, setFileStructure, ...props }) => {
    // Load notes from local storage or use initialNotes if local storage is empty
    const [notes, setNotes] = useState(() => {
        const savedNotes = localStorage.getItem('notes');
        return savedNotes ? JSON.parse(savedNotes) : initialNotes;
    });

    const [selectedFolder, setSelectedFolder] = useState(notes[0]?.id || null); // Set to the first folder's ID by default
    const [selectedNote, setSelectedNote] = useState(null); // No note selected initially
    const [noteContent, setNoteContent] = useState("");

    const [folderName, setFolderName] = useState("New Folder");
    const [noteTitle, setNoteTitle] = useState("New Note");

    // Save notes to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    // Effect to update the noteContent when a different note is selected
    useEffect(() => {
        if (selectedFolder !== null && selectedNote !== null) {
            const folder = notes.find(folder => folder.id === selectedFolder);
            if (folder) {
                const note = folder.notes.find(note => note.id === selectedNote);
                setNoteContent(note ? note.content : "");
            }
        } else {
            setNoteContent("");
        }
    }, [selectedFolder, selectedNote, notes]);

    // Function to handle textarea changes and save content
    const handleContentChange = (e) => {
        const newContent = e.target.value;
        setNoteContent(newContent);

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
            title: noteTitle,
            content: "",
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
        setSelectedNote(null); // Deselect any note when changing folders
    };

    return (
        <Window
            {...props}
            isCustomized={true}
            customSize={{ width: "1000px", height: "600px" }}
            toolbar={
                <div className="flex justify-end px-5">
                    <NewNoteDialog
                        noteTitle={noteTitle}
                        setNoteTitle={setNoteTitle}
                        createNewNote={createNewNote}
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
                <div className={`bg-[#261f22] w-[200px] flex flex-col gap-1 p-2 ${notes.find(folder => folder.id === selectedFolder)?.notes.length === 0 && "justify-center"}`}>
                    {selectedFolder !== null && sortNotes(notes.find(folder => folder.id === selectedFolder))?.notes.map((note) => (
                        <ContextMenu key={note.id}>
                            <ContextMenuTrigger>
                                <Note
                                    title={note.title}
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
                <div className="flex-1 h-full bg-[#1e1e1e]">
                    <textarea
                        value={noteContent}
                        onChange={handleContentChange}
                        className="w-full outline-none h-full bg-transparent text-white p-4"
                    />
                </div>
            </div>
        </Window>
    );
};

export default Notes;
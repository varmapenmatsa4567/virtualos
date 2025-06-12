import React from 'react';
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuCheckboxItem } from '@/components/ui/context-menu';

const NoteContextMenu = ({deleteNote, togglePin, duplicateNote, notes, selectedFolder, moveNote, isPinned}) => {
  return (
    <ContextMenuContent className="bg-[#2f292e] text-white w-[200px]">
        <ContextMenuItem className="focus:bg-[#a0812b]">Open Note in New Window</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={togglePin} className="focus:bg-[#a0812b]">{isPinned ? "Unpin Note" : "Pin Note"}</ContextMenuItem>
        <ContextMenuItem className="focus:bg-[#a0812b]">Lock Note</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="focus:bg-[#a0812b]">New Note</ContextMenuItem>
        <ContextMenuItem className="focus:bg-[#a0812b]" onClick={duplicateNote}>Duplicate Note</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="focus:bg-[#a0812b]">Share Note</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub className="bg-[#2f292e] text-white">
            <ContextMenuSubTrigger className="focus:bg-[#a0812b] data-[state=open]:bg-[#a0812b]">Move to</ContextMenuSubTrigger>
            <ContextMenuSubContent className="bg-[#2f292e] text-white">
                {notes.map((folder) => {
                  if(folder.id != selectedFolder){
                    return <ContextMenuItem onClick={() => moveNote(folder.id)} className="focus:bg-[#a0812b]" key={folder.id}>{folder.folderName}</ContextMenuItem>
                  }
                })}
            </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem className="focus:bg-[#a0812b]" onClick={deleteNote}>Delete</ContextMenuItem>
    </ContextMenuContent>
  )
}

export default NoteContextMenu
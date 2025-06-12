import React from 'react';
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuCheckboxItem } from '@/components/ui/context-menu';

const NoteContextMenu = ({deleteNote, duplicateNote}) => {
  return (
    <ContextMenuContent className="bg-[#2f292e] text-white w-[200px]">
        <ContextMenuItem className="focus:bg-[#a0812b]">Open Note in New Window</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="focus:bg-[#a0812b]">Pin Note</ContextMenuItem>
        <ContextMenuItem className="focus:bg-[#a0812b]">Lock Note</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="focus:bg-[#a0812b]">New Note</ContextMenuItem>
        <ContextMenuItem className="focus:bg-[#a0812b]" onClick={duplicateNote}>Duplicate Note</ContextMenuItem>
        <ContextMenuItem className="focus:bg-[#a0812b]">Rename</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="focus:bg-[#a0812b]">Share Note</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub className="bg-[#2f292e] text-white">
            <ContextMenuSubTrigger className="focus:bg-[#a0812b] data-[state=open]:bg-[#a0812b]">Move to</ContextMenuSubTrigger>
            <ContextMenuSubContent className="bg-[#2f292e] text-white">
                <ContextMenuItem className="focus:bg-[#a0812b]">Personal</ContextMenuItem>
                <ContextMenuItem className="focus:bg-[#a0812b]">Work</ContextMenuItem>
                <ContextMenuItem className="focus:bg-[#a0812b]">News</ContextMenuItem>
                <ContextMenuItem className="focus:bg-[#a0812b]">Food</ContextMenuItem>
            </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem className="focus:bg-[#a0812b]" onClick={deleteNote}>Delete</ContextMenuItem>
    </ContextMenuContent>
  )
}

export default NoteContextMenu
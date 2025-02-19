import React from 'react';
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuCheckboxItem } from '@/components/ui/context-menu';

const NoteContextMenu = ({deleteNote, duplicateNote}) => {
  return (
    <ContextMenuContent className="bg-[#2f292e] text-white">
        <ContextMenuItem>New Note</ContextMenuItem>
        <ContextMenuItem onClick={duplicateNote}>Duplicate Note</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Rename</ContextMenuItem>
        <ContextMenuItem>Pin Note</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub className="bg-[#2f292e] text-white">
            <ContextMenuSubTrigger>Move to</ContextMenuSubTrigger>
            <ContextMenuSubContent className="bg-[#2f292e] text-white">
                <ContextMenuItem>Personal</ContextMenuItem>
                <ContextMenuItem>Work</ContextMenuItem>
                <ContextMenuItem>News</ContextMenuItem>
                <ContextMenuItem>Food</ContextMenuItem>
            </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={deleteNote}>Delete</ContextMenuItem>
        <ContextMenuItem>Copy Note</ContextMenuItem>
    </ContextMenuContent>
  )
}

export default NoteContextMenu
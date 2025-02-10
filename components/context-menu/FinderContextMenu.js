import React from 'react';
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuCheckboxItem } from '@/components/ui/context-menu';

const FinderContextMenu = ({onCreateFolder, onPasteItem, canPaste}) => {
  return (
    <ContextMenuContent className="bg-[#2f292e] text-white">
        <ContextMenuItem onClick={onCreateFolder}>New Folder</ContextMenuItem>
        {canPaste && <ContextMenuItem onClick={onPasteItem}>Paste Item</ContextMenuItem>}
        <ContextMenuSeparator />
        <ContextMenuItem>Get Info</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub className="bg-[#2f292e] text-white">
            <ContextMenuSubTrigger>View</ContextMenuSubTrigger>
            <ContextMenuSubContent className="bg-[#2f292e] text-white">
                <ContextMenuCheckboxItem checked>as Icons</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem>as List</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem>as Column</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem>as Gallery</ContextMenuCheckboxItem>
            </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem>Use Groups</ContextMenuItem>
        <ContextMenuItem>Show View Options</ContextMenuItem>
    </ContextMenuContent>
  )
}

export default FinderContextMenu
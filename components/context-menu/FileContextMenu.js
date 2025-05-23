import React from 'react';
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuCheckboxItem } from '@/components/ui/context-menu';

const FileContextMenu = ({onFileOpen, onCopyItem, onCutItem, onDeleteItem, onItemDuplicate, onRename}) => {
  return (
    <ContextMenuContent className="bg-[#2f292e] text-white w-[200px]">
        <ContextMenuItem onClick={onFileOpen}>Open</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onDeleteItem}>Move to Trash</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Get Info</ContextMenuItem>
        <ContextMenuItem onClick={onRename}>Rename</ContextMenuItem>
        <ContextMenuItem onClick={onItemDuplicate}>Duplicate</ContextMenuItem>
        <ContextMenuItem>Make Alias</ContextMenuItem>
        <ContextMenuItem>Quick Look</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onCopyItem}>Copy</ContextMenuItem>
        <ContextMenuItem onClick={onCutItem}>Cut</ContextMenuItem>
        <ContextMenuItem>Share</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Tags...</ContextMenuItem>
    </ContextMenuContent>
  )
}

export default FileContextMenu
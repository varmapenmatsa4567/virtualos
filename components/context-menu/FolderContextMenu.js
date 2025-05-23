import React from 'react';
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuCheckboxItem } from '@/components/ui/context-menu';

const FolderContextMenu = ({onCutItem, onCopyItem, onFolderOpen, onFolderDelete, onFolderDuplicate, isSpecial}) => {
  return (
    <ContextMenuContent className="bg-[#2f292e] text-white w-[200px]">
        <ContextMenuItem onClick={onFolderOpen}>Open in New Tab</ContextMenuItem>
        {!isSpecial && <ContextMenuSeparator />}
        {!isSpecial && <ContextMenuItem onClick={onFolderDelete}>Move to Trash</ContextMenuItem>}
        <ContextMenuSeparator />
        <ContextMenuItem>Get Info</ContextMenuItem>
        {!isSpecial && <ContextMenuItem>Rename</ContextMenuItem>}
        <ContextMenuItem onClick={onFolderDuplicate}>Duplicate</ContextMenuItem>
        <ContextMenuItem>Make Alias</ContextMenuItem>
        <ContextMenuItem>Quick Look</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onCopyItem}>Copy</ContextMenuItem>
        {!isSpecial && <ContextMenuItem onClick={onCutItem}>Cut</ContextMenuItem>}
        <ContextMenuItem>Share</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Tags...</ContextMenuItem>
    </ContextMenuContent>
  )
}

export default FolderContextMenu
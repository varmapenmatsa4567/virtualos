import React from 'react';
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuCheckboxItem } from '@/components/ui/context-menu';

const FileContextMenu = ({onCopyItem, onFolderOpen, onFolderDelete, onFolderDuplicate}) => {
  return (
    <ContextMenuContent className="bg-[#2f292e] text-white">
        <ContextMenuItem onClick={onFolderOpen}>Open</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onFolderDelete}>Move to Trash</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Get Info</ContextMenuItem>
        <ContextMenuItem>Rename</ContextMenuItem>
        <ContextMenuItem onClick={onFolderDuplicate}>Duplicate</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onCopyItem}>Copy</ContextMenuItem>
        <ContextMenuItem>Share</ContextMenuItem>
    </ContextMenuContent>
  )
}

export default FileContextMenu
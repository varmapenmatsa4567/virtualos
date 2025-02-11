import React from 'react';
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuCheckboxItem } from '@/components/ui/context-menu';

const FileContextMenu = ({onFileOpen, onCopyItem, onCutItem, onFolderOpen, onDeleteItem, onFolderDuplicate, onRename}) => {
  return (
    <ContextMenuContent className="bg-[#2f292e] text-white">
        <ContextMenuItem onClick={onFileOpen}>Open</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onDeleteItem}>Move to Trash</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Get Info</ContextMenuItem>
        <ContextMenuItem onClick={onRename}>Rename</ContextMenuItem>
        <ContextMenuItem onClick={onFolderDuplicate}>Duplicate</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onCopyItem}>Copy</ContextMenuItem>
        <ContextMenuItem onClick={onCutItem}>Cut</ContextMenuItem>
        <ContextMenuItem>Share</ContextMenuItem>
    </ContextMenuContent>
  )
}

export default FileContextMenu
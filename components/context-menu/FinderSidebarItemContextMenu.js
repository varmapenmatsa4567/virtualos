import React from 'react';
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuCheckboxItem } from '@/components/ui/context-menu';

const FinderSidebarItemContextMenu = ({removeItem, showInFolder, openItem}) => {
  return (
    <ContextMenuContent className="bg-[#2f292e] text-white w-[200px]">
        <ContextMenuItem onClick={openItem}>Open</ContextMenuItem>
        <ContextMenuItem onClick={showInFolder}>Show in Enclosing Folder</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={removeItem}>Remove from Sidebar</ContextMenuItem>        
        <ContextMenuSeparator />
        <ContextMenuItem>Get Info</ContextMenuItem>
        <ContextMenuItem>Add to Dock</ContextMenuItem>
    </ContextMenuContent>
  )
}

export default FinderSidebarItemContextMenu
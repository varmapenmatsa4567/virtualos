import React from 'react';
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuCheckboxItem } from '@/components/ui/context-menu';

const DesktopContextMenu = ({}) => {
  return (
    <ContextMenuContent className="bg-[#2f292e] text-white w-[170px]">
        <ContextMenuItem>New Folder</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Get Info</ContextMenuItem>
        <ContextMenuItem>Change Wallpaper</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub className="bg-[#2f292e] text-white">
            <ContextMenuSubTrigger>Sort By</ContextMenuSubTrigger>
            <ContextMenuSubContent className="bg-[#2f292e] text-white">
                <ContextMenuCheckboxItem>None</ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem>Name</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem>Kind</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem>Date Modified</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem>Date Created</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem>Size</ContextMenuCheckboxItem>
            </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem>Show View Options</ContextMenuItem>
    </ContextMenuContent>
  )
}

export default DesktopContextMenu
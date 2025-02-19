import React from 'react';
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuCheckboxItem } from '@/components/ui/context-menu';

const NoteFolderContextMenu = ({deleteFolder ,handleFolderSortChange, handleFolderOrderChange, sort, order}) => {
  return (
    <ContextMenuContent className="bg-[#2f292e] text-white">
        <ContextMenuItem>Rename Folder</ContextMenuItem>
        <ContextMenuItem onClick={deleteFolder}>Delete Folder</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>New Folder</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub className="bg-[#2f292e] text-white">
            <ContextMenuSubTrigger>Sort By</ContextMenuSubTrigger>
            <ContextMenuSubContent className="bg-[#2f292e] text-white">
                <ContextMenuCheckboxItem onClick={() => handleFolderSortChange("dateModified")} checked={sort === "dateModified"}>Date Edited</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem onClick={() => handleFolderSortChange("dateCreated")} checked={sort === "dateCreated"}>Date Created</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem onClick={() => handleFolderSortChange("title")} checked={sort === "title"}>Title</ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem onClick={() => handleFolderOrderChange("asc")} checked={order === "asc"}>Ascending</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem onClick={() => handleFolderOrderChange("desc")} checked={order === "desc"}>Descending</ContextMenuCheckboxItem>
            </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>Share</ContextMenuItem>
    </ContextMenuContent>
  )
}

export default NoteFolderContextMenu
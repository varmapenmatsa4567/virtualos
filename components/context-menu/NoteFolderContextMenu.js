import React from 'react';
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuCheckboxItem } from '@/components/ui/context-menu';

const NoteFolderContextMenu = ({deleteFolder ,handleFolderSortChange, handleFolderOrderChange, sort, order}) => {
  return (
    <ContextMenuContent className="bg-[#2f292e] text-white w-[180px]">
        <ContextMenuItem className="focus:bg-[#a0812b]">Rename Folder</ContextMenuItem>
        <ContextMenuItem className="focus:bg-[#a0812b]" onClick={deleteFolder}>Delete Folder</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="focus:bg-[#a0812b]">New Folder</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="focus:bg-[#a0812b]">Share Folder</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub className="bg-[#2f292e] text-white">
            <ContextMenuSubTrigger className="focus:bg-[#a0812b] data-[state=open]:bg-[#a0812b]">Sort By</ContextMenuSubTrigger>
            <ContextMenuSubContent className="bg-[#2f292e] text-white">
                <ContextMenuCheckboxItem className="focus:bg-[#a0812b]" onClick={() => handleFolderSortChange("dateModified")} checked={sort === "dateModified"}>Date Edited</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem className="focus:bg-[#a0812b]" onClick={() => handleFolderSortChange("dateCreated")} checked={sort === "dateCreated"}>Date Created</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem className="focus:bg-[#a0812b]" onClick={() => handleFolderSortChange("title")} checked={sort === "title"}>Title</ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem className="focus:bg-[#a0812b]" onClick={() => handleFolderOrderChange("asc")} checked={order === "asc"}>Ascending</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem className="focus:bg-[#a0812b]" onClick={() => handleFolderOrderChange("desc")} checked={order === "desc"}>Descending</ContextMenuCheckboxItem>
            </ContextMenuSubContent>
        </ContextMenuSub>
    </ContextMenuContent>
  )
}

export default NoteFolderContextMenu
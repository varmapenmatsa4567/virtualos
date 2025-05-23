import React from 'react';
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuCheckboxItem } from '@/components/ui/context-menu';

const FinderContextMenu = ({onCreateFolder, onPasteItem, canPaste, onAddFile, onCreateFile, sort, setSort, view, setView}) => {
  return (
    <ContextMenuContent className="bg-[#2f292e] text-white w-[170px]">
        <ContextMenuItem onClick={onCreateFolder}>New Folder</ContextMenuItem>
        <ContextMenuItem onClick={onCreateFile}>New File</ContextMenuItem>
        {canPaste && <ContextMenuItem onClick={onPasteItem}>Paste Item</ContextMenuItem>}
        <ContextMenuSeparator />
        <ContextMenuItem>Get Info</ContextMenuItem>
        <ContextMenuItem onClick={onAddFile}>Add File</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub className="bg-[#2f292e] text-white">
            <ContextMenuSubTrigger>View</ContextMenuSubTrigger>
            <ContextMenuSubContent className="bg-[#2f292e] text-white">
                <ContextMenuCheckboxItem checked={view === 'icons'} onClick={() => setView('icons')}>as Icons</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem checked={view === 'list'} onClick={() => setView('list')}>as List</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem checked={view === 'column'} onClick={() => setView('column')}>as Column</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem checked={view === 'gallery'} onClick={() => setView('gallery')}>as Gallery</ContextMenuCheckboxItem>
            </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSub className="bg-[#2f292e] text-white">
            <ContextMenuSubTrigger>Sort By</ContextMenuSubTrigger>
            <ContextMenuSubContent className="bg-[#2f292e] text-white">
                <ContextMenuCheckboxItem onClick={() => setSort('none')} checked={sort === 'none'}>None</ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem onClick={() => setSort('name')} checked={sort === 'name'}>Name</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem onClick={() => setSort('kind')} checked={sort === 'kind'}>Kind</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem onClick={() => setSort('dateModified')} checked={sort === 'dateModified'}>Date Modified</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem onClick={() => setSort('dateCreated')} checked={sort === 'dateCreated'}>Date Created</ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem onClick={() => setSort('size')} checked={sort === 'size'}>Size</ContextMenuCheckboxItem>
            </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem>Use Groups</ContextMenuItem>
        <ContextMenuItem>Show View Options</ContextMenuItem>
    </ContextMenuContent>
  )
}

export default FinderContextMenu
import React from 'react';
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger } from '@/components/ui/context-menu';

const PhotoContextMenu = ({onCutItem, onCopyItem, onFolderOpen, onDeletePhoto, onFolderDuplicate}) => {
  return (
    <ContextMenuContent className="bg-[#2f292e] text-white w-36">
        <ContextMenuItem onClick={onFolderOpen}>Get Info</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub className="bg-[#2f292e] text-white">
            <ContextMenuSubTrigger>Show in Album</ContextMenuSubTrigger>
            <ContextMenuSubContent className="bg-[#2f292e] text-white">
                <ContextMenuItem>Work</ContextMenuItem>
                <ContextMenuItem>News</ContextMenuItem>
                <ContextMenuItem>Food</ContextMenuItem>
            </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem>Rotate Clockwise</ContextMenuItem>
        <ContextMenuSub className="bg-[#2f292e] text-white">
            <ContextMenuSubTrigger>Add to</ContextMenuSubTrigger>
            <ContextMenuSubContent className="bg-[#2f292e] text-white">
                <ContextMenuItem>New Album</ContextMenuItem>
                <ContextMenuItem>Work</ContextMenuItem>
                <ContextMenuItem>News</ContextMenuItem>
                <ContextMenuItem>Food</ContextMenuItem>
            </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={onCopyItem}>Duplicate Photo</ContextMenuItem>
        <ContextMenuItem onClick={onCutItem}>Hide Photo</ContextMenuItem>
        <ContextMenuItem onClick={onDeletePhoto}>Delete Photo</ContextMenuItem>
    </ContextMenuContent>
  )
}

export default PhotoContextMenu
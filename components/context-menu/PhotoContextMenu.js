import React from 'react';
import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger } from '@/components/ui/context-menu';

const PhotoContextMenu = ({onCutItem, onRotatePhoto, onCopyItem, onDeletePhoto, isDeleted}) => {
  return (
    <ContextMenuContent className="bg-[#2f292e] text-white w-36">
        <ContextMenuItem>Get Info</ContextMenuItem>
        {!isDeleted && <ContextMenuSeparator />}
        {!isDeleted && <ContextMenuSub className="bg-[#2f292e] text-white">
            <ContextMenuSubTrigger>Show in Album</ContextMenuSubTrigger>
            <ContextMenuSubContent className="bg-[#2f292e] text-white">
                <ContextMenuItem>Work</ContextMenuItem>
                <ContextMenuItem>News</ContextMenuItem>
                <ContextMenuItem>Food</ContextMenuItem>
            </ContextMenuSubContent>
        </ContextMenuSub>}
        {!isDeleted && <ContextMenuItem onClick={onRotatePhoto}>Rotate Clockwise</ContextMenuItem>}
        {!isDeleted && <ContextMenuSub className="bg-[#2f292e] text-white">
            <ContextMenuSubTrigger>Add to</ContextMenuSubTrigger>
            <ContextMenuSubContent className="bg-[#2f292e] text-white">
                <ContextMenuItem>New Album</ContextMenuItem>
                <ContextMenuItem>Work</ContextMenuItem>
                <ContextMenuItem>News</ContextMenuItem>
                <ContextMenuItem>Food</ContextMenuItem>
            </ContextMenuSubContent>
        </ContextMenuSub>}
        <ContextMenuSeparator />
        {!isDeleted && <ContextMenuItem onClick={onCopyItem}>Duplicate Photo</ContextMenuItem>}
        {!isDeleted && <ContextMenuItem onClick={onCutItem}>Hide Photo</ContextMenuItem>}
        <ContextMenuItem onClick={onDeletePhoto}>Delete Photo</ContextMenuItem>
        {isDeleted && <ContextMenuItem onClick={onDeletePhoto}>Recover</ContextMenuItem>}
    </ContextMenuContent>
  )
}

export default PhotoContextMenu
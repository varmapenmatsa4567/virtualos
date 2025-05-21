import { getId } from "./utils";

export const getDefaultFinderItems = () => {
  const rootId = getId();
  return [
    {id: rootId, name: 'Macintosh HD', isDir: true, parentId: null},
    {id: getId(), name: 'Applications', isDir: true, parentId: rootId},
    {id: getId(), name: 'Desktop', isDir: true, parentId: rootId},
    {id: getId(), name: 'Documents', isDir: true, parentId: rootId},
    {id: getId(), name: 'Downloads', isDir: true, parentId: rootId},
    {id: getId(), name: 'Movies', isDir: true, parentId: rootId},
    {id: getId(), name: 'Music', isDir: true, parentId: rootId},
  ]
}

export const getUniqueName = (name, finderItems, currentFinderItem) => {
    let counter = 1;

    // Get current children to check for duplicates
    const currentChildren = finderItems.filter(item => item.parentId === currentFinderItem);
    
    // Check for duplicate names
    while (currentChildren.some(
      item => item.isDir && item.name === name + (counter > 1 ? ` ${counter}` : '')
    )) {
      counter++;
    }
    
    const finalName = name + (counter > 1 ? ` ${counter}` : '');

    return finalName;
}

export const createFolder = (folderName, finderItems, currentFinderItem, setFinderItems) => {
    const newFolderName = folderName || `Untitled Folder`;
    
    const finalName = getUniqueName(newFolderName, finderItems, currentFinderItem);
    
    const newFolder = {
      id: getId(),
      name: finalName,
      isDir: true,
      parentId: currentFinderItem,
    };

    const updatedFinderItems = [ ...finderItems, newFolder ]; 
    
    setFinderItems(updatedFinderItems);
};

export const deleteItem = (itemId, finderItems, setFinderItems) => {
    const itemsToDelete = getNestedItems(itemId, finderItems);
    const updatedFinderItems = finderItems.filter(item => !itemsToDelete.includes(item.id));;
    setFinderItems(updatedFinderItems);
};

// Helper function to get all nested item IDs (including the folder itself)
const getNestedItems = (folderId, items) => {
  const nestedItems = [folderId]; // Start with the folder itself
  
  // Find all direct children
  const children = items.filter(item => item.parentId === folderId);
  
  // Recursively get nested items for each child
  children.forEach(child => {
    if (child.isDir) {
      nestedItems.push(...getNestedItems(child.id, items));
    } else {
      nestedItems.push(child.id);
    }
  });
  
  return nestedItems;
};

export const pasteItem = (itemId, currentDir, finderItems, setFinderItems, isCut) => {
    if(isCut) {
        const updatedFinderItems = finderItems.map(item => {
            if (item.id === itemId) {
                return {
                    ...item,
                    parentId: currentDir
                };
            }
            return item;
        })
        setFinderItems(updatedFinderItems);
    }
}
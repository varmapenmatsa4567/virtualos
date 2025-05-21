import { getId } from "./utils";

export const getDefaultFinderItems = () => {
  const rootId = getId();
  return [
    {id: rootId, name: 'Macintosh HD', isDir: true, parentId: null, dateCreated: new Date(), dateModified: new Date()},
    {id: getId(), name: 'Applications', isDir: true, parentId: rootId, dateCreated: new Date(), dateModified: new Date()},
    {id: getId(), name: 'Desktop', isDir: true, parentId: rootId, dateCreated: new Date(), dateModified: new Date()},
    {id: getId(), name: 'Documents', isDir: true, parentId: rootId, dateCreated: new Date(), dateModified: new Date()},
    {id: getId(), name: 'Downloads', isDir: true, parentId: rootId, dateCreated: new Date(), dateModified: new Date()},
    {id: getId(), name: 'Movies', isDir: true, parentId: rootId, dateCreated: new Date(), dateModified: new Date()},
    {id: getId(), name: 'Music', isDir: true, parentId: rootId, dateCreated: new Date(), dateModified: new Date()},
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
      dateCreated: new Date(),
      dateModified: new Date()
    };

    const updatedFinderItems = [ ...finderItems, newFolder ]; 
    
    setFinderItems(updatedFinderItems);
};

export const deleteItem = (itemId, finderItems, setFinderItems) => {
    const itemsToDelete = getNestedItems(itemId, finderItems);
    const updatedFinderItems = finderItems.filter(item => !itemsToDelete.includes(item.id));;
    setFinderItems(updatedFinderItems);
};

/**
 * Helper function to check if a target directory is an ancestor of a potential ancestor.
 * This prevents copying a folder into itself or its subfolders.
 * @param {string} targetId The ID of the potential child directory.
 * @param {string} potentialAncestorId The ID of the potential parent directory.
 * @param {Array<Object>} allItems The complete list of all finder items.
 * @returns {boolean} True if targetId is an ancestor of potentialAncestorId, false otherwise.
 */
const isAncestor = (targetId, potentialAncestorId, allItems) => {
    let current = allItems.find(i => i.id === targetId);
    while (current && current.parentId !== null) {
        if (current.parentId === potentialAncestorId) {
            return true;
        }
        current = allItems.find(i => i.id === current.parentId);
    }
    return false;
};

/**
 * Helper function to recursively copy an item and its children.
 * It generates new IDs and updates parent IDs for the copied structure.
 * @param {string} sourceItemId The ID of the item to copy.
 * @param {string | null} newParentId The ID of the new parent for the top-level copied item.
 * @param {Array<Object>} allFinderItems The complete list of all finder items.
 * @param {Object} idMap A map to store old ID to new ID mappings during recursion.
 * @returns {Array<Object>} An array of newly created item objects representing the copied structure.
 */
const copyNestedItems = (sourceItemId, newParentId, allFinderItems, idMap) => {
    const copiedItems = [];
    const item = allFinderItems.find(i => i.id === sourceItemId);

    if (!item) {
        console.warn(`Item with ID ${sourceItemId} not found for copying.`);
        return [];
    }

    const newId = getId();
    idMap[sourceItemId] = newId; // Map old ID to new ID

    // Create the new item object with new ID and updated parentId
    const newItem = {
        ...item,
        id: newId,
        // The parent of this new item will be newParentId.
        // For children, their parentId will be updated based on idMap later.
        parentId: newParentId,
        dateCreated: new Date(),
        dateModified: new Date()
    };
    copiedItems.push(newItem);

    // If it's a directory, recursively copy its children
    if (item.isDir) {
        const children = allFinderItems.filter(child => child.parentId === sourceItemId);
        children.forEach(child => {
            // The new parent for these children will be the new ID of the current item (newItem.id)
            copiedItems.push(...copyNestedItems(child.id, newItem.id, allFinderItems, idMap));
        });
    }
    return copiedItems;
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
    const item = finderItems.find(item => item.id === itemId);
    if(isCut) {
        // Handle cut operation
        if (item.parentId === currentDir) {
          // Item is already in the target directory, no action needed for cut
          console.warn("Item is already in the target directory.");
          return;
        }

        // Prevent cutting a folder into itself or its subfolder
        if (item.isDir && (item.id === currentDir || isAncestor(currentDir, item.id, finderItems))) {
            console.warn("Cannot move a folder into itself or its subfolder.");
            return;
        }
        const updatedFinderItems = finderItems.map(item => {
            if (item.id === itemId) {
                const folderName = getUniqueName(item.name, finderItems, currentDir);
                return {
                    ...item,
                    parentId: currentDir,
                    name: folderName
                };
            }
            return item;
        })
        setFinderItems(updatedFinderItems);
    }
    else {
       // Prevent copying an item into itself or its child
      if (item.isDir && (item.id === currentDir || isAncestor(currentDir, item.id, finderItems))) {
          console.warn("Cannot copy a folder into itself or its subfolder.");
          return;
      }

      const idMap = {}; // To map old IDs to new IDs for recursive copying
        // Recursively copy the item and all its children, generating new IDs and updating parentIds
        const copiedStructure = copyNestedItems(itemId, currentDir, finderItems, idMap);

        // Find the top-level copied item in the new structure (using the idMap)
        const topLevelCopiedItem = copiedStructure.find(copiedItem => copiedItem.id === idMap[itemId]);

        if (topLevelCopiedItem) {
            // Generate a unique name for the top-level copied item in the target directory
            topLevelCopiedItem.name = getUniqueName(item.name, finderItems, currentDir);
        }

        // Add the newly copied items to the existing finder items
        const updatedFinderItems = [...finderItems, ...copiedStructure];
        setFinderItems(updatedFinderItems);
    }
}

export const getSortedItems = (items, sortBy) => {
  const sortedItems = [...items];

  // console.log("Sorting items by:", sortBy);

  switch (sortBy) {
    case 'name':
      sortedItems.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'kind':
      sortedItems.sort((a, b) => {
        const kindA = a.isDir ? 'folder' : 'file';
        const kindB = b.isDir ? 'folder' : 'file';
        return kindA.localeCompare(kindB);
      });
      break;
    case 'dateModified':
      sortedItems.sort((a, b) => new Date(b.dateModified) - new Date(a.dateModified));
      break;
    case 'dateCreated':
      sortedItems.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
      break;
    case 'size':
      sortedItems.sort((a, b) => {
        const sizeA = a.isDir ? 0 : a.size || 0; // Assuming size is defined for files    
        const sizeB = b.isDir ? 0 : b.size || 0; // Assuming size is defined for files
        return sizeB - sizeA;
      });
      break;
    default:
      break;
  }

  // console.log("Sorted items:", sortedItems);

  return sortedItems;
}
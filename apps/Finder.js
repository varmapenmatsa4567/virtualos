import React, { useState, useEffect } from 'react';
import Window from '@/components/Window';
import Folder from '@/components/Folder';
import File from '../components/File';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu';
import FinderContextMenu from '@/components/context-menu/FinderContextMenu';

// Helper function to recursively find a folder by path
const getFolderByPath = (structure, path) => {
  return path.reduce((current, id) => {
    return current?.children?.find(item => item.id === id) || current;
  }, { children: structure });
};

// Helper to find item by ID
const findItemById = (items, id) => {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children) {
        const found = findItemById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };
  
  // Helper to delete item
  const deleteItem = (items, id) => {
    return items.filter(item => {
      if (item.id === id) return false;
      if (item.children) {
        item.children = deleteItem(item.children, id);
      }
      return true;
    });
  };


const Finder = (props) => {
  const initialStructure = [
    { id: 1, name: 'Documents', type: 'folder', children: [
      { id: 2, name: 'sample.pdf', type: 'file' },
      { id: 3, name: 'sample.docx', type: 'file' }
    ]},
    { id: 4, name: 'Projects', type: 'folder', children: [
      { id: 5, name: 'main.py', type: 'file' }
    ]},
    { id: 6, name: 'Downloads', type: 'folder', children: [
      { id: 7, name: 'image.jpg', type: 'file' }
    ]},
    { id: 8, name: 'Music', type: 'folder', children: [
      { id: 9, name: 'Telugu songs', type: 'folder', children: [] },
      { id: 10, name: 'English songs', type: 'folder', children: [] }
    ]}
  ];

  const [currentId, setCurrentId] = useState(11);
  const [fileStructure, setFileStructure] = useState(initialStructure);
  const [currentPath, setCurrentPath] = useState([]);
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [clipboard, setClipboard] = useState(null);
  const [isCutOperation, setIsCutOperation] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);


  // Get current folder's children
  const currentFolder = getFolderByPath(fileStructure, currentPath);
  const finderItems = currentFolder?.children || [];

  const copyItem = (id) => {
        const item = findItemById(fileStructure, id);
        if (item) {
        setClipboard({ item: JSON.parse(JSON.stringify(item)), isCut: false });
        setIsCutOperation(false);
        }
    };
    
    const cutItem = (id) => {
        const item = findItemById(fileStructure, id);
        if (item) {
            setClipboard({ item: JSON.parse(JSON.stringify(item)), isCut: true });
            setIsCutOperation(true);
        }
    };
    const pasteItem = () => {
        if (!clipboard) return;
      
        // Generate new IDs for the entire hierarchy
        const generateNewIds = (item, idMap) => {
          const newId = currentId;
          idMap[item.id] = newId;
          const newItem = { ...item, id: newId };
          if (newItem.children) {
            newItem.children = newItem.children.map(child => 
              generateNewIds(child, idMap)
            );
          }
          return newItem;
        };
      
        const idMap = {};
        const newItem = generateNewIds(clipboard.item, idMap);

        // Update name if duplicate exists
        const existingNames = finderItems.map(item => item.name);
        let newName = newItem.name;
        let counter = 1;

        console.log(finderItems);
        console.log(existingNames);

        
        while (existingNames.includes(newName)) {
          newName = `${newItem.name} (${counter})`;
          counter++;
        }
      
        newItem.name = newName;
      
        // Update structure
        const updateStructure = (items, path, depth = 0) => {
          if (depth === path.length) {
            return [...items, newItem];
          }
      
          return items.map(item => {
            if (item.id === path[depth]) {
              return {
                ...item,
                children: updateStructure(item.children || [], path, depth + 1)
              };
            }
            return item;
          });
        };
      
        // If cut operation, remove original
        if (isCutOperation) {
          const updatedStructure = deleteItem(fileStructure, clipboard.item.id);
          setFileStructure(updateStructure(updatedStructure, currentPath));
          setClipboard(null);
        } else {
          setFileStructure(prev => updateStructure(prev, currentPath));
        }
      
        setCurrentId(prev => prev + Object.keys(idMap).length);
      };

  const openFolder = (id) => {
    const newPath = [...currentPath, id];
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newPath);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(newPath);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
    }
  };

  const createFolder = () => {
    const newFolder = {
      id: currentId,
      name: "Untitled Folder",
      type: 'folder',
      children: []
    };

    // Recursive function to update the structure
    const updateStructure = (items, path, depth = 0) => {
      if (depth === path.length) {
        return [...items, newFolder];
      }
      
      return items.map(item => {
        if (item.id === path[depth]) {
          return {
            ...item,
            children: updateStructure(item.children || [], path, depth + 1)
          };
        }
        return item;
      });
    };

    const updatedStructure = updateStructure(fileStructure, currentPath);
    setFileStructure(updatedStructure);
    setCurrentId(currentId + 1);
  };

  const deleteFolder = (id) => {
    const updateStructure = (items) => {
      return items.filter(item => {
        if (item.id === id) return false;
        if (item.children) {
          item.children = updateStructure(item.children);
        }
        return true;
      });
    };

    setFileStructure(prev => updateStructure(prev));
  };

  const duplicateFolder = (id) => {
    const findFolderById = (items, id) => {
      for (const item of items) {
        if (item.id === id) return item;
        if (item.children) {
          const found = findFolderById(item.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    const folderToDuplicate = findFolderById(fileStructure, id);
    if (!folderToDuplicate) return;

    const newFolder = {
      ...folderToDuplicate,
      id: currentId,
      name: `${folderToDuplicate.name} Copy`,
      children: JSON.parse(JSON.stringify(folderToDuplicate.children))
    };

    const updateStructure = (items, path, depth = 0) => {
      if (depth === path.length) {
        return [...items, newFolder];
      }

      return items.map(item => {
        if (item.id === path[depth]) {
          return {
            ...item,
            children: updateStructure(item.children || [], path, depth + 1)
          };
        }
        return item;
      });
    };

    const updatedStructure = updateStructure(fileStructure, currentPath);
    setFileStructure(updatedStructure);
    setCurrentId(currentId + 1);
  };

  const renderItems = () => {
    console.log(finderItems);
    return finderItems.map((item, index) => {
      if (item.type === 'folder') {
        return (
            <Folder
                key={index}
                onClick={() => {
                    openFolder(item.id);
                    setSelectedItemId(item.id);
                }}
                onFolderDelete={() => deleteFolder(item.id)}
                folderName={item.name}
                onFolderDuplicate={() => duplicateFolder(item.id)}
                onCopyItem={() => copyItem(item.id)}
                onCutItem={() => cutItem(item.id)}
                onSelect={() => setSelectedItemId(item.id)}
                isSelected={selectedItemId === item.id}
            />
        );
      }
      return <File 
        key={index} 
        fileName={item.name}
        onCopyItem={() => copyItem(item.id)}
        onCutItem={() => cutItem(item.id)}
       />;

    });
  };

  // Add this inside the component
    useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'c' && selectedItemId) {
          copyItem(selectedItemId);
        }
        if (e.key === 'v' && clipboard) {
          pasteItem();
        }
        if (e.key === 'x' && selectedItemId) {
          cutItem(selectedItemId);
        }
        if (e.key == 'Backspace' && selectedItemId) {
          deleteFolder(selectedItemId);
        }
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemId, clipboard]);

  return (
    <Window {...props}
      toolbar={
        <div className='flex items-center gap-2'>
          <button disabled={historyIndex == 0} onClick={goBack} className='p-0.5 hover:bg-[#242227] rounded-md'>
            <ChevronLeft className={`${historyIndex == 0 ? 'text-[#5d5b5d]' : 'text-white'}`} />
          </button>
          <button disabled={historyIndex == history.length-1} onClick={goForward} className='p-0.5 hover:bg-[#242227] rounded-md'>
            <ChevronRight className={`${historyIndex == history.length-1 ? 'text-[#5d5b5d]' : 'text-white'}`} />
          </button>
          <p className='text-white text-sm font-semibold'>
            {currentPath.length === 0 ? 'Home' : currentFolder.name}
          </p>
        </div>
      }
    >
      <ContextMenu>
        <ContextMenuTrigger>
          <div className='h-full w-full'>
            <div className='w-full p-3 px-6 flex gap-x-4 gap-y-2 flex-wrap'>
              {renderItems()}
            </div>
          </div>
        </ContextMenuTrigger>
        <FinderContextMenu 
            onCreateFolder={createFolder}
            onDuplicateFolder={duplicateFolder}
            onPasteItem={pasteItem}
            canPaste={!!clipboard}
        />
      </ContextMenu>
    </Window>
  );
};

export default Finder;
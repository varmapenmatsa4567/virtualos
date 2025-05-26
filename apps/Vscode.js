import React, {useEffect, useState} from 'react';
import Window from '@/components/Window';
import Editor from '@monaco-editor/react';
import { getLanguageFromExtension } from '@/utils/utils';
import { Save } from 'lucide-react';

const Vscode = ({fileStructure, setFileStructure, ...props}) => {
  const openedFile = props.openedFile;
  const fileName = openedFile ? openedFile.name : 'Untitled.txt';
  const [content, setContent] = React.useState("");
  const [isModified, setIsModified] = React.useState(false);


  const language = getLanguageFromExtension(fileName); 

  const changeContent = () => {
    if(openedFile === null) return;
    // console.log("hello");
    const updateStructure = (items) => {
      return items.map(item => {
        if (item.id === openedFile.id) {
          return { ...item, content: content };
        }
        if (item.children) {
          item.children = updateStructure(item.children);
        }
        return item;
      });
    };
    setFileStructure(prev => updateStructure(prev));
    setIsModified(false);
  }

  const getContent = () => {
    if(openedFile === null) return;

    const findContent = (items) => {
      for (let item of items) {
        if (item.id === openedFile.id) {
          return item.content;
        }
        if (item.children) {
          const content = findContent(item.children);
          if (content) return content;
        }
      }
    };
    setContent(findContent(fileStructure));
  }

  const handleContentChange = (val) => {
    setContent(val);
    setIsModified(true);
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        // event.preventDefault(); // Prevent the default save dialog
        changeContent(); // Save the file content
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [content]); 

  useEffect(() => {
    getContent();
  }, [openedFile]);

  return (
    <Window {...props}
      toolbar={
        <div className='flex items-center justify-between h-11'>
          <p className='text-white text-sm'>
            {isModified ? '*' : ''}{openedFile ? openedFile.name : 'Untitled.txt'}
          </p>
          <Save onClick={changeContent} size={26} className='text-white mx-4 hover:bg-gray-600 p-1 rounded-full' />
        </div>
      }
    >
      <div className='overflow-hidden h-full'>
        <Editor value={content} onChange={handleContentChange} defaultLanguage={language} className='h-auto' />;
      </div>
      <div>
        <button className='bg-[#2f292e] text-white w-full h-8'>Save</button>
      </div>
    </Window>
  )
}

export default Vscode
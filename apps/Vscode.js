import React, {useEffect, useState} from 'react';
import Window from '@/components/Window';
import Editor from '@monaco-editor/react';
import { getLanguageFromExtension } from '@/utils/utils';
import { Save } from 'lucide-react';
import { initialStructure } from '@/utils/data';


const Vscode = ({fileStructure, setFileStructure, ...props}) => {
  const openedFile = props.openedFile;
  // console.log("openedFile"+openedFile["content"]);
  const fileName = openedFile ? openedFile.name : 'Untitled.txt';
  const [content, setContent] = React.useState(openedFile ? openedFile.content : "");
  // const [fileStructure, setFileStructure] = useState(() => {
  //     const savedFileStructure = localStorage.getItem('fileStructure');
  //     return savedFileStructure ? JSON.parse(savedFileStructure) : initialStructure;
  // });

  const language = getLanguageFromExtension(fileName); 

  const changeContent = () => {
    // console.log("hello");
    const updateStructure = (items) => {
      console.log(items);
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
  }

  const getContent = () => {
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

  // useEffect(() => {
  //     // Save fileStructure to local storage whenever it changes
  //     // console.log("file structure"+JSON.stringify(fileStructure));
  //     localStorage.setItem('fileStructure', JSON.stringify(fileStructure));
  //   }, [fileStructure]);
  
  //   useEffect(() => {
  //     // Load fileStructure from local storage on component mount
  //     const savedFileStructure = localStorage.getItem('fileStructure');
  //     // console.log("savedFileStructure"+savedFileStructure);
  //     if (savedFileStructure) {
  //       setFileStructure(JSON.parse(savedFileStructure));
  //     }
  //     getContent();
  //   }, []);
  useEffect(() => {
    getContent();
  }, [openedFile]);

  return (
    <Window {...props}
      toolbar={
        <div className='flex items-center justify-between h-11'>
          <p className='text-white text-sm'>{openedFile ? openedFile.name : 'Untitled.txt'}</p>
          <Save onClick={changeContent} size={26} className='text-white mx-4 hover:bg-gray-600 p-1 rounded-full' />
        </div>
      }
    >
      <div className='overflow-hidden h-full'>
        <Editor value={content} onChange={(val, event) => setContent(val)} defaultLanguage={language} className='h-auto' />;
      </div>
      <div>
        <button className='bg-[#2f292e] text-white w-full h-8'>Save</button>
      </div>
    </Window>
  )
}

export default Vscode
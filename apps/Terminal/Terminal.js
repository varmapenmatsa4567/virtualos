
import Window from "@/components/Window";
import useFinderStore from "@/stores/finder-store";
import { useState, useCallback, useEffect, useRef } from "react";

const Terminal = ({...props}) => {

  const {finderItems, setFinderItems} = useFinderStore();
  const [currentFinderItem, setCurrentFinderItem] = useState("macos");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(["Last login: Mon May 26 21:29:26"]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  // Get current directory name for prompt
  const getCurrentDirName = () => {
    const currentDir = finderItems.find(item => item.id === currentFinderItem);
    return currentDir ? currentDir.name : "~";
  };

  // Get full path for pwd command
  const getCurrentPath = () => {
    let path = [];
    let current = finderItems.find(item => item.id === currentFinderItem);
    
    while (current && current.parentId !== null) {
      path.unshift(current.name);
      current = finderItems.find(item => item.id === current.parentId);
    }
    
    return "/" + path.join("/");
  };

  const handleInput = useCallback((e) => {
    if (e.key === 'Enter') {
      // Add command to history
      if (input.trim() && input.trim() !== commandHistory[commandHistory.length - 1]) {
        setCommandHistory(prev => [...prev, input.trim()]);
      }
      setHistoryIndex(-1);
      
      // Add command to output
      setOutput(prev => [...prev, `chiranjeevip@MacBook-Air : ${getCurrentDirName()} % ${input}`]);
      
      const args = input.trim().split(/\s+/);
      const command = args[0];
      
      if (command) {
        executeCommand(command, args.slice(1));
      }
      
      setInput("");
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  }, [input, commandHistory, historyIndex, currentFinderItem, finderItems]);

  const executeCommand = (command, args) => {
    switch (command) {
      case 'ls':
        listItems(args);
        break;
      case 'cd':
        changeDirectory(args[0]);
        break;
      case 'pwd':
        setOutput(prev => [...prev, getCurrentPath()]);
        break;
      case 'mkdir':
        createDirectory(args[0]);
        break;
      case 'clear':
        setOutput([]);
        break;
      case 'help':
        showHelp();
        break;
      case 'cat':
        catFile(args[0]);
        break;
      default:
        setOutput(prev => [...prev, `zsh: command not found: ${command}`]);
        break;
    }
  };

  const listItems = (args) => {
    const itemsInCurrentDir = finderItems.filter(item => item.parentId === currentFinderItem);
    
    if (args.includes('-l')) {
      // Long format
      const formatted = itemsInCurrentDir.map(item => {
        const type = item.isDir ? 'd' : '-';
        const permissions = 'rwxr-xr-x';
        const date = new Date(item.dateModified).toLocaleDateString();
        const size = item.isDir ? '4096' : (item.size || '0');
        return `${type}${permissions}  1 user  staff  ${size.padStart(8)} ${date} ${item.name}`;
      }).join('\n');
      setOutput(prev => [...prev, formatted]);
    } else {
      // Simple format
      const list = itemsInCurrentDir.map(item => item.name).join('  ');
      setOutput(prev => [...prev, list]);
    }
  };

  const changeDirectory = (dir) => {
    if (!dir || dir === '.') {
      return; // Stay in current directory
    }
    
    if (dir === '..') {
      // Go to parent directory
      const currentDir = finderItems.find(item => item.id === currentFinderItem);
      if (currentDir && currentDir.parentId) {
        setCurrentFinderItem(currentDir.parentId);
      } else {
        setOutput(prev => [...prev, "Already at root directory"]);
      }
      return;
    }
    
    if (dir === '/' || dir === '~') {
      setCurrentFinderItem("macos");
      return;
    }
    
    // Find directory by name in current directory
    const targetDir = finderItems.find(item => 
      item.name === dir && 
      item.isDir && 
      item.parentId === currentFinderItem
    );
    
    if (targetDir) {
      setCurrentFinderItem(targetDir.id);
    } else {
      setOutput(prev => [...prev, `cd: no such file or directory: ${dir}`]);
    }
  };

  const createDirectory = (dirName) => {
    if (!dirName) {
      setOutput(prev => [...prev, "mkdir: missing operand"]);
      return;
    }
    
    // Check if directory already exists
    const exists = finderItems.some(item => 
      item.name === dirName && 
      item.parentId === currentFinderItem
    );
    
    if (exists) {
      setOutput(prev => [...prev, `mkdir: cannot create directory '${dirName}': File exists`]);
      return;
    }
    
    // Create new directory
    const newDir = {
      id: Date.now().toString(),
      name: dirName,
      isDir: true,
      parentId: currentFinderItem,
      dateCreated: new Date(),
      dateModified: new Date()
    };
    
    setFinderItems([...finderItems, newDir]);
    setOutput(prev => [...prev, `Directory '${dirName}' created`]);
  };

  const catFile = (fileName) => {
    if (!fileName) {
      setOutput(prev => [...prev, "cat: missing operand"]);
      return;
    }
    
    const file = finderItems.find(item => 
      item.name === fileName && 
      !item.isDir && 
      item.parentId === currentFinderItem
    );
    
    if (file) {
      setOutput(prev => [...prev, file.content || "[Binary file or empty content]"]);
    } else {
      setOutput(prev => [...prev, `cat: ${fileName}: No such file or directory`]);
    }
  };

  const showHelp = () => {
    const helpText = `Available commands:
  ls [-l]    - List directory contents
  cd [dir]   - Change directory
  pwd        - Print working directory
  mkdir      - Create directory
  cat [file] - Display file contents
  clear      - Clear terminal
  help       - Show this help message`;
    setOutput(prev => [...prev, helpText]);
  };

  // Auto-scroll to bottom when output changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Focus input when terminal is clicked
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Window {...props} 
      isTransparent={true}
    >
      <div 
        className="w-full tracking-wider h-full bg-[#1d1e1e] text-white font-light text-[11px] cursor-text overflow-hidden"
        onClick={handleTerminalClick}
      >
        <div 
          ref={outputRef}
          className="h-full overflow-y-auto p-1 leading-tight scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
        >
          {output.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap">{line}</div>
          ))}
          <div className="flex items-center">
            <span className="text-green-400">chiranjeevip@MacBook-Air</span>
            <span className="text-white mx-1">:</span>
            <span className="text-blue-400">{getCurrentDirName()}</span>
            <span className="text-white ml-1">%</span>
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                type="text"
                className="outline-none bg-transparent w-full pl-1 text-white caret-transparent"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInput}
                autoFocus
                spellCheck={false}
              />
              <div className="absolute left-1 top-0 bottom-0 flex items-center pointer-events-none">
                <span className="text-white">{input}</span>
                <div className="w-[7px] h-4 bg-white opacity-75"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}

export default Terminal
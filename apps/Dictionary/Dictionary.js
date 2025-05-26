
import Window from "@/components/Window";
import axios from "axios";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { extractWordData } from "./dict-util";
import { stopPropagation } from "@/utils/utils";

const Dictionary = ({...props}) => {

  const [query, setQuery] = useState('');
  const [wordData, setWordData] = useState(null);

  const getResult = async() => {
      const response = await axios({
            url: `/api/dictionary?query=${query}`,
      });
      return response.data;
  }

  const getMeaning = async() => {
    const result = await getResult();
    const fianalResult = extractWordData(result);
    setWordData(fianalResult);
    console.log(fianalResult);
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      getMeaning();
    }
  }


  return (
    <Window {...props} 
      toolbar={
        <div className="flex items-center justify-between px-2">
          <h1 className="text-sm font-semibold text-white">Dictionary</h1>
          <div className="flex border border-[#4b4b4b] rounded-md items-center px-1 w-[250px]">
            <IoIosSearch className="text-[#a6a5a6] text-lg"/>
            <input onDoubleClick={stopPropagation} onKeyUp={handleKeyUp} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" type="text" className="outline-none flex-1 bg-transparent text-sm p-1 text-white"/>
          </div>
        </div>
      }
    >
      {wordData && <div onContextMenu={stopPropagation} className="w-full h-full flex flex-col text-white p-4 space-y-6 overflow-auto">
        {/* Word header with phonetics */}
        <div className="space-y-1">
          <p className="text-xl flex gap-2 items-center">
            {wordData.word}
            <span className="text-[#a09fa0] text-sm">| {wordData.phonetics} |</span>
          </p>
        </div>

        {/* Meanings by part of speech */}
        {wordData.meanings.map((meaning, index) => (
          <div key={index} className="space-y-2 text-sm">
            {/* Part of speech */}
            <p className="text-[#a09fa0] text-md font-semibold">{meaning.partOfSpeech}</p>
            
            {/* Definitions */}
            <ol className="list-decimal list-inside space-y-1 px-3">
              {meaning.definitions.map((def, defIndex) => (
                <li key={defIndex} className="text-white">
                  <span className="text-white">{def.definition}</span>
                  {def.example && (
                    <p className="text-[#a09fa0] italic mt-1 px-4">"{def.example}"</p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        ))}

        {/* Synonyms and Antonyms */}
    <div className="space-y-3">
      {/* Synonyms */}
      {wordData.synonyms.length > 0 && (
        <div className="flex gap-2 flex-col">
          <p className="text-[#a09fa0] text-sm font-semibold">Synonyms:</p>
          <div className="flex flex-wrap gap-1 px-4">
            {wordData.synonyms.map((synonym, index) => (
              <span key={index} className="text-white text-sm">
                {synonym}{index !== wordData.synonyms.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Antonyms */}
      {wordData.antonyms.length > 0 && (
        <div className="flex gap-2 flex-col">
          <p className="text-[#a09fa0] text-sm font-semibold">Antonyms:</p>
          <div className="flex flex-wrap gap-1 px-4">
            {wordData.antonyms.map((antonym, index) => (
              <span key={index} className="text-white text-sm">
                {antonym}{index !== wordData.antonyms.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>
        </div>
      )}
      </div>
      </div>}
    </Window>
  )
}

export default Dictionary;
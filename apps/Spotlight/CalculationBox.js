import axios from 'axios';
import { all, create } from 'mathjs';
import React, { useEffect, useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import { IoMdCheckmark } from 'react-icons/io';

const CalculationBox = ({searchText}) => {

    const getResult = async(query) => {
      const response = await axios({
            url: `/api/wolfram?query=${query}`,
      });
      return response.data;
    }

    const [result, setResult] = useState("");

    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {

      const searchWolfram = async() => {
        try {
          const result = await getResult(searchText);
          if(result != searchText && typeof result != 'object') setResult(result);
          else setResult("");
          console.log(result);   
        } catch (error) {
            setResult("");
        }
      }
      searchWolfram();
    }, [searchText])

    const copyResult = () => {
      navigator.clipboard.writeText(result);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  if(result == "") return null;

  return (
    <div className='bg-[#505050] rounded-xl text-white m-2 mx-4 p-2 px-4 flex justify-between items-center'>
      <div className='flex flex-col'>
        <span className='text-[#cfd0d8] text-xs'>{searchText}=</span>
        <span className='font-semibold'>{result}</span>
      </div>
      <div className='bg-[#73738a] p-2 rounded-full'>
        {isCopied ? <IoMdCheckmark className='w-3 h-3'/> : <FaCopy onClick={copyResult} className='w-3 h-3'/>}
      </div>
    </div>
  )
}

export default CalculationBox
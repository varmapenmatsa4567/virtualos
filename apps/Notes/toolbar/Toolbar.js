import React, { useRef, useState } from 'react';
import NewNoteDialog from '@/components/dialogs/NewNoteDialog';
import { FaTasks, FaImages } from 'react-icons/fa';
import { LuTable } from 'react-icons/lu';
import { IoIosLink } from 'react-icons/io';
import { IoCheckmarkOutline, IoLockClosedOutline, IoShareOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { SquarePen } from 'lucide-react';


const Toolbar = ({createNewNote, editor}) => {

    
    const [isTextMenuOpen, setIsTextMenuOpen] = useState(false);
    
    const textMenuRef = useRef(null);
    
    useOutsideClick(textMenuRef, () => setIsTextMenuOpen(false));
    if(!editor) return null;

  return (
    <div className="flex items-center px-2 justify-between">
        <SquarePen onClick={createNewNote} className="cursor-pointer" size={18} color="#9b9a9b" />
        <div className="flex items-center gap-4 relative">
            <p onClick={() => setIsTextMenuOpen(!isTextMenuOpen)} className="text-[#9e9d9c]">Aa</p>
            <FaTasks className="text-[#9e9d9c]"/>
            <LuTable onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className="text-[#9e9d9c]"/>
            <FaImages className="text-[#9e9d9c]"/>
            {isTextMenuOpen && 
                <motion.div 
                    ref={textMenuRef}
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}} 
                    style={{ pointerEvents: 'auto', zIndex: 100 }}
                    className="bg-[#26282b] p-2 text-white flex flex-col w-44 shadow-2xl absolute top-8 border border-[#515355] rounded-xl -left-20"
                >
                    <div className='flex px-1 pb-1 gap-1 text-lg border-b border-[#aaa]'>
                        <p onClick={() => editor.chain().focus().toggleBold().run()} className={`font-bold w-7 rounded-md text-center ${editor.isActive('bold') && 'bg-[#af8f25]'} hover:bg-[#af8f25]`}>B</p>
                        <p onClick={() => editor.chain().focus().toggleItalic().run()} className={`italic w-7 rounded-md text-center ${editor.isActive('italic') && 'bg-[#af8f25]'} hover:bg-[#af8f25]`}>I</p>
                        <p onClick={() => editor.chain().focus().toggleUnderline().run()} className={`underline w-7 rounded-md text-center ${editor.isActive('underline') && 'bg-[#af8f25]'} hover:bg-[#af8f25]`}>U</p>
                        <p onClick={() => editor.chain().focus().toggleStrike().run()} className={`line-through w-7 rounded-md text-center ${editor.isActive('strike') && 'bg-[#af8f25]'} hover:bg-[#af8f25]`}>S</p>
                    </div>
                    <div className='py-1 border-b border-[#aaa]'>
                        <p onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className='flex items-center font-bold text-xl gap-2 px-1 h-7 hover:bg-[#af8f25] rounded-md'><IoCheckmarkOutline className={`${editor.isActive('heading', { level: 2 }) ? 'visible' : 'invisible'}`} size={18}/> Title</p>
                        <p onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className='flex items-center font-bold text-md gap-2 px-1 h-7 hover:bg-[#af8f25] rounded-md'><IoCheckmarkOutline className={`${editor.isActive('heading', { level: 3 }) ? 'visible' : 'invisible'}`} size={18}/> Heading</p>
                        <p onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className='flex items-center font-bold text-sm gap-2 px-1 h-7 hover:bg-[#af8f25] rounded-md'><IoCheckmarkOutline className={`${editor.isActive('heading', { level: 4 }) ? 'visible' : 'invisible'}`} size={18}/> Subheading</p>
                        <p onClick={() => editor.chain().focus().setParagraph().run()} className='flex items-center text-sm gap-2 px-1 h-7 hover:bg-[#af8f25] rounded-md'><IoCheckmarkOutline className={`${editor.isActive('paragraph') ? 'visible' : 'invisible'}`} size={18}/> Body</p>
                        <p className='flex items-center text-sm gap-2 px-1 h-7 hover:bg-[#af8f25] rounded-md'><IoCheckmarkOutline className='invisible' size={18}/> Monostyled</p>
                        <p onClick={() => editor.chain().focus().toggleBulletList().run()} className='flex items-center text-sm gap-2 px-1 h-7 hover:bg-[#af8f25] rounded-md'><IoCheckmarkOutline className={`${editor.isActive('bulletList') ? 'visible' : 'invisible'}`} size={18}/> .Bulleted List</p>
                        <p className='flex items-center text-sm gap-2 px-1 h-7 hover:bg-[#af8f25] rounded-md'><IoCheckmarkOutline className='invisible' size={18}/> - Dashed List</p>
                        <p onClick={() => editor.chain().focus().toggleOrderedList().run()} className='flex items-center text-sm gap-2 px-1 h-7 hover:bg-[#af8f25] rounded-md'><IoCheckmarkOutline className={`${editor.isActive('orderedList') ? 'visible' : 'invisible'}`} size={18}/> 1. Numbered List</p>
                    </div>
                    <p onClick={() => editor.chain().focus().toggleBlockquote().run()} className='flex mt-1 items-center text-sm gap-2 px-1 h-7 hover:bg-[#af8f25] rounded-md'><IoCheckmarkOutline className={`${editor.isActive('blockquote') ? 'visible' : 'invisible'}`} size={18}/> | Block Quote</p>
                </motion.div>
            }
        </div>
        <div className="flex items-center gap-4">
            <IoIosLink size={20} className="text-[#9e9d9c]"/>
            <IoLockClosedOutline className="text-[#9e9d9c]"/>
            <IoShareOutline size={18} className="text-[#9e9d9c]"/>
            <input placeholder="Search" type="text" className="bg-transparent w-44 text-white focus:border-[#938c40] focus:border-4 focus:rounded-lg px-1 border rounded-sm text-sm outline-none border-[#494846]"/>
        </div>
    </div>
  )
}

export default Toolbar
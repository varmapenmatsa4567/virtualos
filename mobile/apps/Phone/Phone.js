import App from '@/mobile/components/App'
import React from 'react'
import NavItem from './NavItem';
import { FaClock, FaStar } from 'react-icons/fa';
import { IoIosKeypad, IoMdContact } from 'react-icons/io';

const Phone = (props) => {
    const [counter, setCounter] = React.useState(0);

    const [activeTab, setActiveTab] = React.useState("Recents");

    const handleClick = () => {
        setCounter(counter + 1);
    }

  return (
    <App {...props}>
        <div className='w-full h-full flex flex-col'>
            <div className='flex-grow'>
                
            </div>
            <div className='flex justify-around w-full'>
                <NavItem setActiveTab={setActiveTab} activeTab={activeTab} text="Favourites" icon={<FaStar size={30}/>}/>
                <NavItem setActiveTab={setActiveTab} activeTab={activeTab} text="Recents" icon={<FaClock size={30}/>}/>
                <NavItem setActiveTab={setActiveTab} activeTab={activeTab} text="Contacts" icon={<IoMdContact size={30}/>}/>
                <NavItem setActiveTab={setActiveTab} activeTab={activeTab} text="Keypad" icon={<IoIosKeypad size={30}/>}/>
                
            </div>
        </div>
    </App>
  )
}

export default Phone
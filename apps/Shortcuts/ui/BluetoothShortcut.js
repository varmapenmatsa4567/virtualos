import React from 'react'
import { RxCross2 } from 'react-icons/rx'

const BluetoothShortcut = ({index, item, shortcutItems, setShortcutItems, removeItem}) => {

    const changeAction = (e) => {
        const newItems = [...shortcutItems];
        newItems[index].props.action = e.target.value;
        setShortcutItems(newItems);
    }

    const changeValue = (e) => {
        const newItems = [...shortcutItems];
        newItems[index].props.value = e.target.value;
        setShortcutItems(newItems);
    }

  return (
    <div draggable className="flex items-center group justify-between text-sm py-2 font-medium bg-[#2f2f30] p-2 w-2/3 rounded-xl border-2 border-[#464646]">
        <div className="flex items-center gap-2">
            <img src={"settings.png"} className="w-6 h-6"/>
            <select value={item.props.action} onChange={changeAction} className="rounded-md bg-[#2f343f] px-1 w-fit appearance-none text-[#007bff] text-center bg-transparent text-xs outline-none">
                <option value="turn">Turn</option>
                <option value="toggle">Toggle</option>
            </select>
            <p>Bluetooth</p>
            {item.props.action == "turn" && <select value={item.props.value} onChange={changeValue} className="rounded-md bg-[#2f343f] px-1 w-fit appearance-none text-[#007bff] text-center bg-transparent text-xs outline-none">
                <option value="on">On</option>
                <option value="off">Off</option>
            </select>}
        </div>
        <RxCross2 onClick={removeItem} className="text-gray-300 hidden group-hover:block"/>
    </div>
  )
}

export default BluetoothShortcut
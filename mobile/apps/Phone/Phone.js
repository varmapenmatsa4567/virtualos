import App from '@/mobile/components/App'
import React from 'react'

const Phone = (props) => {
    const [counter, setCounter] = React.useState(0);

    const handleClick = () => {
        setCounter(counter + 1);
    }

  return (
    <App {...props}>
        <div className='bg-gray-500 text-white'>
            <p>{counter}</p>
            <button onClick={handleClick}>Press</button>
        </div>
    </App>
  )
}

export default Phone
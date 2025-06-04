
import Window from "@/components/Window";
import App from "./App";

const AppStore = ({...props}) => {


  return (
    <Window {...props} 
    isCustomized={true}
    customSize={{width: 750, height: 350}}
    >
      <div className="w-full h-full overflow-auto">
        <div className="grid grid-cols-2 overflow-y-scroll p-5 gap-x-8 gap-y-4">
          <App
            appName="VLC" 
            icon="vlcplayer"
            subtitle="Media Player"
          />
          <App
            appName="2048"
            icon="2048"
            subtitle="Media Player"
          />
          <App
            appName="Tic Tac Toe"
            icon="tictactoe"
            subtitle="Game"
          />
          <App
            appName="Sudoku"
            icon="sudoku"
            subtitle="Game"
          />
        </div>
      </div>
    </Window>
  )
}

export default AppStore;
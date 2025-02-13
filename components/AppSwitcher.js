import AppIcon from "./AppIcon";
import { TooltipProvider } from "./ui/tooltip";

const AppSwitcher = ({ openedApps, selectedAppIndex }) => {
    return (
        <TooltipProvider>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
                <div className="bg-gray-700 bg-opacity-60 flex p-6 rounded-3xl shadow-lg">
                    {openedApps.map((app, index) => (
                        <div
                            key={app}
                            className={`p-2 ${index === selectedAppIndex ? 'bg-gray-900 rounded-2xl' : ''}`}
                        >
                            <AppIcon appName={app} isAppSwitcher={true} />
                        </div>
                    ))}
                </div>
            </div>
        </TooltipProvider>
    );
  };

export default AppSwitcher;
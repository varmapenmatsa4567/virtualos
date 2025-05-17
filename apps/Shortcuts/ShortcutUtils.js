
export const shortActions = [
    { id: 1, title: "Set Wi-Fi", name: "wifi", type: "switch", category: "controls"},
    { id: 2, title: "Set Bluetooth", name: "bluetooth", type: "switch", category: "controls" },
    { id: 3, title: "Set Brightness", name: "brightness", type: "slider", category: "controls"},
    { id: 4, title: "Shut Down", name: "shutdown", type: "options", category: "controls"},
    { id: 5, title: "Lock Screen", name: "lock_screen", type: "action", category: "controls"},
    { id: 6, title: "Take Screenshot", name: "screenshot", type: "action", category: "controls"},
    { id: 7, title: "Open App", name: "open_app", type: "parameter", category: "controls"},
    { id: 8, title: "Close App", name: "close_app", type: "parameter", category: "controls"},
    
    { id: 9, title: "Set Wallpaper", name: "set_wallpaper", type: "parameter", category: "device" },
    { id: 10, title: "Show Notification", name: "show_notification", type: "parameter", category: "device" },
    { id: 11, title: "Open URL", name: "open_url", type: "parameter", category: "web" },
    { id: 12, title: "Search Web", name: "search_web", type: "parameter", category: "web"},

    { id: 13, title: "Start Stopwatch", name: "start_stopwatch", type: "action", category: "clock" },
    { id: 14, title: "Start Timer", name: "start_timer", type: "parameter", category: "clock" },

    { id: 15, title: "Create Note", name: "create_note", type: "parameter", category: "notes"}, 
    { id: 16, title: "Create Folder", name: "create_folder", type: "parameter", category: "notes"},
    { id: 17, title: "Append to Note", name: "append_to_note", type: "parameter", category: "notes"},
    { id: 18, title: "Delete Note", name: "delete_note", type: "parameter", category: "notes"},
    { id: 19, title: "Delete Folder", name: "delete_folder", type: "parameter", category: "notes"},
]

export const getDefaultAction = (action) => {
    switch (action.name) {
        case "wifi":
            return addSwitchShortcut(action);
        case "bluetooth":
            return addSwitchShortcut(action);
        case "shutdown":
            return addShutdownShortcut(action);
        case "open_app":
            return addOpenAppShortcut(action);
        case "close_app":
            return addCloseAppShortcut(action);
        default:
            return action;
    }
}

const addShutdownShortcut = (action) => {
    return { ...action, props: {
        action: "shutdown",
    }}
}

const addOpenAppShortcut = (action) => {
    return {
        ...action, props: {
            action: "notes"
        }
    }
}

const addCloseAppShortcut = (action) => {
    return {
        ...action, props: {
            action: "app",
            value: "notes"
        }
    }
}

const addSwitchShortcut = (action) => {
    return { ...action, props: {
        action: "turn",
        value: "on"
    }}
}
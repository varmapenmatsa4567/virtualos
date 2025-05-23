import { useRef, useState, useEffect } from "react";
import { BsCameraFill } from "react-icons/bs";
import Window from "@/components/Window";
import useGlobalStore from "@/stores/global-store";

const Photobooth = ({ fileStructure, setFileStructure, onClose, db, ...props }) => {
    const {dbChange, setDbChange} = useGlobalStore();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [isFlashVisible, setIsFlashVisible] = useState(false); // State for flash effect

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
                audio: false,
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsCameraOn(true);
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
        }
    };

    const stopCamera = () => {
        if (!videoRef.current || !videoRef.current.srcObject) return;
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        setIsCameraOn(false);
    };

    const takePhoto = async () => {
        if (!isCameraOn) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Apply mirror effect by flipping the canvas horizontally
        context.translate(canvas.width, 0);
        context.scale(-1, 1);

        // Draw the current video frame onto the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas image to a data URL
        const photoDataUrl = canvas.toDataURL("image/png");
        console.log(photoDataUrl);

        // Store the photo in IndexedDB
        if (db) {
            const transaction = db.transaction("photos", "readwrite");
            const store = transaction.objectStore("photos");
            const request = store.add({ imageUrl: photoDataUrl, timestamp: new Date(), isCamera: true });

            request.onsuccess = () => {
                console.log("Photo saved to IndexedDB");
            };

            request.onerror = (event) => {
                console.error("Error saving photo to IndexedDB:", event.target.error);
            };
        }

        // Reset the canvas transformation
        context.setTransform(1, 0, 0, 1, 0, 0);

        // Show flash effect
        setIsFlashVisible(true);
        const audio = new Audio("/audio/Shutter.mp3");
        audio.play();
        setTimeout(() => setIsFlashVisible(false), 200); // Hide flash after 200ms
        setDbChange(dbChange + 1);
    };

    const handleClose = () => {
        stopCamera();
        onClose();
    };

    return (
        <Window isCustomized={true} onClose={handleClose} customSize={{ width: 800, height: 500 }} {...props}>
            <div className="flex-1 relative">
                {/* Video feed with mirror effect */}
                <video
                    ref={videoRef}
                    autoPlay
                    className="w-full h-full object-cover rounded-b-lg transform scale-x-[-1]"
                />
                <canvas ref={canvasRef} style={{ display: "none" }} />

                {/* Flash effect */}
                {isFlashVisible && (
                    <div className="absolute inset-0 bg-white opacity-75" />
                )}

                {/* Countdown overlay */}
                {countdown > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <span className="text-white text-7xl animate-pulse">
                            {countdown}
                        </span>
                    </div>
                )}
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                {isCameraOn ? (
                    <div
                        onClick={takePhoto}
                        className="h-14 w-14 rounded-full cursor-pointer flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                        <div className="bg-[#ff4f43] h-12 w-12 rounded-full flex items-center justify-center">
                            <BsCameraFill className="text-white text-2xl" />
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={startCamera}
                        className="bg-[#ff4f43] text-white py-2 px-4 rounded"
                    >
                        Start Camera
                    </button>
                )}
            </div>
        </Window>
    );
};

export default Photobooth;
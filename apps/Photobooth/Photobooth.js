import Window from "@/components/Window";
import { useRef, useState, useEffect } from "react";
import { BsCameraFill } from "react-icons/bs";

const Photobooth = ({ fileStructure, setFileStructure, onClose,  ...props }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [countdown, setCountdown] = useState(0);

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
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        setIsCameraOn(false);
    };

    const startCountdown = () => {
        setCountdown(3);
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    takePhoto();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const takePhoto = async () => {
        if (!isCameraOn) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // Set canvas dimensions to match video
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the current video frame onto the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas image to a data URL and set it as the photo
        const photoDataUrl = canvas.toDataURL("image/png");
        console.log(photoDataUrl);
    };

    const handleClose = () => {
        stopCamera();
        onClose();
    }

    return (
        <Window onClose={handleClose} {...props}>
            <div className="flex-1 relative">
                {/* Apply mirror effect to the video */}
                <video
                    ref={videoRef}
                    autoPlay
                    className="w-full h-full object-cover rounded-b-lg transform scale-x-[-1]"
                />
                <canvas ref={canvasRef} style={{ display: "none" }} />

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
                        onClick={startCountdown}
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
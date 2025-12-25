import { useEffect, useRef, useState } from 'react';
import { HandLandmark } from '../types';

export const useMediaPipe = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [landmarks, setLandmarks] = useState<HandLandmark[][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const startCamera = async () => {
    if (!videoRef.current) return;

    try {
      console.log('Starting camera...');
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });

      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
      setIsActive(true);
      console.log('Camera started successfully');
    } catch (err) {
      console.error('Camera error:', err);
      setError('Failed to access camera. Please allow camera permissions.');
    }
  };

  const stopCamera = () => {
    console.log('Stopping camera...');
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
    console.log('Camera stopped');
  };

  return {
    videoRef,
    canvasRef,
    landmarks,
    isLoading,
    error,
    isActive,
    startCamera,
    stopCamera
  };
};
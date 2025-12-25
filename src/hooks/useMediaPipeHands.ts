import { useEffect, useRef, useState, useCallback } from 'react';
import { Hands, Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors } from '@mediapipe/drawing_utils';
import { HAND_CONNECTIONS } from '@mediapipe/hands';

export interface HandLandmarks {
  x: number;
  y: number;
  z: number;
}

export interface HandResults {
  multiHandLandmarks: HandLandmarks[][];
  multiHandedness: Array<{ label: string; score: number }>;
}

export const useMediaPipeHands = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hands, setHands] = useState<Hands | null>(null);
  const [camera, setCamera] = useState<Camera | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [handResults, setHandResults] = useState<HandResults | null>(null);

  const onResults = useCallback((results: Results) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (results.image) {
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
    }

    if (results.multiHandLandmarks && results.multiHandedness) {
      const handData: HandResults = {
        multiHandLandmarks: results.multiHandLandmarks.map(landmarks => 
          landmarks.map(landmark => ({
            x: landmark.x,
            y: landmark.y,
            z: landmark.z
          }))
        ),
        multiHandedness: results.multiHandedness.map(hand => ({
          label: hand.label,
          score: hand.score
        }))
      };
      
      setHandResults(handData);

      results.multiHandLandmarks.forEach((landmarks, index) => {
        const handedness = results.multiHandedness?.[index];
        const isRightHand = handedness?.label === 'Right';
        
        const connectionColor = isRightHand ? '#00FF00' : '#FF0000';
        const landmarkColor = isRightHand ? '#00AA00' : '#AA0000';

        drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
          color: connectionColor,
          lineWidth: 2
        });

        landmarks.forEach((landmark, landmarkIndex) => {
          const x = landmark.x * canvas.width;
          const y = landmark.y * canvas.height;
          
          ctx.fillStyle = landmarkColor;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, 2 * Math.PI);
          ctx.fill();
          
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '10px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(landmarkIndex.toString(), x, y - 8);
        });

        if (landmarks.length > 0) {
          const wrist = landmarks[0];
          const x = wrist.x * canvas.width;
          const y = wrist.y * canvas.height;
          
          ctx.fillStyle = connectionColor;
          ctx.font = 'bold 14px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(
            `${handedness?.label} Hand (${Math.round((handedness?.score || 0) * 100)}%)`,
            x,
            y - 30
          );
        }
      });
    } else {
      setHandResults(null);
    }
  }, []);

  useEffect(() => {
    const initializeHands = async () => {
      try {
        setIsLoading(true);
        
        const handsInstance = new Hands({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          }
        });

        handsInstance.setOptions({
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        handsInstance.onResults(onResults);
        setHands(handsInstance);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to initialize MediaPipe Hands:', err);
        setError('Failed to initialize hand tracking');
        setIsLoading(false);
      }
    };

    initializeHands();
  }, [onResults]);

  const startCamera = async () => {
    if (!hands || !videoRef.current || !canvasRef.current) return;

    try {
      console.log('Starting camera with MediaPipe...');
      
      const cameraInstance = new Camera(videoRef.current, {
        onFrame: async () => {
          if (hands && videoRef.current) {
            await hands.send({ image: videoRef.current });
          }
        },
        width: 640,
        height: 480
      });

      canvasRef.current.width = 640;
      canvasRef.current.height = 480;

      await cameraInstance.start();
      setCamera(cameraInstance);
      setIsActive(true);
      console.log('MediaPipe camera started successfully');
    } catch (err) {
      console.error('Camera error:', err);
      setError('Failed to access camera. Please allow camera permissions.');
    }
  };

  const stopCamera = () => {
    console.log('Stopping MediaPipe camera...');
    if (camera) {
      camera.stop();
      setCamera(null);
    }
    setIsActive(false);
    setHandResults(null);
    console.log('MediaPipe camera stopped');
  };

  return {
    videoRef,
    canvasRef,
    handResults,
    isLoading,
    error,
    isActive,
    startCamera,
    stopCamera
  };
};
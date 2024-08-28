import { useState, useEffect, useCallback, useRef } from 'react';
import Timer, { GetTimer } from '../utils/Timer';

export default function useTimer({ hours = '00', minutes = '00', seconds = '00' }: GetTimer) {
  const [timer, setTimer] = useState<GetTimer>({ hours, minutes, seconds });
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const timerRef = useRef<Timer | null>(null);

  const initializeTimer = useCallback(() => {
    if (timerRef.current) {
      timerRef.current.reset();
    }

    timerRef.current = new Timer(+hours, +minutes, +seconds);
    timerRef.current.onUpdate = (updatedTimer: GetTimer) => setTimer(updatedTimer);
    timerRef.current.onEnd = () => {
      setIsRunning(false);
      setIsStarted(false);
    };

    if (isStarted) {
      timerRef.current.start();
    }
  }, [hours, minutes, seconds, isStarted]);

  useEffect(() => {
    initializeTimer();

    return () => {
      if (timerRef.current) {
        timerRef.current.reset();
      }
    };
  }, [initializeTimer]);

  const start = () => {
    if (timerRef.current && !isStarted) {
      timerRef.current.start();
      setIsRunning(true);
      setIsStarted(true);
    }
  };

  const resume = () => {
    if (timerRef.current && !isRunning) {
      timerRef.current.resume();
      setIsRunning(true);
    }
  };

  const pause = () => {
    if (timerRef.current && isRunning) {
      timerRef.current.pause();
      setIsRunning(false);
    }
  };

  const reset = () => {
    if (timerRef.current) {
      timerRef.current.reset();
      setTimer({ hours, minutes, seconds });
      setIsRunning(false);
      setIsStarted(false);
    }
  };

  return {
    timer,
    isRunning,
    isStarted,
    start,
    resume,
    pause,
    reset,
  };
}

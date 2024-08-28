import { useState, useEffect } from 'react';
import Datetime from '../utils/Datetime';

export default function useDatetime() {
    const [date, setCurrentDate] = useState<string>('');
    const [time, setCurrentTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(Datetime.getTime());
            setCurrentDate(Datetime.getDate());
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return { date, time };
}

import { CustomH1 } from "@/components/Typography/CustomH1";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Scheduler = () => {
    const [deviceName, setDeviceName] = useState("");
    const [notificationTime, setNotificationTime] = useState("");
    const navigate = useNavigate();

    const handleDeviceNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDeviceName(event.target.value);
    };

    const handleNotificationTimeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNotificationTime(event.target.value);
    };

    function startTimer(e: any): void {
        e.preventDefault();
        const notificationTimeInSeconds = transformTimeToSeconds(notificationTime);
        const currentTimeInSeconds = getCurrentTimeInSeconds();
        let timeDifferenceInSeconds = notificationTimeInSeconds - currentTimeInSeconds;
        toast.success(`Timer started for ${deviceName}!`);
        navigate(-1);
        setInterval(() => {
            timeDifferenceInSeconds = timeDifferenceInSeconds - 1;
            console.log(timeDifferenceInSeconds);
            if(timeDifferenceInSeconds === 0) {
                alert(`Time to turn off the ${deviceName}!`);
                return () => clearInterval(timeDifferenceInSeconds);
            }
        }, 1000);

    }

    function transformTimeToSeconds(time: string): number {
        const [hours, minutes] = time.split(":");
        const hoursInSeconds = parseInt(hours) * 3600;
        const minutesInSeconds = parseInt(minutes) * 60;
        return hoursInSeconds + minutesInSeconds;
    }

    function getCurrentTimeInSeconds(): number {
        const currentTime = new Date();
        const hoursInSeconds = currentTime.getHours() * 3600;
        const minutesInSeconds = currentTime.getMinutes() * 60;
        const seconds = currentTime.getSeconds();
        return hoursInSeconds + minutesInSeconds + seconds;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/2 md:w-2/5 lg:w-1/3">
                <CustomH1 text="Scheduler" />
                <form className="mt-4">
                    <label className="block">
                        Device Name:
                        <Input
                            type="text"
                            value={deviceName}
                            onChange={handleDeviceNameChange}
                            className="mt-1"
                        />
                    </label>
                    <br />
                    <label className="block">
                        Notification Time:
                        <Input
                            type="time"
                            value={notificationTime}
                            onChange={handleNotificationTimeChange}
                            className="mt-1"
                        />
                    </label>
                    <br />
                    <button
                        type="submit"
                        onClick={startTimer}
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Scheduler;

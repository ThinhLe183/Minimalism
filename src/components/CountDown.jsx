import React from "react";
import { useState, useEffect } from "react";

export default function CountDown() {
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  useEffect(() => {
    let interval = setInterval(() => {
      const dueTo = new Date("November 20, 2022 00:00:00 GMT+0700");

      const now = Date.now();
      const timeRemaining = dueTo - now;
      setDays(Math.floor(timeRemaining / (24 * 60 * 60 * 1000)));
      setHours(Math.floor((timeRemaining / (60 * 60 * 1000)) % 24));
      setMinutes(Math.floor((timeRemaining / (60 * 1000)) % 60));
      setSeconds(Math.floor(timeRemaining / 1000) % 60);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center my-16">
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max ">
        <div className="flex flex-col p-2 bg-neutral rounded-xl text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": days }}></span>
          </span>
          Ngày
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-xl text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": hours }}></span>
          </span>
          Giờ
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-xl text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": minutes }}></span>
          </span>
          Phút
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-xl text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": seconds }}></span>
          </span>
          Giây
        </div>
      </div>
    </div>
  );
}

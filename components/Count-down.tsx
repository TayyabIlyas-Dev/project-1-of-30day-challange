"use client";
import React, { useState, useEffect } from "react";

const Countdown = () => {
  const [isStart, setStart] = useState<boolean>(false);
  const [Hours, setHours] = useState<number>(0);
  const [Mins, setMins] = useState<number>(0);
  const [Secs, setSecs] = useState<number>(0);
  const [TimerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [isBeepOn, setBeepOn] = useState<boolean>(true); // Toggle for beep sound

  const handleStart = () => {
    setStart(true);
  };

  const handleReset = () => {
    setStart(false);
    if (TimerId) {
      clearInterval(TimerId);
      setTimerId(null);
    }
    setHours(0);
    setMins(0);
    setSecs(0);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const id = e.target.id;
    if (id === "hours") {
      setHours(value);
    } else if (id === "mins") {
      setMins(value);
    } else if (id === "secs") {
      setSecs(value);
    }
  };

  const playBeep = () => {
    if (isBeepOn) {
      const audio = new Audio("/sounds/beep.mp3");
      audio.play();
    }
  };

 

  const runTimer = () => {
    setSecs((prevSecs) => {
      if (prevSecs > 0) {
        return prevSecs - 1;
      } else if (prevSecs === 0 && Mins > 0) {
        setMins((prevMins) => prevMins - 1);
        return 59;
      } else if (prevSecs === 0 && Mins === 0 && Hours > 0) {
        setHours((prevHours) => prevHours - 1);
        setMins(59);
        return 59;
      } else {
        // Timer complete - play beep sound
        handleReset();
        playBeep(); // Play sound when timer finishes
        return 0;
      }
    });
  };

  useEffect(() => {
    if (isStart) {
      const tid = setInterval(runTimer, 1000);
      setTimerId(tid);
      return () => clearInterval(tid);
    }
  }, [isStart, Hours, Mins, Secs]);

  return (
    <div className="flex justify-center items-center h-[75vh]">
      {!isStart && (
        <div className="firstJar border-black border-2 rounded-lg p-4 m-1 sm:m-4">
          <div className="input flex justify-center items-center flex-wrap">
            <input
              onChange={handleInput}
              id="hours"
              type="number"
              placeholder="00"
              className="text-4xl w-28 border-none focus:outline-none placeholder-black"
            />
            <input
              onChange={handleInput}
              id="mins"
              type="number"
              placeholder="00"
              className="text-4xl w-28 border-none focus:outline-none placeholder-black"
            />
            <input
              onChange={handleInput}
              id="secs"
              type="number"
              placeholder="00"
              className="text-4xl w-24 border-none focus:outline-none placeholder-black"
            />
            <br />
            <div className="button-shield">
              <button
                onClick={handleStart}
                className="border mt-4 mb-2 bg-black text-white rounded-md p-2 px-4"
              >
                Start
              </button>
            </div>
          </div>
           {/* Toggle button for beep sound */}
      <div className="toggle-beep flex justify-center items-center mt-4">
        <label className="mr-2 text-xl">Beep Sound</label>
        <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            checked={isBeepOn}
            onChange={() => setBeepOn(!isBeepOn)}
            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
          />
          <label
            htmlFor="toggle"
            className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
          ></label>
        </div>
      </div>

      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #000000; /* Green color when active */
        }
      `}</style>
        </div>
      )}

      {isStart && (
        <div className="secondjar border-black border-2 rounded-lg p-8">
          <div className="timer heading flex justify-center items-center pt-4 pb-6">
            <h1 className="text-6xl text-center font-semibold">Timer</h1>
          </div>
          <div className="time-area flex text-6xl gap-1">
            <div className="hours">{Hours.toString().padStart(2, "0")}</div>
            <span>:</span>
            <div className="mins">{Mins.toString().padStart(2, "0")}</div>
            <span>:</span>
            <div className="secs">{Secs.toString().padStart(2, "0")}</div>
          </div>
          <hr />
          <div className="buttons flex gap-3 justify-center items-center mt-2 p-2 pt-3">
            <button
              onClick={handleStart}
              
              className="border-black border-2 bg-black hover:bg-white text-white hover:text-black active:bg-red-500 active:text-white rounded-md p-2 px-3"
            >
              Start
            </button>
            <button
              onClick={handleReset}
              className="border-black border-2 bg-black hover:bg-white text-white hover:text-black active:bg-red-500 active:text-white rounded-md p-2 px-3"
            >
              Reset
            </button>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default Countdown;

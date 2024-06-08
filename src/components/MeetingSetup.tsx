"use client";
import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import React, { FC, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

interface IProps {
  setIsSetupCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

const MeetingSetup: FC<IProps> = ({ setIsSetupCompleted }) => {
  // ---------------------------------------------------------------------------
  // Get the call instance provided by StreamCall component in meeting page
  const call = useCall();
  if (!call) {
    throw new Error("Call not found");
  }
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  // ---------------------------------------------------------------------------
  useEffect(() => {
    // -------------------------------------------------------------------------
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
    // -------------------------------------------------------------------------
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-3 text-white">
      {/* Title------------------------------------------------------------- */}
      <h1 className="text-2xl font-bold">Setup</h1>
      {/* Video Preview----------------------------------------------------- */}
      <VideoPreview />
      {/* ------------------------------------------------------------------ */}
      <div className="flex h-16 items-center justify-center gap-3">
        {/* Disable Mic/Cam Input------------------------------------------- */}
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            className="h-15"
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
          />
          Join without audio and video
        </label>
        {/* Device Settings ------------------------------------------------ */}
        <DeviceSettings />
        {/* ---------------------------------------------------------------- */}
      </div>
      {/* Join Button------------------------------------------------------- */}
      <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          // Join Meeting/call
          call?.join();
          // Let parent page know that setup is done and update its state
          setIsSetupCompleted(true);
        }}
      >
        Join Meeting
      </Button>
      {/* ------------------------------------------------------------------ */}
    </div>
  );
};

export default MeetingSetup;

"use client";

import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { FC, useState } from "react";

interface IProps {
  params: {
    id: string;
  };
}

const Meeting: FC<IProps> = ({ params: { id: meetingId } }) => {
  // ---------------------------------------------------------------------------
  // Currently authenticated user
  const { user, isLoaded } = useUser();
  // ---------------------------------------------------------------------------
  // Is video and audio setup completed?
  const [isSetupCompleted, setIsSetupCompleted] = useState(false);
  // ---------------------------------------------------------------------------
  return (
    <main className="h-screen w-full">
      <StreamCall>
        <StreamTheme>
          {!isSetupCompleted ? <MeetingSetup /> : <MeetingRoom />}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;

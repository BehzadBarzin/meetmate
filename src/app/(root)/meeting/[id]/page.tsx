"use client";

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
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
  const { user, isLoaded: isUserLoaded } = useUser();
  // ---------------------------------------------------------------------------
  // Is video and audio setup completed?
  const [isSetupCompleted, setIsSetupCompleted] = useState(false);
  // ---------------------------------------------------------------------------
  // Get the call by id using our custom hook
  const { call, isCallLoading } = useGetCallById(meetingId);
  // ---------------------------------------------------------------------------
  // If user is not loaded or call is loading, show loader component
  if (!isUserLoaded || isCallLoading) {
    return <Loader />;
  }
  // ---------------------------------------------------------------------------
  return (
    <main className="h-screen w-full">
      {/* StreamCall is a provider that provides the call instance to its children */}
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupCompleted ? (
            <MeetingSetup setIsSetupCompleted={setIsSetupCompleted} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;

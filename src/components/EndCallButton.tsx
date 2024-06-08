"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const EndCallButton = () => {
  // ---------------------------------------------------------------------------
  // Get the call instance
  const call = useCall();
  // ---------------------------------------------------------------------------
  // Get the router
  const router = useRouter();
  // ---------------------------------------------------------------------------
  if (!call) throw new Error("Call not found.");
  // ---------------------------------------------------------------------------
  // Find out if the current user is the meeting owner
  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#participant-state-3
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  // ---------------------------------------------------------------------------
  // If current user is not meeting owner, return null (won't show the button)
  if (!isMeetingOwner) return null;
  // ---------------------------------------------------------------------------
  const endCall = async () => {
    await call.endCall();
    router.push("/");
  };
  // ---------------------------------------------------------------------------
  return (
    <Button onClick={endCall} className="bg-red-500 hover:bg-red-700">
      End call for everyone
    </Button>
  );
};

export default EndCallButton;

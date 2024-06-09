"use client";

import { Call, CallRecording } from "@stream-io/video-react-sdk";

import Loader from "./Loader";
import { useGetCalls } from "@/hooks/useGetCalls";
import MeetingCard from "./MeetingCard";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface IProps {
  type: "ended" | "upcoming" | "recordings";
}

// This is a reusable component that can show the list of (upcoming, ended, recordings) calls
const CallList: FC<IProps> = ({ type }) => {
  // ---------------------------------------------------------------------------
  // To navigate to different pages
  const router = useRouter();
  // ---------------------------------------------------------------------------
  // Use custom hook to get all calls (ended, upcoming, recordings)
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  // ---------------------------------------------------------------------------
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Get the appropriate list of calls based on the prop "type" passed to this component
  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };
  // ---------------------------------------------------------------------------
  // Get the appropriate "no calls" message based on the "type" passed to this component
  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "upcoming":
        return "No Upcoming Calls";
      case "recordings":
        return "No Recordings";
      default:
        return "";
    }
  };
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
      );

      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
    };

    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, callRecordings]);
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // If our custom hook is still loading calls, we show a loader
  if (isLoading) return <Loader />;
  // ---------------------------------------------------------------------------
  // get the appropriate list of calls based on prop "type"
  const calls = getCalls();
  // Get the appropriate "no calls" message based on the "type" passed to this component
  const noCallsMessage = getNoCallsMessage();
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  return (
    // Grid of cards
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {/* Calls------------------------------------------------------------- */}
      {calls && calls.length > 0 ? (
        // Map over the calls and render a card for each call
        // value depends on "type" prop of the component
        calls.map((meeting: Call | CallRecording) => (
          // Meeting Card-------------------------------------------------------
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings.svg"
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              "No Description"
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            link={
              type === "recordings"
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            buttonText={type === "recordings" ? "Play" : "Start"}
            handleClick={
              type === "recordings"
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
          // -------------------------------------------------------------------
        ))
      ) : (
        // Show appropriate "no calls" message if no calls are available
        // value depends on "type" prop of the component
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;

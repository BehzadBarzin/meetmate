"use client";
import React, { useState } from "react";
import HomeCard from "@/components/HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

enum EMeetingType {
  isScheduleMeeting,
  isJoiningMeeting,
  isInstantMeeting,
}

const MeetingTypeList = () => {
  // ---------------------------------------------------------------------------
  // To navigate to different pages
  const router = useRouter();
  // ---------------------------------------------------------------------------
  const [meetingState, setMeetingState] = useState<EMeetingType | undefined>();
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // State to hold new meeting info
  const [meetingInfo, setMeetingInfo] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  // ---------------------------------------------------------------------------
  // State to hold created meeting's details
  const [meetingDetails, setMeetingDetails] = useState<Call | undefined>();
  // ---------------------------------------------------------------------------
  // Get the authenticated user
  const { user } = useUser();
  // ---------------------------------------------------------------------------
  // Get the Stream video client (initiated by the StreamClientProvider)
  const client = useStreamVideoClient();
  // ---------------------------------------------------------------------------
  // Helper function to start a new instant meeting (used in modal)
  const createNewMeeting = async () => {
    // -------------------------------------------------------------------------
    if (!user || !client) return;
    // -------------------------------------------------------------------------
    try {
      // Generate a random ID for the meeting
      const id = crypto.randomUUID();
      // Create a call
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create a new call.");
      // Meeting start time
      const startsAt =
        meetingInfo.dateTime.toISOString() ||
        new Date(Date.now()).toISOString();
      // Meeting description
      const description = meetingInfo.description || "Instant Meeting";
      // Create the meeting
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      // Set the meeting details
      setMeetingDetails(call);

      // If no description, it is an instant meeting
      if (!meetingInfo.description) {
        // Navigate to the meeting page
        router.push(`/meeting/${call.id}`);
      }
    } catch (error) {
      console.error(
        "Something went wrong when starting a new meeting. ",
        error
      );
    }
    // -------------------------------------------------------------------------
  };
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  return (
    // Grid of 4 cards
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {/* Card 1------------------------------------------------------------ */}
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting"
        handleClick={() => setMeetingState(EMeetingType.isInstantMeeting)}
      />
      {/* Card 2------------------------------------------------------------ */}
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Using an invitation link"
        extraClassNames="bg-blue-1"
        handleClick={() => setMeetingState(EMeetingType.isJoiningMeeting)}
      />
      {/* Card 3------------------------------------------------------------ */}
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan your meeting for later"
        extraClassNames="bg-purple-1"
        handleClick={() => setMeetingState(EMeetingType.isScheduleMeeting)}
      />
      {/* Card 4------------------------------------------------------------ */}
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Meeting Recordings"
        extraClassNames="bg-yellow-1"
        handleClick={() => router.push("/recordings")}
      />
      {/* ------------------------------------------------------------------ */}
      {/* Meeting Modal----------------------------------------------------- */}
      <MeetingModal
        isOpen={meetingState === EMeetingType.isInstantMeeting}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        extraClassNames="text-center"
        buttonText="Start Meeting"
        handleButtonClick={createNewMeeting}
      />
      {/* ------------------------------------------------------------------ */}
    </section>
  );
};

export default MeetingTypeList;

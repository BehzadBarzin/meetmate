"use client";
import React, { useState } from "react";
import HomeCard from "@/components/HomeCard";
import { useRouter } from "next/navigation";

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
    </section>
  );
};

export default MeetingTypeList;

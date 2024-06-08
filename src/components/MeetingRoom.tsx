import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LayoutList, Loader, Users } from "lucide-react";
import EndCallButton from "./EndCallButton";

type TLayout = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  // ---------------------------------------------------------------------------
  const router = useRouter();
  // ---------------------------------------------------------------------------
  // Is this the personal room of the current user?
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  // ---------------------------------------------------------------------------
  // Selected Layout state
  const [layout, setLayout] = useState<TLayout>("speaker-left");
  // ---------------------------------------------------------------------------
  // Show participants?
  const [showParticipants, setShowParticipants] = useState(false);
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // If the call is not joined, show loader
  const { useCallCallingState } = useCallStateHooks();

  // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <Loader />;
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  // Functional Component that renders the layout based on the selected type (state)
  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        // case "speaker-left":
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };
  // ---------------------------------------------------------------------------
  // ---------------------------------------------------------------------------
  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        {/* ---------------------------------------------------------------- */}
        {/* Call Layout----------------------------------------------------- */}
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        {/* ---------------------------------------------------------------- */}
        {/* All participants------------------------------------------------ */}
        <div
          className={cn("h-[calc(100vh-86px)] ml-2", {
            // "show-block": showParticipants,
            hidden: !showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
        {/* ---------------------------------------------------------------- */}
        {/* Call Controls--------------------------------------------------- */}
        <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
          {/* Controls------------------------------------------------------ */}
          <CallControls onLeave={() => router.push("/")} />
          {/* Layout Select------------------------------------------------- */}
          <DropdownMenu>
            {/* Dropdown Menu Trigger--------------------------------------- */}
            <div className="flex items-center">
              <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
                <LayoutList size={20} className="text-white" />
              </DropdownMenuTrigger>
            </div>
            {/* Dropdown Menu Content--------------------------------------- */}
            <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
              {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem
                    onClick={() => setLayout(item.toLowerCase() as TLayout)}
                  >
                    {item}
                  </DropdownMenuItem>
                </div>
              ))}
            </DropdownMenuContent>
            {/* ------------------------------------------------------------ */}
          </DropdownMenu>
          {/* Call Stats Button--------------------------------------------- */}
          <CallStatsButton />
          {/* Show/Hide all Participants Button----------------------------- */}
          <button onClick={() => setShowParticipants((prev) => !prev)}>
            <div
              className={cn(
                "cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]",
                {
                  "bg-[#36506d]": showParticipants,
                }
              )}
            >
              <Users size={20} className="text-white" />
            </div>
          </button>
          {/* End Call Button----------------------------------------------- */}
          {/* Only available if this is the personal room */}
          {!isPersonalRoom && <EndCallButton />}
          {/* -------------------------------------------------------------- */}
        </div>
        {/* ---------------------------------------------------------------- */}
        {/* ---------------------------------------------------------------- */}
      </div>
    </section>
  );
};

export default MeetingRoom;

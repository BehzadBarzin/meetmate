"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { useGetCallById } from "@/hooks/useGetCallById";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { FC } from "react";

const PersonalRoom = () => {
  // ---------------------------------------------------------------------------
  // Get router for navigation
  const router = useRouter();
  // ---------------------------------------------------------------------------
  // Get currently authenticated user
  const { user } = useUser();
  // ---------------------------------------------------------------------------
  // Get Stream Client instance (provided by StreamClientProvider)
  const client = useStreamVideoClient();
  // ---------------------------------------------------------------------------
  // To display toast message
  const { toast } = useToast();
  // ---------------------------------------------------------------------------
  // User id is used as meeting id
  const meetingId = user?.id;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }
    // navigate to meeting page
    // (Notice: personal=true is appended to the link because it is needed for MeetingRoom component)
    router.push(`/meeting/${meetingId}?personal=true`);
  };
  // ----------------------------------------------------------------------------
  // Generate meeting link
  // (Notice: personal=true is appended to the link because it is needed for MeetingRoom component)
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;
  // ----------------------------------------------------------------------------
  return (
    <section className="flex flex-col size-full gap-10 text-white">
      <h1 className="text-3xl font-bold">Personal Room</h1>

      {/* Table------------------------------------------------------------- */}
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      {/* ------------------------------------------------------------------ */}
      <div className="flex gap-5">
        {/* Start Meeting Button-------------------------------------------- */}
        <Button className="bg-blue-1" onClick={startRoom}>
          Start Meeting
        </Button>
        {/* Copy Invitation Button------------------------------------------ */}
        <Button
          className="bg-dark-3"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Link Copied",
            });
          }}
        >
          Copy Invitation
        </Button>
        {/* ---------------------------------------------------------------- */}
      </div>
    </section>
  );
};

export default PersonalRoom;

// =============================================================================

interface ITableProps {
  title: string;
  description: string;
  extraTitleClass?: string;
  extraDescriptionClass?: string;
}

const Table: FC<ITableProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  );
};

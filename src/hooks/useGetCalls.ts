import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

export const useGetCalls = () => {
  // ---------------------------------------------------------------------------
  // Get currently authenticated user
  const { user } = useUser();
  // ---------------------------------------------------------------------------
  // Get Stream client
  const client = useStreamVideoClient();
  // ---------------------------------------------------------------------------
  // States in this custom hook
  const [calls, setCalls] = useState<Call[]>();
  const [isLoading, setIsLoading] = useState(false);
  // ---------------------------------------------------------------------------
  // Execute every time the client or user changes
  useEffect(() => {
    // -------------------------------------------------------------------------
    const loadCalls = async () => {
      if (!client || !user?.id) return;

      setIsLoading(true);

      try {
        // Find sorted calls by id from client instance
        // https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }], // Sort by start date
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id }, // Created by current user
              { members: { $in: [user.id] } }, // Current user in in call
            ],
          },
        });
        // ---------------------------------------------------------------------
        // Set state
        setCalls(calls);
        // ---------------------------------------------------------------------
      } catch (error) {
        console.error(error);
      } finally {
        // Set loading state
        setIsLoading(false);
      }
    };
    // -------------------------------------------------------------------------
    loadCalls();
    // -------------------------------------------------------------------------
  }, [client, user?.id]);
  // ---------------------------------------------------------------------------
  // Now
  const now = new Date();

  // Filter ended calls
  const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });

  // Filter upcoming calls
  const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now;
  });
  // ---------------------------------------------------------------------------
  // Return states
  return { endedCalls, upcomingCalls, callRecordings: calls, isLoading };
};

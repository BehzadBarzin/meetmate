import { useEffect, useState } from "react";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

/**
 * A custom hook to retrieve a call/meeting by its id.
 *
 * @param id the id of the meeting/call we want to retrieve
 * @returns an object containing the Call instance and its loading state
 */
export const useGetCallById = (id: string | string[]) => {
  // ---------------------------------------------------------------------------
  // States holding the call and its loading state
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);
  // ---------------------------------------------------------------------------
  // Get the Stream client (provided by the StreamClientProvider)
  const client = useStreamVideoClient();
  // ---------------------------------------------------------------------------
  // Execute every time the client changes
  useEffect(() => {
    // -------------------------------------------------------------------------
    // If no client, do nothing
    if (!client) return;
    // -------------------------------------------------------------------------
    // Function to load the call (async)
    const loadCall = async () => {
      try {
        // Find the call by id from client instance
        // https://getstream.io/video/docs/react/guides/querying-calls/#filters
        const { calls } = await client.queryCalls({
          filter_conditions: { id },
        });
        // If it was found set the state
        if (calls.length > 0) setCall(calls[0]);
        // update the loading state
        setIsCallLoading(false);
      } catch (error) {
        // Log the error
        console.error(error);
        // update the loading state
        setIsCallLoading(false);
      }
    };
    // -------------------------------------------------------------------------
    loadCall();
    // -------------------------------------------------------------------------
  }, [client, id]);
  // ---------------------------------------------------------------------------
  return { call, isCallLoading };
};

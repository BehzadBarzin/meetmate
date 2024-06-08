import React, { FC } from "react";

interface IProps {
  params: {
    id: string;
  };
}

const Meeting: FC<IProps> = ({ params: { id: meetingId } }) => {
  return <div>Meeting: {meetingId}</div>;
};

export default Meeting;

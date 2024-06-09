import React, { FC } from "react";
import { Bolt, SquareX } from "lucide-react";

interface IProps {
  title: string;
}

const EmptyState: FC<IProps> = ({ title }) => {
  return (
    <section className="flex-center size-full flex-col gap-3 border-dashed border-2 border-red-900 rounded-xl p-10">
      {/* Icon-------------------------------------------------------------- */}
      <SquareX className="size-16 text-red-900" />
      {/* Title------------------------------------------------------------- */}
      <div className="flex-center w-full max-w-[254px] flex-col gap-3">
        <h1 className="text-2xl italic text-center font-extralight text-red-900 text-white-1">
          {title}
        </h1>
      </div>
      {/* ------------------------------------------------------------------ */}
    </section>
  );
};

export default EmptyState;

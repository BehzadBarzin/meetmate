import React, { FC } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface IProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  extraClassNames?: string;
  buttonText?: string;
  buttonIcon?: string;
  handleButtonClick?: () => void;
  image?: string;
}

const MeetingModal: FC<IProps> = ({
  title,
  isOpen,
  onClose,
  children,
  extraClassNames,
  buttonText,
  buttonIcon,
  handleButtonClick,
  image,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Dialog Content---------------------------------------------------- */}
      <DialogContent className="flex w-full max-w-[500px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {/* Dialog Image-------------------------------------------------- */}
          {image && (
            // Only if image is provided
            <div className="flex justify-center">
              <Image src={image} alt="checked" width={72} height={72} />
            </div>
          )}
          {/* Title--------------------------------------------------------- */}
          <h1
            className={cn("text-3xl font-bold leading-[42px]", extraClassNames)}
          >
            {title}
          </h1>
          {/* Children------------------------------------------------------ */}
          {children}
          {/* Button-------------------------------------------------------- */}
          <Button
            className={
              "bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            }
            onClick={handleButtonClick}
          >
            {/* Button Icon------------------------------------------------- */}
            {buttonIcon && (
              // Only if buttonIcon is provided
              <Image
                src={buttonIcon}
                alt="modal button icon"
                width={13}
                height={13}
              />
            )}{" "}
            &nbsp; {/* Space */}
            {/* Button Text------------------------------------------------- */}
            {buttonText || "Schedule Meeting"}
            {/* ------------------------------------------------------------ */}
          </Button>
          {/* -------------------------------------------------------------- */}
        </div>
      </DialogContent>
      {/* ------------------------------------------------------------------ */}
    </Dialog>
  );
};

export default MeetingModal;

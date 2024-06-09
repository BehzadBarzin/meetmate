import MeetingTypeList from "@/components/MeetingTypeList";

export default function Home() {
  // ---------------------------------------------------------------------------
  // Get current date and time
  // Todo: Should update time and date every minute:
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  // ---------------------------------------------------------------------------
  return (
    <section className="flex flex-col size-full gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex flex-col justify-between h-full max-md:px-5 max-md:py-8 lg:p-11 p-8">
          {/* Upcoming Meeting---------------------------------------------- */}
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            {/* Upcoming meeting at 11:00 PM */}
            Stay connected
          </h2>
          {/* Current DateTime---------------------------------------------- */}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
          {/* -------------------------------------------------------------- */}
        </div>
      </div>
      {/* Meeting Type List------------------------------------------------- */}
      <MeetingTypeList />
      {/* ------------------------------------------------------------------ */}
    </section>
  );
}

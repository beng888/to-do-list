import useGlobalContext from "context";

export default function Notification() {
  const { notification, style } = useGlobalContext(),
    [styleValue] = style,
    [notificationValue] = notification;

  return (
    <div
      className={`${
        styleValue.showNewTask ? "bottom-0" : "bottom-10"
      } fixed  w-full overflow-hidden pointer-events-none`}
    >
      <div
        className={`${
          notificationValue.active ? "translate-y-0" : "translate-y-full"
        } transform duration-500 font-normal leading-loose tracking-wide text-center text-white bg-gray-800`}
      >
        {notificationValue.text}
      </div>
    </div>
  );
}

import React, { FunctionComponent, useMemo } from "react";

type BadgeProps = {
  text: string;
};

export type BadgeType =
  | "Primary"
  | "Secondary"
  | "Success"
  | "Dark"
  | "Light"
  | "Gray"
  | "Danger"
  | "Warning"
  | "Info";

type Props = BadgeProps & {
  type: BadgeType;
};

const BadgesRecord: Record<Props["type"], FunctionComponent<BadgeProps>> = {
  Primary: ({ text }) => (
    <div className="inline-flex rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90">
      {text}
    </div>
  ),
  Secondary: ({ text }) => (
    <div className="inline-flex rounded bg-[#13C296] py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90">
      {text}
    </div>
  ),
  Success: ({ text }) => (
    <div className="inline-flex rounded bg-[#3CA745] py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90">
      {text}
    </div>
  ),
  Dark: ({ text }) => (
    <div className="inline-flex rounded bg-[#212B36] py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90">
      {text}
    </div>
  ),
  Light: ({ text }) => (
    <div className="inline-flex rounded bg-[#EFEFEF] py-1 px-2 text-sm font-medium text-[#212B36] hover:bg-opacity-90">
      {text}
    </div>
  ),
  Gray: ({ text }) => (
    <div className="inline-flex rounded bg-[#637381] py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90">
      {text}
    </div>
  ),
  Danger: ({ text }) => (
    <div className="inline-flex rounded bg-[#DC3545] py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90">
      {text}
    </div>
  ),
  Warning: ({ text }) => (
    <div className="inline-flex rounded bg-[#F9C107] py-1 px-2 text-sm font-medium text-[#212B36] hover:bg-opacity-90">
      {text}
    </div>
  ),
  Info: ({ text }) => (
    <div className="inline-flex rounded bg-[#3BA2B8] py-1 px-2 text-sm font-medium text-white hover:bg-opacity-90">
      {text}
    </div>
  ),
};

const StatusBadge: FunctionComponent<Props> = ({ type, text }) => {
  const Badge = useMemo(() => BadgesRecord[type] ?? BadgesRecord.Light, [type]);
  return <Badge text={text} />;
};

export default StatusBadge;

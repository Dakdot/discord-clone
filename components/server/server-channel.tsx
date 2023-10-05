"use client";

import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { ActionTooltip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};

export const ServerChannel = ({
  channel,
  server,
  role,
}: ServerChannelProps) => {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const Icon = iconMap[channel.type];
  return (
    <div>
      <button
        onClick={() => {}}
        className={cn(
          "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
          params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
        )}
      >
        <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        <p
          className={cn(
            "line-clamp-1 font-semibold text-xs text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition",
            params?.channelId === channel.id &&
              "text-primary dark:text-zinc-200 dark:group-hover:text-white"
          )}
        >
          {channel.name}
        </p>
        {channel.name !== "general" && role !== MemberRole.GUEST && (
          <div className="ml-auto flex items-center gap-x-1">
            <ActionTooltip label="Edit">
              <div className="hidden group-hover:block hover:bg-zinc-400/50 rounded-[2px] dark:hover:bg-zinc-400/50 p-[4px] text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                <Edit className=" w-3 h-3" />
              </div>
            </ActionTooltip>
            <ActionTooltip label="Delete">
              <div
                onClick={() => onOpen("deleteChannel", { server, channel })}
                className="hidden group-hover:block  hover:bg-zinc-400/50 rounded-[2px] dark:hover:bg-zinc-400/50 p-[4px] text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
              >
                <Trash className="w-3 h-3" />
              </div>
            </ActionTooltip>
          </div>
        )}
        {channel.name === "general" && role !== MemberRole.GUEST && (
          <div className="ml-auto flex items-center gap-x-2">
            <ActionTooltip
              label="This channel is locked for editing"
              side="right"
            >
              <div className="rounded-[2px] hover:bg-zinc-400/50 dark:hover:bg-zinc-400/50 p-[4px] text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                <Lock className="w-3 h-3" />
              </div>
            </ActionTooltip>
          </div>
        )}
      </button>
    </div>
  );
};

"use client";

import { useModal } from "@/hooks/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, ClipboardCopy, Info, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";
import { DotWave } from "@uiball/loaders";
import { cn } from "@/lib/utils";

export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "invite";
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );

      onOpen("invite", { server: response.data });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-6 overflow-hidden">
        <DialogHeader className="pt-8">
          <DialogTitle className="text-2xl font-bold">
            Invite friends
          </DialogTitle>
          <DialogDescription>
            Invite people to your server by sharing the invite code! Or, you can
            use the invite link to share a one-click solution.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server invite code
          </Label>
          <div className="flex items-center mt-2 gap-x-2 mb-3">
            <span
              className={cn(
                "bg-zinc-300/50 border-0 rounded px-2 text-[48px] font-mono focus-visible:ring-0 text-black focus-visible:ring-offset-0",
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              )}
            >
              {server?.inviteCode.substring(0, 3) +
                "-" +
                server?.inviteCode.substring(3, 6)}
            </span>
          </div>

          <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={isLoading}
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button disabled={isLoading} onClick={onCopy} size="icon">
              {copied ? (
                <Check className="text-emerald-600 w-4 h-4" />
              ) : (
                <ClipboardCopy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            disabled={isLoading}
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4 pr-auto"
            onClick={onNew}
          >
            Generate a new code
            {isLoading ? (
              <div className="ml-2">
                <DotWave size={24} />
              </div>
            ) : (
              <RefreshCw className="w-4 h-4 ml-2" />
            )}
          </Button>
          <div className="text-zinc-500 text-sm flex pt-2 items-center">
            <Info className="w-5 h-5" />
            <div className="px-2">
              Generating a new code will cause previously issued codes to stop
              working.
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

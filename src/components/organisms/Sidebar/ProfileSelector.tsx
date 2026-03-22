"use client";

import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { Profile } from "@/services/profiles/getProfilesByUserAndAppCode/types";

interface ProfileSelectorProps {
  currentProfile: Profile;
  onProfileChange: (profile: Profile) => void;
  profiles: Profile[];
}

export function ProfileSelector({
  currentProfile,
  onProfileChange,
  profiles,
}: ProfileSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="">
        <Button
          variant="ghost"
          className="w-full h-16 px-4 justify-between border-0 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="text-left">
              <p className="font-semibold text-sm text-foreground">
                {currentProfile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {currentProfile.description}
              </p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-64 border border-gray-100 dark:border-0 shadow-md dark:shadow-lg bg-card/95 backdrop-blur-xs"
      >
        <div className="p-2">
          <p className="text-xs font-medium text-muted-foreground mb-2 px-2">
            Trocar Perfil
          </p>
          {profiles?.map((profile) => (
            <DropdownMenuItem
              key={profile.id}
              onClick={() => onProfileChange(profile)}
              className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
            >
              <div className="flex-1">
                <p className="font-medium text-sm">{profile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {profile.description}
                </p>
              </div>
              {currentProfile.id === profile.id && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

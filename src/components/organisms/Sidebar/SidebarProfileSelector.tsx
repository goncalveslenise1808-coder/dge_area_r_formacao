'use client';
import { motion } from 'framer-motion';
import { ProfileSelector } from './ProfileSelector';
import { Profile } from '@/services/profiles/getProfilesByUserAndAppCode/types';

export function SidebarProfileSelector({
    currentProfile,
    onProfileChange,
    profiles,
}: {
    currentProfile: Profile;
    profiles: Profile[];
    onProfileChange: (profile: Profile) => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 pt-2 pb-3 border-b border-gray-200 dark:border-white/10"
        >
            <ProfileSelector
                currentProfile={currentProfile}
                onProfileChange={onProfileChange}
                profiles={profiles}
            />
        </motion.div>
    );
}

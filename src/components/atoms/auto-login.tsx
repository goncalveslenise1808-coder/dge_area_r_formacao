"use client";

import { useEffect } from "react";

interface AutoLoginProps {
  callbackPath: string;
}

export const AutoLogin: React.FC<AutoLoginProps> = ({ callbackPath }) => {
  useEffect(() => {
    const siteUrl = process.env.NEXT_PUBLIC_CENTRAL_BASE_URL || "";
    const fullRedirectPath = callbackPath.startsWith("/")
      ? siteUrl + callbackPath
      : siteUrl + "/" + callbackPath;

    const loginUrl = `${
      process.env.NEXT_PUBLIC_CENTRAL_BASE_URL
    }/api/auth/external/login?redirectUrl=${encodeURIComponent(
      fullRedirectPath
    )}`;
    window.location.href = loginUrl;
  }, []);

  return null;
};

export default AutoLogin;

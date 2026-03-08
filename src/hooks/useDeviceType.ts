import { useState, useEffect } from "react";

export type DeviceType = "desktop" | "tablet" | "mobile";

const MOBILE_MAX = 767;
const TABLET_MAX = 1024;

export function useDeviceType(): DeviceType {
  const [device, setDevice] = useState<DeviceType>(() => getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return device;
}

function getDevice(): DeviceType {
  const w = window.innerWidth;
  if (w <= MOBILE_MAX) return "mobile";
  if (w <= TABLET_MAX) return "tablet";
  return "desktop";
}

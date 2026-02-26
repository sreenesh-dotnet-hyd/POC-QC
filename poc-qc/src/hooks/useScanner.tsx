import { useEffect, useRef } from "react";
 
interface ScannerProps {
  enabled: boolean;
  onScan: (value: string) => void;
}
 
export const useScanner = ({ enabled, onScan }: ScannerProps) => {
  const buffer = useRef("");
  const lastKeyTime = useRef<number>(0);
 
  useEffect(() => {
    if (!enabled) return;
 
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
 
      if (now - lastKeyTime.current > 100) {
        buffer.current = "";
      }
 
      lastKeyTime.current = now;
 
      if (e.key === "Enter") {
        if (buffer.current.length > 2) {
          onScan(buffer.current.trim());
        }
        buffer.current = "";
        return;
      }
 
      if (e.key.length === 1) {
        buffer.current += e.key;
      }
    };
 
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onScan]);
};
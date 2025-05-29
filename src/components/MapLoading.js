import { Loader2 } from "lucide-react";

export default function MapLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-white/80 z-50 absolute top-0 left-0">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span>Loading</span>
      </div>
    </div>
  );
}
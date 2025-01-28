import { Button } from "~/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { type TwitterAccount } from "~/server/types";
import { useModalContext } from "./types";

export function HoverButton({ account }: { account: TwitterAccount }) {
  const { setModalState } = useModalContext();
  return (
    <div className="duration-400 flex flex-shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
      <Button
        variant="ghost"
        size="sm"
        className="hover:bg-gray-200"
        onClick={() => setModalState({ type: "edit", account })}
      >
        <Pencil className="h-4 w-4 text-gray-600" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="hover:bg-red-100"
        onClick={() => setModalState({ type: "delete", account })}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}
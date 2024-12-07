import { MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewOrderProps, Status } from "@/types/types";


const statusConfig = {
  NEW: {
    label: "NEW",
    className: "bg-gray-100 text-gray-700",
    dotClassName: "bg-gray-500",
  },
  COOKING: {
    label: "COOKING",
    className: "bg-emerald-100 text-emerald-700",
    dotClassName: "bg-emerald-500",
  },
  READY: {
    label: "READY",
    className: "bg-orange-100 text-orange-700",
    dotClassName: "bg-orange-500",
  },
  COMPLETED: {
    label: "COMPLETED",
    className: "bg-blue-100 text-blue-700",
    dotClassName: "bg-blue-500",
  },
};

const NewOrder = ({
  orderNumber,
  studentName,
  total,
  timeElapsed,
  studentClass,
  status,
  onStatusChange,
  onRemove,
  items = [],
}: NewOrderProps) => {

  
  const currentStatus = statusConfig[status as keyof typeof statusConfig]

  return (
    <div className="rounded-lg p-4 space-y-4 border shadow">
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-start">
          <div className="rounded-full border-2 border-green-400 p-2 text-xs w-10 h-10 flex items-center justify-center">
            {timeElapsed}
          </div>
          <div>
            <div className="font-medium">{studentName}</div>
            <div className="text-sm text-gray-500">{studentClass}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">#{orderNumber}</span>
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <MoreVertical className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onStatusChange(Status.NEW)}>
                New
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(Status.COOKING)}>
                Cooking
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange(Status.READY)}>
                Ready
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onStatusChange(Status.COMPLETED)}
              >
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onRemove} className="text-red-600">
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-2">
        <div
          className={cn(
            "inline-flex items-center px-2 py-1 rounded-full text-sm gap-2",
            currentStatus.className
          )}
        >
          <div
            className={cn("w-2 h-2 rounded-full", currentStatus.dotClassName)}
          />
          {currentStatus.label}
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <div className="flex gap-2">
              <span>{item.quantity}x</span>
              <span>{item.article.title}</span>
            </div>
            <div>${item.article.price}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center font-medium">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default NewOrder;

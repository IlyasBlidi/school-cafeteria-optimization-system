import { MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderStatus, OrderItem } from "@/types/order";

interface NewOrderProps {
  orderNumber: string;
  studentName: string;
  studentClass: string;
  total: number;
  timeElapsed: string;
  status: OrderStatus;
  onStatusChange: (newStatus: OrderStatus) => void;
  onRemove: () => void;
  items?: OrderItem[];
}

const statusConfig = {
  new: {
    label: "New",
    className: "bg-gray-100 text-gray-700",
    dotClassName: "bg-gray-500"
  },
  cooking: {
    label: "Cooking",
    className: "bg-emerald-100 text-emerald-700",
    dotClassName: "bg-emerald-500"
  },
  ready: {
    label: "Ready",
    className: "bg-orange-100 text-orange-700",
    dotClassName: "bg-orange-500"
  },
  completed: {
    label: "Completed",
    className: "bg-blue-100 text-blue-700",
    dotClassName: "bg-blue-500"
  }
};

const NewOrder = ({
  orderNumber,
  studentName,
  studentClass,
  total,
  timeElapsed,
  status,
  onStatusChange,
  onRemove,
  items = []
}: NewOrderProps) => {
  const currentStatus = statusConfig[status];

  return (
    <div className="bg-byed rounded-lg p-4 space-y-4">
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
              <DropdownMenuItem onClick={() => onStatusChange("new")}>
                New
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange("cooking")}>
                Cooking
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange("ready")}>
                Ready
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange("completed")}>
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
        <div className={cn(
          "inline-flex items-center px-2 py-1 rounded-full text-sm gap-2",
          currentStatus.className
        )}>
          <div className={cn("w-2 h-2 rounded-full", currentStatus.dotClassName)} />
          {currentStatus.label}
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <div className="flex gap-2">
              <span>{item.quantity}x</span>
              <span>{item.name}</span>
            </div>
            <div>${item.price.toFixed(2)}</div>
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
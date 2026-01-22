import StatusChangeDDM from "@/components/dropdown-menus/status-change";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const JobsActivePage = () => {
  return (
    <div>
      JobsActivePage
      <div>
        <StatusChangeDDM />
      </div>
    </div>
  );
};

export default JobsActivePage;

// Shadcn-ui components
import { Button } from "@/components/ui/button";
import React from "react";

import { logout } from "@/slices/auth-slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";

function NavMenu() {
  const dispatch = useAppDispatch();

  const handleLogout = (e: React.MouseEvent) => {
    dispatch(logout());
  };

  return (
    <nav className="flex items-center bg-white p-3">
      <ul className="flex-1 flex">
        <li className="w-[35%] max-w-[200px] ms-auto">
          <Button
            onClick={handleLogout}
            className="w-full bg-app-primary hover:bg-app-primary/90"
            type="submit"
          >
            Logout
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export default NavMenu;

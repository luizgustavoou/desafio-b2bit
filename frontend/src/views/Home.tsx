import { FunctionComponent, useEffect, useState } from "react";

interface HomeViewProps {}

// Shadnc-ui components

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/hooks/useAppSelector";
import { authSelector } from "@/slices/auth-slice";
import { IProfileResponse } from "@/apis/auth.api";
import { authService } from "@/services";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const HomeView: FunctionComponent<HomeViewProps> = () => {
  const { user: authUser } = useAppSelector(authSelector);

  const [user, setUser] = useState<IProfileResponse | null>(null);

  const getProfile = async () => {
    const output = await authService.getProfile();

    setUser(output);
  };

  useEffect(() => {
    getProfile();
  }, [authUser]);

  return (
    <div className="p-5 flex-1 flex justify-center items-center bg-[#F1F5F9] ">
      <section className="bg-white p-7 rounded-xl w-[400px] flex flex-col   items-center gap-5">
        <figure className="flex flex-col items-center ">
          <figcaption>Profile picture</figcaption>
          <Avatar className="w-20 h-auto rounded-md">
            <AvatarImage src={user?.avatar.high} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </figure>

        <div className="flex flex-col w-full ">
          <Label className="text-lg" htmlFor="name">
            Your <span className="font-bold">Name</span>
          </Label>
          <Input
            className="bg-input"
            id="name"
            value={user?.name ?? ""}
            readOnly
          />
        </div>
        <div className="flex flex-col w-full ">
          <Label className="text-lg" htmlFor="email">
            Your <span className="font-bold">E-mail</span>
          </Label>
          <Input
            className="bg-input"
            id="email"
            value={user?.email ?? ""}
            readOnly
          />
        </div>
      </section>
    </div>
  );
};

export default HomeView;

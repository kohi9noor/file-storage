import {
  OrganizationSwitcher,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className=" border-b py-4 bg-gray-50">
      <div className=" items-center container mx-auto justify-between flex">
        <p>FlyStorage</p>
        <div className=" flex gap-2">
          <OrganizationSwitcher />
          <UserButton />
          <SignedOut>
            <SignInButton>
              <Button>Sign in</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Header;

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Input, InputProps } from "@nextui-org/react";
import { ReactElement, useState } from "react";

const PasswordInput = (
  props: Omit<InputProps, "type" | "endContent">
): ReactElement => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsPasswordVisible((val) => !val);

  return (
    <Input
      {...props}
      type={isPasswordVisible ? "text" : "password"}
      endContent={
        <button
          className="focus:outline-none self-center rounded-full p-2 hover:bg-primary-200 hover:bg-opacity-30 text-default-400  hover:text-primary-500 transition-[color]"
          type="button"
          onClick={toggleVisibility}
        >
          {isPasswordVisible ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      }
    />
  );
};

export default PasswordInput;

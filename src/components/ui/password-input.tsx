import { Eye, EyeOff } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { forwardRef, type InputHTMLAttributes, useState } from "react";

const PasswordInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const [passInputType, setPassInputType] = useState<"text" | "password">(
    "password"
  );

  function handleChangePassVisibility() {
    if (passInputType === "password") {
      setPassInputType("text");
    } else {
      setPassInputType("password");
    }
  }

  return (
    <div className="relative w-full">
      <Input type={passInputType} className={className} ref={ref} {...props} />
      <Button
        type="button"
        variant="ghost"
        className="absolute inset-y-0 end-0 pe-3 hover:bg-transparent"
        onClick={handleChangePassVisibility}
      >
        {passInputType === "password" ? (
          <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        ) : (
          <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        )}
      </Button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };

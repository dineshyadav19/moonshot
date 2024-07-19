import * as React from "react";
import ShowPassword from "@icons/ShowPassword.svg";
import HidePassword from "@icons/HidePassword.svg";

type PasswordInputProps = {
  password: string;
  setPassword: (text: string) => void;
  hideStrengthMeter: boolean;
  autoComplete: React.HTMLInputAutoCompleteAttribute;
};

export default function PasswordInput({
  password,
  setPassword,
  hideStrengthMeter,
  autoComplete,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
  const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
  const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
  const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets
  const eightCharsOrMore = /.{8,}/g; // eight characters or more

  const passwordTracker = {
    uppercase: password.match(atLeastOneUppercase),
    lowercase: password.match(atLeastOneLowercase),
    number: password.match(atLeastOneNumeric),
    specialChar: password.match(atLeastOneSpecialChar),
    eightCharsOrGreater: password.match(eightCharsOrMore),
  };

  const passwordStrength = Object.values(passwordTracker).filter(
    (value) => value,
  ).length;

  return (
    <div>
      <div className="flex items-center rounded-md border border-brand-neutral-400 p-0.5">
        <input
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          value={password}
          name="password"
          autoComplete={autoComplete}
          className="w-full p-2 outline-none"
        />
        <button
          type="button"
          className="p-1.5"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <HidePassword className="h-6 w-6" />
          ) : (
            <ShowPassword className="h-6 w-6" />
          )}
        </button>
      </div>

      {!hideStrengthMeter ? (
        <div>
          <div className="password-strength-meter mx-0 my-2 h-1 rounded bg-gray-300"></div>
          <div className="text-xs">
            {passwordStrength < 5 && "Must contain "}
            {!passwordTracker.uppercase && "uppercase, "}
            {!passwordTracker.lowercase && "lowercase, "}
            {!passwordTracker.specialChar && "special character, "}
            {!passwordTracker.number && "number, "}
            {!passwordTracker.eightCharsOrGreater && "eight characters or more"}
          </div>
        </div>
      ) : (
        <></>
      )}
      <style jsx>
        {`
          .password-strength-meter::before {
            content: "";
            background-color: ${[
              "red",
              "orange",
              "#03a2cc",
              "#03a2cc",
              "#0ce052",
            ][passwordStrength - 1] ?? ""};
            height: 100%;
            width: ${(passwordStrength / 5) * 100}%;
            display: block;
            border-radius: 3px;
            transition: width 0.2s;
          }
        `}
      </style>
    </div>
  );
}

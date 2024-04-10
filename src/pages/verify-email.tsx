import React, {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";

const VerifyEmail = () => {
  const length = 6;
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>(
    Array.from({ length }, () => null as unknown as HTMLInputElement),
  );

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleOtpSubmit = (otp: string) => {
    // Default submit behavior or you can provide a custom behavior here
    console.log("OTP submitted:", otp);
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNaN(parseInt(value, 10))) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) handleOtpSubmit(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && index > 0) {
      // Prevent default behavior of the backspace key
      e.preventDefault();

      // Clear the current input and move focus to the previous input field
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="rounded-[20px] border border-brand-neutral-400 p-5 md:p-10">
      <div className="text-center">
        <p className="mb-4 text-3.5xl font-semibold">Verify your email</p>
        <h2 className="text-base">
          Enter the 8 digit code you have received on <br />
          <span className="font-medium">swa***@gmail.com</span>
        </h2>
      </div>

      <span className="mb-1 mt-8 block text-base">Code</span>
      <div className="mb-8 flex justify-between gap-4">
        {otp.map((value, index) => {
          return (
            <input
              key={index}
              type="text"
              ref={(input) => {
                if (input) {
                  inputRefs.current[index] = input;
                }
                return void 0;
              }}
              value={value}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-8 w-8 rounded-md border border-brand-neutral-400 md:h-12 md:w-12"
            />
          );
        })}
      </div>
      <input
        type="submit"
        value="Verify"
        className="w-full cursor-pointer rounded-md bg-black p-4 text-base font-medium text-white"
      />
    </div>
  );
};

export default VerifyEmail;

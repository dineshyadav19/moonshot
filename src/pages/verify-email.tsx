import { useRouter } from "next/router";
import React, {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { toast } from "react-toastify";
import Loader from "~/components/Loader";
import { api } from "~/utils/api";
import { generateItems } from "~/utils/generateData";

const loadingToast = toast.loading("Creating categories for you", {
  position: "bottom-right",
});

const VerifyEmail = () => {
  const length = 6;
  const router = useRouter();
  const getUserId = router.query.id;

  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));

  const { mutate, isPending } = api.post.createCategories.useMutation({
    onSuccess: async () => {
      toast.update(loadingToast, {
        render: "Categories created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      await router.replace("/");
    },
  });

  const verifyOtp = api.post.verifyOtp.useMutation({
    onSuccess: async (data) => {
      if (data.success) {
        mutate(generateItems(100, data.userId!));
        toast.success(data.message, {
          position: "bottom-right",
        });
      } else {
        toast.error(data.message, {
          position: "bottom-right",
        });
      }
    },
  });

  const inputRefs = useRef<HTMLInputElement[]>(
    Array.from({ length }, () => null as unknown as HTMLInputElement),
  );

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleOtpSubmit = () => {
    if (otp.join("").length === length) {
      verifyOtp.mutate({
        otp: otp.join(""),
        userId: parseInt(getUserId as string),
      });
    }
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNaN(parseInt(value, 10))) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

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

  if (verifyOtp.isPending || isPending) return <Loader />;

  return (
    <div className="rounded-[20px] border border-brand-neutral-400 p-5 md:p-10">
      <div className="text-center">
        <p className="mb-4 text-3.5xl font-semibold">Verify your email</p>
        <h2 className="text-base">
          Enter the 6 digit code you have received on your email
        </h2>
      </div>

      <span className="mb-1 mt-8 block text-base">Code</span>
      <div className="mb-8 flex justify-between gap-4">
        {otp.map((value, index) => (
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
            className="h-8 w-8 rounded-md border border-brand-neutral-400 text-center md:h-12 md:w-12"
          />
        ))}
      </div>
      <input
        type="submit"
        value="Verify"
        onClick={handleOtpSubmit}
        className="w-full cursor-pointer rounded-md bg-black p-4 text-base font-medium text-white"
      />
    </div>
  );
};

export default VerifyEmail;

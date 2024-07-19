const Spinner: React.FC<{
  color?: string;
  size?: string;
  className?: string;
}> = ({ color, size, className }) => {
  return (
    <svg
      style={{
        color: color ?? "#fff",
        width: size ?? "24px",
        height: size ?? "24px",
      }}
      className={`animate-spin ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        style={{ opacity: 0.25 }}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        style={{ opacity: 0.75 }}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

const Loader = ({ loadingText }: { loadingText?: string }) => {
  return (
    <span className="flex items-center justify-center">
      <span className="opacity-50">{loadingText || "Loading"}</span>{" "}
      <Spinner color="#112f49" className="ml-4" />
    </span>
  );
};

export default Loader;

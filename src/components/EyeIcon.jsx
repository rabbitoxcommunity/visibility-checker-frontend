export default function EyeIcon({ visible, size = 96 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      <path
        d="M5 30 Q50 -10 95 30 Q50 70 5 30Z"
        stroke={visible ? "#00acc1" : "#9e9e9e"}
        strokeWidth="4"
        fill={visible ? "#e0f7fa" : "#f5f5f5"}
        style={{ transition: "all 0.5s" }}
      />
      <circle
        cx="50"
        cy="30"
        r={visible ? "14" : "4"}
        fill={visible ? "#00acc1" : "#bdbdbd"}
        style={{ transition: "all 0.5s" }}
      />
      <circle
        cx="50"
        cy="30"
        r={visible ? "6" : "1"}
        fill={visible ? "#1a237e" : "#757575"}
        style={{ transition: "all 0.5s" }}
      />
    </svg>
  );
}

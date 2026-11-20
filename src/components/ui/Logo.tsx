export function ShotlyLogo({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Shotly"
    >
      <rect width="512" height="512" rx="144" fill="#087CFA" />
      <rect x="150" y="76" width="276" height="330" rx="42" fill="#B9DDFF" />
      <rect x="86" y="126" width="298" height="316" rx="42" fill="#fff" />
      <rect x="184" y="148" width="102" height="12" rx="6" fill="#087CFA" />
      <rect x="122" y="190" width="226" height="126" rx="22" fill="#E8F3FF" />
      <path d="m147 285 55-55 38 34 39-43 43 79H147v-15Z" fill="#66AEFF" />
      <circle cx="193" cy="226" r="13" fill="#087CFA" />
      <rect x="122" y="342" width="154" height="13" rx="6.5" fill="#087CFA" />
      <rect x="122" y="369" width="210" height="10" rx="5" fill="#B8D9FF" />
      <rect x="122" y="391" width="176" height="10" rx="5" fill="#B8D9FF" />
    </svg>
  );
}

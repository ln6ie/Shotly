import Image from "next/image";

export function ShotlyLogo({
  size = 36,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/logo.png"
      alt="Shotly"
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

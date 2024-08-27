import Link from "next/link";

export default function MenuLink({
  link,
  label,
  extra,
}: {
  link: string;
  label: string;
  extra?: boolean;
}) {
  return (
    <Link
      href={link}
      className={`underline hover:decoration-primary decoration-transparent transition-all text-sm ${
        extra && "textBg rounded-full px-3 py-1 hover:decoration-white"
      }`}
    >
      {label}
    </Link>
  );
}

import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"} className="flexCenter text-xl font-black tracking-tight">
      Lazy<span className="text-primary">Reader</span>
    </Link>
  );
}

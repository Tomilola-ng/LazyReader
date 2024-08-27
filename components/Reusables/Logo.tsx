import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"} className="flexCenter">
      <Image
        src={"/logo.svg"}
        alt={"Logo"}
        className="text-black"
        width={100}
        height={100}
      />
    </Link>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-48px)] w-full flex justify-center items-center">
      <div className=" text-center flex flex-col gap-y-2">
        <h2 className="text-xl">404 Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/" className=" hover:text-button-hover transition-colors text-button underline">Return home</Link>
      </div>
    </div>
  )
}
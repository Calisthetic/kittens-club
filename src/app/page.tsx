import { auth } from "../lib/auth";


export default async function Home() {
  const auth1 = await auth()
  console.log(auth1)
  
  return (
    <div className="flex min-h-[calc(100vh-48px)] flex-col items-center justify-between">
    </div>
  );
}

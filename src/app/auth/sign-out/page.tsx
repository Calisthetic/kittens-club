import DefaultButton from "@/components/buttons/default-button"
import { signOut } from "@/lib/auth"

export default function SignOutPage() {
  return (
    <div className="flex h-full sm:w-auto min-h-full flex-col items-center justify-center px-6 py-12 lg:px-8">
      <div className="sm:max-w-sm w-full">
        <h5 className="text-center">Are you sure you want to sign out?</h5>
        <form className=" flex justify-center mt-4"
          action={async () => {
            "use server"
            await signOut({redirect: true, redirectTo: '/'})
          }}
        >
          <DefaultButton type="submit" isButton>Sign Out</DefaultButton>
        </form>
      </div>
    </div>
  )
}
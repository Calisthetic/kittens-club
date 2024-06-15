import { signOut } from "../../lib/auth"

export default function SignOutPage() {
  return (
    <div className="min-h-[calc(100vh-48px)] w-full flex justify-center items-center">
      <h5>Profile?</h5>
      <form
        action={async (formData) => {
          "use server"
          await signOut({redirect: true, redirectTo: '/'})
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  )
}
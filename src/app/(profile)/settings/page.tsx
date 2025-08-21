import { AuthGuard } from "@/providers/auth-guard.provider";
import { EditProfile } from "@/components/organisms/profile-edit";
import { EditPassword } from "@/components/organisms/password-edit";

export default function EditProfilePage() {
  return (
    <main className="w-full max-w-[510px] mx-auto my-10 space-y-5 px-5">
      <AuthGuard>
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-zinc-50 px-2 text-sm text-gray-500">
              نام کاربری و آواتار
            </span>
          </div>
        </div>
        <EditProfile />

        <div className="relative mt-15">
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center"
          >
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-zinc-50 px-2 text-sm text-gray-500">
              رمز عبور
            </span>
          </div>
        </div>
        <EditPassword />
      </AuthGuard>
    </main>
  );
}

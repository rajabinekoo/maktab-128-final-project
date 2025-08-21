import { AuthGuard } from "@/providers/auth-guard.provider";
import { EditProfile } from "@/components/organisms/profile-edit";

export default function EditProfilePage() {
  return (
    <main className="w-full max-w-[510px] mx-auto my-10 space-y-5 px-5">
      <p className="text-xl font-semibold">به روز رسانی پروفایل کاربری</p>
      <AuthGuard>
        <EditProfile />
      </AuthGuard>
    </main>
  );
}

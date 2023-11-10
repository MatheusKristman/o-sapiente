import { MyAccountInfo } from "@/constants/dashboard/my-account-br";
import Button from "@/components/Button";

const ChangePasswordBox = () => {
  return (
    <div className="bg-green-primary w-full p-9 rounded-2xl shadow-md shadow-[rgba(0,0,0,0.25)] flex flex-col gap-y-4">
      <h2 className="text-2xl text-white font-semibold">{MyAccountInfo.changePasswordTitle}</h2>

      <Button primaryMobile fullWidth onClick={() => {}} label={MyAccountInfo.changePasswordBtn} />
    </div>
  );
};

export default ChangePasswordBox;

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-hot-toast";

import { cn } from "@/libs/utils";
import Button from "@/components/Button";
import { MyAccountInfo } from "@/constants/dashboard/my-account-br";
import {
  studentChangePasswordSchema,
  studentChangePasswordSchemaType,
} from "@/constants/schemas/studentChangePasswordSchema";
import { useSession } from "next-auth/react";

const ChangePasswordBox = () => {
  const [isInputsActive, setIsInputsActive] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const session = useSession();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: "",
      newPasswordConfirm: "",
    },
    resolver: yupResolver(studentChangePasswordSchema),
  });

  const newPassword = watch("newPassword");
  const newPasswordConfirm = watch("newPasswordConfirm");

  function toggleInputsVisibility() {
    if (newPassword.length === 0 && newPasswordConfirm.length === 0) {
      setIsInputsActive((prev: boolean) => !prev);
    }
  }

  function onSubmit(data: studentChangePasswordSchemaType) {
    if (session && data) {
      setIsSubmitting(true);

      axios
        .patch("/api/user/change-password", {
          ...data,
          email: session.data?.user?.email,
        })
        .then((res) => {
          if (res.data.passwordUpdated) {
            toast.success("Senha atualizado com sucesso");

            setIsInputsActive(false);
            setValue("newPassword", "");
            setValue("newPasswordConfirm", "");
          }
        })
        .catch((error) => {
          console.error(error);

          toast.error(error.response.data);
        })
        .finally(() => setIsSubmitting(false));
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-green-primary w-full p-9 rounded-2xl shadow-md shadow-[rgba(0,0,0,0.25)] flex flex-col">
      <h2 className="text-2xl text-white font-semibold mb-4">
        {MyAccountInfo.changePasswordTitle}
      </h2>

      <div
        className={cn(
          "w-full flex flex-col transition-[max-height]",
          isInputsActive ? "max-h-52 mb-4" : "max-h-0 overflow-hidden",
        )}>
        <input
          {...register("newPassword")}
          type="password"
          disabled={isSubmitting}
          placeholder={MyAccountInfo.newPasswordPlaceholder}
          className={cn(
            "w-full h-12 rounded-lg px-4 py-2 bg-gray-primary/40 text-white text-base placeholder:text-green-primary outline-none focus:border-white focus:border-2 mb-4 disabled:cursor-not-allowed disabled:bg-gray-primary/20",
            errors.newPassword && "border-[#BD5B5B] border-2 border-solid mb-1",
          )}
        />
        {errors.newPassword && (
          <span className="text-sm text-[#BD5B5B] font-medium text-left mb-4">
            {errors.newPassword?.message}
          </span>
        )}

        <input
          {...register("newPasswordConfirm")}
          type="password"
          disabled={isSubmitting}
          placeholder={MyAccountInfo.newPasswordConfirmPlaceholder}
          className={cn(
            "w-full h-12 rounded-lg px-4 py-2 bg-gray-primary/40 text-white text-base placeholder:text-green-primary outline-none focus:border-white focus:border-2 disabled:cursor-not-allowed disabled:bg-gray-primary/20",
            errors.newPasswordConfirm && "border-[#BD5B5B] border-2 border-solid mb-1",
          )}
        />
        {errors.newPasswordConfirm && (
          <span className="text-sm text-[#BD5B5B] font-medium text-left">
            {errors.newPasswordConfirm?.message}
          </span>
        )}
      </div>

      <Button
        type={newPassword.length > 0 || newPasswordConfirm.length > 0 ? "submit" : "button"}
        primaryMobile
        fullWidth
        disabled={isSubmitting}
        onClick={toggleInputsVisibility}
        label={
          isInputsActive
            ? newPassword.length > 0 || newPasswordConfirm.length > 0
              ? MyAccountInfo.sendPasswordBtn
              : MyAccountInfo.cancelPasswordBtn
            : MyAccountInfo.changePasswordBtn
        }
      />
    </form>
  );
};

export default ChangePasswordBox;

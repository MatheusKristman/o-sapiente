<<<<<<< Updated upstream
=======
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

>>>>>>> Stashed changes
import { cn } from "@/libs/utils";
import Button from "@/components/Button";
import { MyAccountInfo } from "@/constants/dashboard/my-account-br";
import studentUpdateFormSchema, {
  studentUpdateFormSchemaType,
} from "@/constants/schemas/studentUpdateFormSchema";
import { format, parse } from "date-fns";
import { ChangeEvent } from "react";

// TODO mudar input do city e state para select e mudar a posição deles

const StudentFormBox = () => {
  const inputStyle =
    "w-full h-12 bg-[#EBEFF1] px-4 py-2 rounded-lg focus:outline-[#9DA5AA] text-base text-gray-primary";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      birth: "",
      city: "",
      address: "",
      addressNumber: "",
      state: "",
      ddd: "",
      cel: "",
      district: "",
      complement: "",
    },
    resolver: yupResolver(studentUpdateFormSchema),
  });

  function handleBirth(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/[^0-9]/g, "").substring(0, 8);
    const formattedDate = value.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");

    setValue("birth", formattedDate);
    console.log(formattedDate);
  }

  function handleDDD(event: ChangeEvent<HTMLInputElement>) {
    const DDDFormatted = event.target.value.replace(/[^0-9]/g, "").substring(0, 2);

    setValue("ddd", DDDFormatted);
  }

  function handleCel(event: ChangeEvent<HTMLInputElement>) {
    let celValue = event.target.value.replace(/[^0-9]/g, "").substring(0, 9);

    if (celValue.length > 5) {
      celValue = celValue.replace(/(\d{5})(\d{0,4})/, "$1-$2");
    }

    setValue("cel", celValue);
  }

  function onSubmit(data: studentUpdateFormSchemaType) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-full max-w-3xl p-9 rounded-2xl shadow-md shadow-[rgba(0,0,0,0.25)]"
    >
      <h2 className="text-2xl text-gray-primary font-semibold mb-6">
        {MyAccountInfo.personalDataTitle}
      </h2>

      <div className="w-full flex flex-col gap-y-4 mb-9">
        <div className="w-full flex flex-col gap-y-1">
          <input
            {...register("firstName")}
            type="text"
            className={cn(
              inputStyle,
              errors.firstName && "border-[#FF7373] border-2 border-solid focus:outline-[#FF7373]",
            )}
            placeholder={MyAccountInfo.personalDataPlaceholders.firstName}
          />
          {errors.firstName && (
            <span className="text-sm text-[#ff7373] font-medium text-left">
              {errors.firstName?.message}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col gap-y-1">
          <input
            {...register("lastName")}
            type="text"
            className={cn(
              inputStyle,
              errors.lastName && "border-[#FF7373] border-2 border-solid focus:outline-[#FF7373]",
            )}
            placeholder={MyAccountInfo.personalDataPlaceholders.lastName}
          />
          {errors.lastName && (
            <span className="text-sm text-[#ff7373] font-medium text-left">
              {errors.lastName?.message}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col gap-y-1">
          <input
            {...register("birth")}
            type="text"
            className={cn(
              inputStyle,
              errors.birth && "border-[#FF7373] border-2 border-solid focus:outline-[#FF7373]",
            )}
            autoComplete="off"
            autoCorrect="off"
            onChange={handleBirth}
            placeholder={MyAccountInfo.personalDataPlaceholders.birthDate}
          />
          {errors.birth && (
            <span className="text-sm text-[#ff7373] font-medium text-left">
              {errors.birth?.message}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col gap-y-1">
          <input
            {...register("city")}
            type="text"
            className={cn(
              inputStyle,
              errors.city && "border-[#FF7373] border-2 border-solid focus:outline-[#FF7373]",
            )}
            placeholder={MyAccountInfo.personalDataPlaceholders.city}
          />
          {errors.city && (
            <span className="text-sm text-[#ff7373] font-medium text-left">
              {errors.city?.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
          <div className={cn("flex flex-col gap-y-1", "sm:grow lg:grow-0 xl:grow")}>
            <input
              {...register("address")}
              type="text"
              className={cn(
                inputStyle,
                errors.address && "border-[#FF7373] border-2 border-solid focus:outline-[#FF7373]",
              )}
              placeholder={MyAccountInfo.personalDataPlaceholders.address}
            />
            {errors.address && (
              <span className="text-sm text-[#ff7373] font-medium text-left">
                {errors.address?.message}
              </span>
            )}
          </div>

          <div className={cn("flex flex-col gap-y-1", "sm:w-2/5 lg:w-full xl:w-2/5")}>
            <input
              {...register("addressNumber")}
              type="text"
              className={cn(
                inputStyle,
                errors.addressNumber &&
                  "border-[#FF7373] border-2 border-solid focus:outline-[#FF7373]",
              )}
              placeholder={MyAccountInfo.personalDataPlaceholders.addressNumber}
            />
            {errors.addressNumber && (
              <span className="text-sm text-[#ff7373] font-medium text-left">
                {errors.addressNumber?.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
          <div className={cn("flex flex-col gap-y-1", "sm:w-2/5 lg:w-full xl:w-2/5")}>
            <input
              {...register("ddd")}
              type="text"
              onChange={handleDDD}
              className={cn(
                inputStyle,
                errors.ddd && "border-[#FF7373] border-2 border-solid focus:outline-[#FF7373]",
              )}
              placeholder={MyAccountInfo.personalDataPlaceholders.ddd}
            />
            {errors.ddd && (
              <span className="text-sm text-[#ff7373] font-medium text-left">
                {errors.ddd?.message}
              </span>
            )}
          </div>

          <div className={cn("flex flex-col gap-y-1", "sm:grow lg:grow-0 xl:grow")}>
            <input
              {...register("cel")}
              type="text"
              onChange={handleCel}
              className={cn(
                inputStyle,
                errors.cel && "border-[#FF7373] border-2 border-solid focus:outline-[#FF7373]",
              )}
              placeholder={MyAccountInfo.personalDataPlaceholders.cel}
            />
            {errors.cel && (
              <span className="text-sm text-[#ff7373] font-medium text-left">
                {errors.cel?.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-1">
          <input
            {...register("state")}
            type="text"
            className={cn(
              inputStyle,
              errors.state && "border-[#FF7373] border-2 border-solid focus:outline-[#FF7373]",
            )}
            placeholder={MyAccountInfo.personalDataPlaceholders.state}
          />
          {errors.state && (
            <span className="text-sm text-[#ff7373] font-medium text-left">
              {errors.state?.message}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col gap-y-1">
          <input
            {...register("district")}
            type="text"
            className={cn(
              inputStyle,
              errors.district && "border-[#FF7373] border-2 border-solid focus:outline-[#FF7373]",
            )}
            placeholder={MyAccountInfo.personalDataPlaceholders.district}
          />
          {errors.district && (
            <span className="text-sm text-[#ff7373] font-medium text-left">
              {errors.district?.message}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col gap-y-1">
          <input
            {...register("complement")}
            type="text"
            className={cn(
              inputStyle,
              errors.complement && "border-[#FF7373] border-2 border-solid focus:outline-[#FF7373]",
            )}
            placeholder={MyAccountInfo.personalDataPlaceholders.complement}
          />
          {errors.complement && (
            <span className="text-sm text-[#ff7373] font-medium text-left">
              {errors.complement?.message}
            </span>
          )}
        </div>
      </div>

      <Button primary fullWidth type="submit" label={MyAccountInfo.submitButton} />
    </form>
  );
};

export default StudentFormBox;

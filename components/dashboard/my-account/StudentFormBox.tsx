import { cn } from "@/libs/utils";
import Button from "@/components/Button";
import { MyAccountInfo } from "@/constants/dashboard/my-account-br";

const StudentFormBox = () => {
  const inputStyle =
    "w-full h-12 bg-[#EBEFF1] px-4 py-2 rounded-lg focus:outline-[#9DA5AA] text-base text-gray-primary";

  return (
    <form className="bg-white w-full max-w-3xl p-9 rounded-2xl shadow-md shadow-[rgba(0,0,0,0.25)]">
      <h2 className="text-2xl text-gray-primary font-semibold mb-6">
        {MyAccountInfo.personalDataTitle}
      </h2>

      <div className="w-full flex flex-col gap-y-4 mb-9">
        <input
          type="text"
          className={inputStyle}
          placeholder={MyAccountInfo.personalDataPlaceholders.firstName}
        />

        <input
          type="text"
          className={inputStyle}
          placeholder={MyAccountInfo.personalDataPlaceholders.lastName}
        />

        <input
          type="text"
          className={inputStyle}
          placeholder={MyAccountInfo.personalDataPlaceholders.email}
        />

        <input
          type="text"
          className={inputStyle}
          placeholder={MyAccountInfo.personalDataPlaceholders.tel}
        />

        <input
          type="text"
          className={inputStyle}
          placeholder={MyAccountInfo.personalDataPlaceholders.birthDate}
        />

        <input
          type="text"
          className={inputStyle}
          placeholder={MyAccountInfo.personalDataPlaceholders.cep}
        />

        <input
          type="text"
          className={inputStyle}
          placeholder={MyAccountInfo.personalDataPlaceholders.city}
        />

        <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
          <input
            type="text"
            className={cn(inputStyle, "sm:grow lg:grow-0 xl:grow")}
            placeholder={MyAccountInfo.personalDataPlaceholders.address}
          />
          <input
            type="text"
            className={cn(inputStyle, "sm:w-2/5 lg:w-full xl:w-2/5")}
            placeholder={MyAccountInfo.personalDataPlaceholders.addressNumber}
          />
        </div>

        <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
          <input
            type="text"
            className={cn(inputStyle, "sm:w-2/5 lg:w-full xl:w-2/5")}
            placeholder={MyAccountInfo.personalDataPlaceholders.ddd}
          />
          <input
            type="text"
            className={cn(inputStyle, "sm:grow lg:grow-0 xl:grow")}
            placeholder={MyAccountInfo.personalDataPlaceholders.cel}
          />
        </div>

        <input
          type="text"
          className={inputStyle}
          placeholder={MyAccountInfo.personalDataPlaceholders.state}
        />

        <input
          type="text"
          className={inputStyle}
          placeholder={MyAccountInfo.personalDataPlaceholders.district}
        />

        <input
          type="text"
          className={inputStyle}
          placeholder={MyAccountInfo.personalDataPlaceholders.complement}
        />
      </div>

      <Button primary fullWidth onClick={() => {}} label={MyAccountInfo.submitButton} />
    </form>
  );
};

export default StudentFormBox;

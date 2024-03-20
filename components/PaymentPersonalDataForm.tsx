import { info } from "@/constants/paymentPersonalDataForm-br";
import { cn } from "@/libs/utils";

export function PaymentPersonalDataForm() {
  return (
    <div className="w-full px-6 mb-12 sm:px-16 lg:container lg:mx-auto">
      <div className="w-full bg-white px-6 py-9 rounded-2xl shadow-md shadow-black/25 flex flex-col gap-2">
        <h3 className="text-xl text-gray-primary font-semibold">
          {info.title}
        </h3>

        <div className="w-full flex flex-col gap-4 lg:flex-row">
          <div className="w-full flex flex-col gap-4">
            <input
              placeholder={info.birthPlaceholder}
              className={cn("input", {
                "input-error": false,
              })}
            />

            <div className="w-full flex flex-col gap-4 sm:flex-row">
              <input
                placeholder={info.dddPlaceholder}
                className={cn("input sm:w-1/3", {
                  "input-error": false,
                })}
              />

              <input
                placeholder={info.telPlaceholder}
                className={cn("input sm:w-2/3", {
                  "input-error": false,
                })}
              />
            </div>

            <input
              placeholder={info.cepPlaceholder}
              className={cn("input", {
                "input-error": false,
              })}
            />

            <input
              placeholder={info.cityPlaceholder}
              className={cn("input", {
                "input-error": false,
              })}
            />
          </div>

          <div className="w-full flex flex-col gap-4">
            <input
              placeholder={info.statePlaceholder}
              className={cn("input", {
                "input-error": false,
              })}
            />

            <div className="w-full flex flex-col gap-4 sm:flex-row">
              <input
                placeholder={info.addressPlaceholder}
                className={cn("input sm:w-2/3", {
                  "input-error": false,
                })}
              />

              <input
                placeholder={info.addressNumberPlaceholder}
                className={cn("input sm:w-1/3", {
                  "input-error": false,
                })}
              />
            </div>

            <input
              placeholder={info.districtPlaceholder}
              className={cn("input", {
                "input-error": false,
              })}
            />

            <input
              placeholder={info.complementPlaceholder}
              className={cn("input", {
                "input-error": false,
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

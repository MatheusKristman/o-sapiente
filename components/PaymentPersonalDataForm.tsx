import { info } from "@/constants/paymentPersonalDataForm-br";
import { cn } from "@/libs/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { ChangeEvent } from "react";

interface Props {
  control: Control<
    {
      birth: string;
      ddd: string;
      cel: string;
      cep: string;
      city: string;
      state: string;
      address: string;
      addressNumber: string;
      district: string;
      complement: string;
      creditNumber?: string | undefined;
      creditExpiry?: string | undefined;
      creditOwner?: string | undefined;
      creditCvc?: string | undefined;
    },
    any
  >;
  handleBirthFormat: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function PaymentPersonalDataForm({ control, handleBirthFormat }: Props) {
  return (
    <div className="w-full px-6 mb-12 sm:px-16 lg:container lg:mx-auto">
      <div className="w-full bg-white px-6 py-9 rounded-2xl shadow-md shadow-black/25 flex flex-col gap-2">
        <h3 className="text-xl text-gray-primary font-semibold">
          {info.title}
        </h3>

        <div className="w-full flex flex-col gap-4 lg:flex-row">
          <div className="w-full flex flex-col gap-4">
            <FormField
              control={control}
              name="birth"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      maxLength={8}
                      placeholder={info.birthPlaceholder}
                      className={cn("input", {
                        "input-error": false,
                      })}
                      name={field.name}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      value={field.value}
                      onChange={handleBirthFormat}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex flex-col gap-4 sm:flex-row">
              <FormField
                control={control}
                name="ddd"
                render={({ field }) => (
                  <FormItem className="sm:w-1/3">
                    <FormControl>
                      <input
                        placeholder={info.dddPlaceholder}
                        className={cn("input", {
                          "input-error": false,
                        })}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="cel"
                render={({ field }) => (
                  <FormItem className="sm:w-2/3">
                    <FormControl>
                      <input
                        placeholder={info.telPlaceholder}
                        className={cn("input", {
                          "input-error": false,
                        })}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      placeholder={info.cepPlaceholder}
                      className={cn("input", {
                        "input-error": false,
                      })}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      placeholder={info.cityPlaceholder}
                      className={cn("input", {
                        "input-error": false,
                      })}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex flex-col gap-4">
            <FormField
              control={control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      placeholder={info.statePlaceholder}
                      className={cn("input", {
                        "input-error": false,
                      })}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex flex-col gap-4 sm:flex-row">
              <FormField
                control={control}
                name="address"
                render={({ field }) => (
                  <FormItem className="sm:w-2/3">
                    <FormControl>
                      <input
                        placeholder={info.addressPlaceholder}
                        className={cn("input", {
                          "input-error": false,
                        })}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="addressNumber"
                render={({ field }) => (
                  <FormItem className="sm:w-1/3">
                    <FormControl>
                      <input
                        placeholder={info.addressNumberPlaceholder}
                        className={cn("input", {
                          "input-error": false,
                        })}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      placeholder={info.districtPlaceholder}
                      className={cn("input", {
                        "input-error": false,
                      })}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="complement"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      placeholder={info.complementPlaceholder}
                      className={cn("input", {
                        "input-error": false,
                      })}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

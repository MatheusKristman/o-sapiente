import { ChangeEvent } from "react";
import { Control } from "react-hook-form";
import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import PhoneInput from "react-phone-number-input";

import { info } from "@/constants/paymentPersonalDataForm-br";
import { cn } from "@/libs/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

import "react-phone-number-input/style.css";
import { User } from "@prisma/client";

interface Props {
  control: Control<
    {
      name: string;
      email: string;
      cpf: string;
      birth: Date;
      cel: string;
      country: string;
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
  handleCPFFormat: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCepFormat: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currentUser: User;
  isSubmitting: boolean;
}

export function PaymentPersonalDataForm({
  control,
  handleCPFFormat,
  handleCepFormat,
  currentUser,
  isSubmitting,
}: Props) {
  const currentYear = getYear(new Date());

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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <input
                      placeholder={info.namePlaceholder}
                      className={cn("input", {
                        "input-error": false,
                      })}
                      disabled={!!currentUser || isSubmitting}
                      value={
                        !!currentUser
                          ? `${currentUser.firstName} ${currentUser.lastName}`
                          : field.value
                      }
                      name={field.name}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex flex-col gap-4 sm:flex-row">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-2/3">
                    <FormControl>
                      <input
                        placeholder={info.emailPlaceholder}
                        className={cn("input", {
                          "input-error": false,
                        })}
                        disabled={!!currentUser || isSubmitting}
                        value={!!currentUser ? currentUser.email : field.value}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="cpf"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/3">
                    <FormControl>
                      <input
                        maxLength={14}
                        placeholder={info.cpfPlaceholder}
                        className={cn("input", {
                          "input-error": false,
                        })}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value}
                        onChange={handleCPFFormat}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-2 sm:grid-rows-1">
              <FormField
                control={control}
                name="birth"
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={isSubmitting}
                            variant="datePicker"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", {
                                locale: ptBR,
                              })
                            ) : (
                              <span className="text-gray-primary/50">
                                {info.birthPlaceholder}
                              </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          locale={ptBR}
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                          fromYear={1900}
                          toYear={currentYear}
                          classNames={{
                            day_hidden: "invisible",
                            dropdown:
                              "px-2 py-1.5 rounded-md bg-popover text-popover-foreground text-sm  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                            caption_dropdowns: "flex gap-3",
                            vhidden: "hidden",
                            caption_label: "hidden",
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="cel"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PhoneInput
                        disabled={isSubmitting}
                        limitMaxLength
                        placeholder={info.telPlaceholder}
                        className={cn("input", {
                          "input-error": false,
                        })}
                        defaultCountry="BR"
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex flex-col gap-4 sm:flex-row">
              <FormField
                control={control}
                name="country"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/2">
                    <FormControl>
                      <input
                        disabled={isSubmitting}
                        maxLength={2}
                        placeholder={info.countryPlaceholder}
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
                name="cep"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/2">
                    <FormControl>
                      <input
                        maxLength={9}
                        disabled={isSubmitting}
                        placeholder={info.cepPlaceholder}
                        className={cn("input", {
                          "input-error": false,
                        })}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value}
                        onChange={handleCepFormat}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-4 sm:flex-row">
              <FormField
                control={control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/2">
                    <FormControl>
                      <input
                        disabled={isSubmitting}
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

              <FormField
                control={control}
                name="state"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-1/2">
                    <FormControl>
                      <input
                        maxLength={2}
                        disabled={isSubmitting}
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
            </div>

            <div className="w-full flex flex-col gap-4 sm:flex-row">
              <FormField
                control={control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-2/3">
                    <FormControl>
                      <input
                        disabled={isSubmitting}
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
                  <FormItem className="w-full sm:w-1/3">
                    <FormControl>
                      <input
                        disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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

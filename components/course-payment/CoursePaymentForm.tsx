"use client";

import { UseFormReturn } from "react-hook-form";
import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import Cards from "react-credit-cards-2";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-number-input";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clientDataInfo } from "@/constants/course-payment";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, formatPrice } from "@/libs/utils";
import { Calendar } from "@/components/ui/calendar";
import { Toggle } from "../ui/toggle";

import "react-phone-number-input/style.css";
import { Course } from "@prisma/client";

type stateType = {
  creditNumber: string;
  creditExpiry: string;
  creditCvc: string;
  creditOwner: string;
  focus: "name" | "cvc" | "expiry" | "number";
};

interface Props {
  form: UseFormReturn<
    {
      name: string;
      email: string;
      cpf: string;
      birthDate: Date;
      tel: string;
      country: string;
      city: string;
      state: string;
      address: string;
      addressNumber: string;
      cep: string;
      district: string;
      complement: string;
      paymentMethod: "pix" | "credit_card" | "boleto";
      creditNumber: string;
      creditOwner: string;
      creditExpiry: string;
      creditCvc: string;
      installments: string;
    },
    any,
    undefined
  >;
  isSubmitting: boolean;
  course: Course | null;
}

export function CoursePaymentForm({ form, isSubmitting, course }: Props) {
  const [state, setState] = useState<stateType>({
    creditNumber: "",
    creditExpiry: "",
    creditCvc: "",
    creditOwner: "",
    focus: "number",
  });

  const currentYear = getYear(new Date());
  const paymentMethod = form.watch("paymentMethod");
  const creditNumber = form.watch("creditNumber");
  const creditExpiry = form.watch("creditExpiry");
  const creditCvc = form.watch("creditCvc");
  const creditOwner = form.watch("creditOwner");

  function handleCepFormat(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/[^0-9]/g, "").substring(0, 8);
    const formattedNumber = value.replace(/(\d{5})(\d{3})/, "$1-$2");

    form.setValue("cep", formattedNumber);
  }

  function handleCPFFormat(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/[^0-9]/g, "").substring(0, 14);
    const formattedNumber = value.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4",
    );

    form.setValue("cpf", formattedNumber);
  }

  function handleCreditNumberFormat(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/[^0-9]/g, "").substring(0, 16);
    const formattedNumber = value.replace(
      /(\d{4})(\d{4})(\d{4})(\d{4})/,
      "$1 $2 $3 $4",
    );

    form.setValue("creditNumber", formattedNumber);
  }

  function handleCreditExpiryFormat(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/[^0-9]/g, "").substring(0, 4);
    const formattedDate = value.replace(/(\d{2})(\d{2})/, "$1/$2");

    form.setValue("creditExpiry", formattedDate);
  }

  function handleCreditCvcFormat(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.replace(/[^0-9]/g, "").substring(0, 4);

    form.setValue("creditCvc", value);
  }

  function handleInputFocus(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.name;
    let name: stateType["focus"];

    switch (value) {
      case "creditNumber":
        name = "number";
        break;
      case "creditExpiry":
        name = "expiry";
        break;
      case "creditOwner":
        name = "name";
        break;
      case "creditCvc":
        name = "cvc";
        break;
      default:
        toast.error("Erro ao selecionar o campo dos dados do cartão");
    }

    setState((prev: stateType) => ({
      ...prev,
      focus: name,
    }));
  }

  return (
    <div className="w-full flex flex-col gap-9">
      <div className="w-full bg-white rounded-2xl shadow-xl px-6 py-9 flex flex-col gap-2">
        <h4 className="text-xl font-semibold text-gray-primary text-left">
          {clientDataInfo.title}
        </h4>

        <div className="w-full flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Nome completo"
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

          <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-[1fr_170px]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="E-mail"
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
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="CPF"
                      className={cn("input", {
                        "input-error": false,
                      })}
                      maxLength={14}
                      value={field.value}
                      disabled={isSubmitting}
                      onBlur={field.onBlur}
                      onChange={handleCPFFormat}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="birthDate"
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
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", {
                              locale: ptBR,
                            })
                          ) : (
                            <span className="text-gray-primary/50">
                              Data de Nascimento
                            </span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50 flex-shrink-0" />
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
              control={form.control}
              name="tel"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PhoneInput
                      limitMaxLength
                      placeholder="Telefone / Celular"
                      className={cn("input", {
                        "input-error": false,
                      })}
                      defaultCountry="BR"
                      disabled={isSubmitting}
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

          <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-3">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="País"
                      className={cn("input", {
                        "input-error": false,
                      })}
                      maxLength={2}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Cidade"
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
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Estado"
                      className={cn("input", {
                        "input-error": false,
                      })}
                      maxLength={2}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-[1fr_170px]">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Endereço"
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
              control={form.control}
              name="addressNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Número"
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

          <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-[150px_1fr]">
            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="CEP"
                      className={cn("input", {
                        "input-error": false,
                      })}
                      maxLength={9}
                      value={field.value}
                      disabled={isSubmitting}
                      onBlur={field.onBlur}
                      onChange={handleCepFormat}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Bairro"
                      className={cn("input", {
                        "input-error": false,
                      })}
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Complemento"
                    className={cn("input", {
                      "input-error": false,
                    })}
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div
        className={cn("w-full flex flex-col gap-4 sm:grid sm:grid-cols-3", {
          "mb-12 lg:mb-24": paymentMethod !== "credit_card",
        })}
      >
        <Toggle
          disabled={isSubmitting}
          pressed={paymentMethod === "pix"}
          onPressedChange={() => form.setValue("paymentMethod", "pix")}
        >
          {paymentMethod === "pix" ? (
            <Image
              src="/assets/icons/pix-active-icon.svg"
              alt="Pix"
              width={35}
              height={35}
            />
          ) : (
            <Image
              src="/assets/icons/pix-icon.svg"
              alt="Pix"
              width={35}
              height={35}
            />
          )}
          PIX
        </Toggle>

        <Toggle
          disabled={isSubmitting}
          pressed={paymentMethod === "boleto"}
          onPressedChange={() => form.setValue("paymentMethod", "boleto")}
        >
          {paymentMethod === "boleto" ? (
            <Image
              src="/assets/icons/boleto-active-icon.svg"
              alt="Boleto"
              width={35}
              height={35}
            />
          ) : (
            <Image
              src="/assets/icons/boleto-icon.svg"
              alt="Boleto"
              width={35}
              height={35}
            />
          )}
          BOLETO
        </Toggle>

        <Toggle
          disabled={isSubmitting}
          pressed={paymentMethod === "credit_card"}
          onPressedChange={() => form.setValue("paymentMethod", "credit_card")}
        >
          {paymentMethod === "credit_card" ? (
            <Image
              src="/assets/icons/card-active-icon.svg"
              alt="Cartão de Crédito"
              width={35}
              height={35}
            />
          ) : (
            <Image
              src="/assets/icons/card-icon.svg"
              alt="Cartão de Crédito"
              width={35}
              height={35}
            />
          )}
          CARTÃO
        </Toggle>
      </div>

      <div
        className={cn("w-full mb-12 flex flex-col gap-9 lg:mb-24", {
          hidden: paymentMethod !== "credit_card",
        })}
      >
        <Cards
          number={creditNumber}
          expiry={creditExpiry}
          cvc={creditCvc}
          name={creditOwner}
          focused={state.focus}
        />

        <div className="w-full flex flex-col gap-12">
          <div className="w-full bg-white px-6 py-9 rounded-2xl shadow-md shadow-black/25 flex flex-col gap-2 ">
            <h4 className="text-xl font-semibold text-gray-primary text-left">
              Dados do cartão
            </h4>

            <div className="w-full flex flex-col gap-4">
              <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="creditNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          disabled={isSubmitting}
                          maxLength={19}
                          onFocus={handleInputFocus}
                          placeholder="Número do cartão"
                          className={cn("input", {
                            "input-error": false,
                          })}
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={field.value}
                          onChange={handleCreditNumberFormat}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="creditOwner"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          disabled={isSubmitting}
                          onFocus={handleInputFocus}
                          placeholder="Titular do cartão"
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

              <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="creditExpiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          disabled={isSubmitting}
                          maxLength={5}
                          onFocus={handleInputFocus}
                          placeholder="Validade"
                          className={cn("input", {
                            "input-error": false,
                          })}
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={field.value}
                          onChange={handleCreditExpiryFormat}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="creditCvc"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          disabled={isSubmitting}
                          maxLength={4}
                          onFocus={handleInputFocus}
                          placeholder="CVV"
                          className={cn("input", {
                            "input-error": false,
                          })}
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={field.value}
                          onChange={handleCreditCvcFormat}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="installments"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          disabled={isSubmitting}
                          className="input"
                        >
                          <SelectValue placeholder="Selecione as parcelas" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="1">
                          1x -{" "}
                          {course!.courseName === "Constitucional do Zero"
                            ? "R$ 499,99"
                            : "R$ 199,99"}
                        </SelectItem>
                        <SelectItem value="2">
                          2x -{" "}
                          {course!.courseName === "Constitucional do Zero"
                            ? "R$ 249,99"
                            : "R$ 99,99"}
                        </SelectItem>
                        <SelectItem value="3">
                          3x -{" "}
                          {course!.courseName === "Constitucional do Zero"
                            ? "R$ 166,66"
                            : "R$ 66,66"}
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

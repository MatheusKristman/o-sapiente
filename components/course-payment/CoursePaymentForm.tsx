"use client";

import { UseFormReturn } from "react-hook-form";
import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import Cards from "react-credit-cards-2";
import Image from "next/image";
import { useState } from "react";

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
import { cn } from "@/libs/utils";
import { Calendar } from "@/components/ui/calendar";
import { Toggle } from "../ui/toggle";

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
      paymentMethod: "pix" | "credit" | "boleto";
      creditNumber: string;
      creditOwner: string;
      creditExpiry: string;
      creditCvc: string;
      installments: string;
    },
    any,
    undefined
  >;
}

export function CoursePaymentForm({ form }: Props) {
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
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
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
                    <Input
                      placeholder="Telefone/Celular"
                      className={cn("input", {
                        "input-error": false,
                      })}
                      {...field}
                    />
                  </FormControl>
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
                      placeholder="País"
                      className={cn("input", {
                        "input-error": false,
                      })}
                      {...field}
                    />
                  </FormControl>
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
                      placeholder="Cidade"
                      className={cn("input", {
                        "input-error": false,
                      })}
                      {...field}
                    />
                  </FormControl>
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
                      placeholder="Estado"
                      className={cn("input", {
                        "input-error": false,
                      })}
                      {...field}
                    />
                  </FormControl>
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
                      placeholder="Endereço"
                      className={cn("input", {
                        "input-error": false,
                      })}
                      {...field}
                    />
                  </FormControl>
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
                      placeholder="Número"
                      className={cn("input", {
                        "input-error": false,
                      })}
                      {...field}
                    />
                  </FormControl>
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
                      {...field}
                    />
                  </FormControl>
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
                      {...field}
                    />
                  </FormControl>
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
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      <div
        className={cn("w-full flex flex-col gap-4 sm:grid sm:grid-cols-3", {
          "mb-12 lg:mb-24": paymentMethod !== "credit",
        })}
      >
        <Toggle
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
          pressed={paymentMethod === "credit"}
          onPressedChange={() => form.setValue("paymentMethod", "credit")}
        >
          {paymentMethod === "credit" ? (
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
          hidden: paymentMethod !== "credit",
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
                          // disabled={isSubmitting}
                          maxLength={19}
                          // onFocus={handleInputFocus}
                          placeholder="Número do cartão"
                          className={cn("input", {
                            "input-error": false,
                          })}
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={field.value}
                          // onChange={handleCreditNumberFormat}
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
                          // disabled={isSubmitting}
                          // onFocus={handleInputFocus}
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
                          // disabled={isSubmitting}
                          maxLength={5}
                          // onFocus={handleInputFocus}
                          placeholder="Validade"
                          className={cn("input", {
                            "input-error": false,
                          })}
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={field.value}
                          // onChange={handleCreditExpiryFormat}
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
                          // disabled={isSubmitting}
                          maxLength={4}
                          // onFocus={handleInputFocus}
                          placeholder="CVV"
                          className={cn("input", {
                            "input-error": false,
                          })}
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={field.value}
                          // onChange={handleCreditCvcFormat}
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
                        <SelectTrigger className="input">
                          <SelectValue placeholder="Selecione as parcelas" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="1">1x - R$499,99</SelectItem>
                        <SelectItem value="2">2x - R$249,99</SelectItem>
                        <SelectItem value="3">3x - R$166,66</SelectItem>
                      </SelectContent>
                    </Select>
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

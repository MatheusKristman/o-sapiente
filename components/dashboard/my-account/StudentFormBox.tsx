"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { format, getYear } from "date-fns";
import { ChangeEvent } from "react";

import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import { cityOptionsType, stateOptionsType } from "@/types";
import studentUpdateFormSchema from "@/constants/schemas/studentUpdateFormSchema";
import { MyAccountInfo } from "@/constants/dashboard/my-account-br";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const StudentFormBox = () => {
  const [stateOptions, setStateOptions] = useState<stateOptionsType[]>([]);
  const [cityOptions, setCityOptions] = useState<cityOptionsType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>("");

  const session = useSession();

  const currentYear = getYear(new Date());

  const form = useForm<z.infer<typeof studentUpdateFormSchema>>({
    defaultValues: {
      firstName: "",
      lastName: "",
      birth: undefined,
      city: "",
      address: "",
      addressNumber: "",
      state: "",
      ddd: "",
      cel: "",
      district: "",
      complement: "",
    },
    //@ts-ignore
    resolver: zodResolver(studentUpdateFormSchema),
  });

  const state = form.watch("state");

  useEffect(() => {
    if (session) {
      setIsLoading(true);

      axios
        .get("/api/user/get-user")
        .then((res) => {
          form.setValue("firstName", res.data.firstName);
          form.setValue("lastName", res.data.lastName);
          form.setValue("birth", new Date(res.data.birth) ?? undefined);
          form.setValue("state", res.data.state ?? "");
          form.setValue("address", res.data.address ?? "");
          form.setValue("addressNumber", res.data.addressNumber ?? "");
          form.setValue("ddd", res.data.tel.substring(1, 3) ?? "");
          form.setValue("cel", res.data.tel.substring(5) ?? "");
          form.setValue("district", res.data.district ?? "");
          form.setValue("complement", res.data.complement ?? "");

          setSelectedCity(res.data.city);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [form, session]);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
      .then((res) => {
        setStateOptions(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [setIsLoading, setStateOptions]);

  useEffect(() => {
    if (stateOptions.length > 0) {
      setIsLoading(true);

      form.setValue("city", "");

      const ufSelected = stateOptions.filter((option) => option.nome === state);

      if (ufSelected.length > 0) {
        axios
          .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelected[0].id}/municipios`)
          .then((res) => setCityOptions(res.data))
          .catch((error) => console.error(error))
          .finally(() => setIsLoading(false));
      } else {
        setCityOptions([]);
      }
    }
  }, [state, stateOptions, setIsLoading, form]);

  useEffect(() => {
    if (cityOptions.length > 0 && selectedCity) {
      form.setValue("city", selectedCity);
      setSelectedCity("");
    }
  }, [cityOptions, selectedCity, form]);

  function handleDDD(event: ChangeEvent<HTMLInputElement>) {
    const DDDFormatted = event.target.value.replace(/[^0-9]/g, "").substring(0, 2);

    form.setValue("ddd", DDDFormatted);
  }

  function handleCel(event: ChangeEvent<HTMLInputElement>) {
    let celValue = event.target.value.replace(/[^0-9]/g, "").substring(0, 9);

    if (celValue.length > 5) {
      celValue = celValue.replace(/(\d{5})(\d{0,4})/, "$1-$2");
    }

    form.setValue("cel", celValue);
  }

  function onSubmit(data: z.infer<typeof studentUpdateFormSchema>) {
    setIsSubmitting(true);

    axios
      .patch("/api/user/update-account/student", {
        ...data,
        email: session.data?.user?.email,
      })
      .then((res) => {
        toast.success("Cadastro atualizado com sucesso");

        form.setValue("firstName", res.data.firstName);
        form.setValue("lastName", res.data.lastName);
        form.setValue("birth", new Date(res.data.birth) ?? undefined);
        form.setValue("city", res.data.city ?? "");
        form.setValue("state", res.data.state ?? "");
        form.setValue("address", res.data.address ?? "");
        form.setValue("addressNumber", res.data.addressNumber ?? "");
        form.setValue("ddd", res.data.tel.substring(1, 3) ?? "");
        form.setValue("cel", res.data.tel.substring(5) ?? "");
        form.setValue("district", res.data.district ?? "");
        form.setValue("complement", res.data.complement ?? "");
      })
      .catch((error) => {
        console.error(error);

        toast.error(error.response.data);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white w-full max-w-3xl p-9 rounded-2xl shadow-md shadow-[rgba(0,0,0,0.25)]"
      >
        <h2 className="text-2xl text-gray-primary font-semibold mb-6">{MyAccountInfo.personalDataTitle}</h2>

        <div className="w-full flex flex-col gap-y-4 mb-9">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting || isLoading}
                    className={cn("input", form.formState.errors.firstName && "input-error")}
                    placeholder={MyAccountInfo.personalDataPlaceholders.firstName}
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting || isLoading}
                    className={cn("input", form.formState.errors.lastName && "input-error")}
                    placeholder={MyAccountInfo.personalDataPlaceholders.lastName}
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birth"
            render={({ field }) => (
              <FormItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="datePicker"
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? (
                          format(field.value, "PPP", {
                            locale: ptBR,
                          })
                        ) : (
                          <span className="text-gray-primary/50">Data de nascimento</span>
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
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
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

                <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
            <div className={cn("flex flex-col gap-y-1 sm:w-1/2", "sm:grow lg:grow-0 xl:grow")}>
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        disabled={isSubmitting || isLoading}
                        defaultValue={field.value}
                        value={field.value}
                        onValueChange={field.onChange}
                        name={field.name}
                      >
                        <SelectTrigger className="input placeholder:text-white">
                          <SelectValue placeholder={MyAccountInfo.personalDataPlaceholders.state} />
                        </SelectTrigger>

                        <SelectContent>
                          {stateOptions.map((state) => (
                            <SelectItem key={state.id} value={state.nome}>
                              {state.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                  </FormItem>
                )}
              />
            </div>

            <div className={cn("flex flex-col gap-y-1 sm:w-1/2", "sm:grow lg:grow-0 xl:grow")}>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        disabled={isSubmitting || isLoading}
                        defaultValue={field.value}
                        value={field.value}
                        onValueChange={field.onChange}
                        name={field.name}
                      >
                        <SelectTrigger className="input">
                          <SelectValue placeholder={MyAccountInfo.personalDataPlaceholders.city} />
                        </SelectTrigger>

                        <SelectContent>
                          {cityOptions.map((city) => (
                            <SelectItem key={city.id} value={city.nome}>
                              {city.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className={cn("flex flex-col gap-y-1", "sm:grow lg:grow-0 xl:grow")}>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || isLoading}
                      className={cn("input", form.formState.errors.address && "input-error")}
                      placeholder={MyAccountInfo.personalDataPlaceholders.address}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addressNumber"
              render={({ field }) => (
                <FormItem className={cn("flex flex-col gap-y-1", "sm:w-2/5 lg:w-full xl:w-2/5")}>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || isLoading}
                      className={cn("input", form.formState.errors.addressNumber && "input-error")}
                      placeholder={MyAccountInfo.personalDataPlaceholders.addressNumber}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
            <FormField
              control={form.control}
              name="ddd"
              render={({ field }) => (
                <FormItem className={cn("flex flex-col gap-y-1", "sm:w-2/5 lg:w-full xl:w-2/5")}>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || isLoading}
                      onChange={handleDDD}
                      name={field.name}
                      ref={field.ref}
                      value={field.value}
                      onBlur={field.onBlur}
                      className={cn("input", form.formState.errors.ddd && "input-error")}
                      placeholder={MyAccountInfo.personalDataPlaceholders.ddd}
                    />
                  </FormControl>

                  <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cel"
              render={({ field }) => (
                <FormItem className={cn("flex flex-col gap-y-1", "sm:grow lg:grow-0 xl:grow")}>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || isLoading}
                      onChange={handleCel}
                      name={field.name}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      value={field.value}
                      className={cn("input", form.formState.errors.cel && "input-error")}
                      placeholder={MyAccountInfo.personalDataPlaceholders.cel}
                    />
                  </FormControl>

                  <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting || isLoading}
                    className={cn("input", form.formState.errors.district && "input-error")}
                    placeholder={MyAccountInfo.personalDataPlaceholders.district}
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <input
                    disabled={isSubmitting || isLoading}
                    className={cn("input", form.formState.errors.complement && "input-error")}
                    placeholder={MyAccountInfo.personalDataPlaceholders.complement}
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full" type="submit" disabled={isSubmitting || isLoading}>
          {MyAccountInfo.submitButton}
        </Button>
      </form>
    </Form>
  );
};

export default StudentFormBox;

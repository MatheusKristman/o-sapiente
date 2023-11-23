import { Loader2, Plus, X } from "lucide-react";
import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

import { cn } from "@/libs/utils";
import Button from "@/components/Button";
import { MyAccountInfo } from "@/constants/dashboard/my-account-br";
import {
  professorUpdateFormSchema,
  professorUpdateFormSchemaType,
} from "@/constants/schemas/professorUpdateFormSchema";
import { cityOptionsType, stateOptionsType } from "@/types";
import { Subject } from "@prisma/client";

const ProfessorFormBox = () => {
  const [stateOptions, setStateOptions] = useState<stateOptionsType[]>([]);
  const [cityOptions, setCityOptions] = useState<cityOptionsType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [availableThemes, setAvailableThemes] = useState<string[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [themes, setThemes] = useState<string[]>([]);

  const session = useSession();

  const inputStyle =
    "w-full h-12 bg-[#EBEFF1] px-4 py-2 rounded-lg focus:outline-[#9DA5AA] text-base text-gray-primary";

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      birth: "",
      city: MyAccountInfo.personalDataPlaceholders.city,
      address: "",
      addressNumber: "",
      state: MyAccountInfo.personalDataPlaceholders.state,
      ddd: "",
      cel: "",
      district: "",
      complement: "",
      aboutMe: "",
    },
    resolver: yupResolver(professorUpdateFormSchema),
  });

  const state = watch("state");

  useEffect(() => {
    if (session) {
      setIsLoading(true);

      axios
        .get("/api/user/get-user")
        .then((res) => {
          setValue("firstName", res.data.firstName);
          setValue("lastName", res.data.lastName);
          setValue("birth", res.data.birth);
          setValue("state", res.data.state ?? MyAccountInfo.personalDataPlaceholders.state);
          setValue("address", res.data.address);
          setValue("addressNumber", res.data.addressNumber);
          setValue("ddd", res.data.tel.substring(1, 3));
          setValue("cel", res.data.tel.substring(5));
          setValue("district", res.data.district);
          setValue("complement", res.data.complement);
          setValue("aboutMe", res.data.resume);
          setThemes(res.data.themes);

          setSelectedCity(res.data.city);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [session, setValue]);

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

      console.log(state);

      const ufSelected = stateOptions.filter((option) => option.nome === state);

      if (ufSelected.length > 0) {
        axios
          .get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelected[0].id}/municipios`,
          )
          .then((res) => setCityOptions(res.data))
          .catch((error) => console.error(error))
          .finally(() => setIsLoading(false));
      } else {
        setCityOptions([]);
      }
    }
  }, [state, stateOptions, setIsLoading]);

  useEffect(() => {
    if (cityOptions.length > 0 && selectedCity) {
      setValue("city", selectedCity);
      setSelectedCity("");
    }
  }, [cityOptions, selectedCity]);

  useEffect(() => {
    function getAllSubjectsOptions() {
      setIsLoading(true);

      axios
        .get("/api/subject?lang=br")
        .then((res) => {
          let allThemes: string[] = [];
          const data = res.data;

          data.map((sub: Subject) => {
            allThemes.push(...sub.subs);
          });

          setAvailableThemes(allThemes);
          setAvailableSubjects(data);
          console.log(res.data);
        })
        .catch((error) => {
          console.error(error.response);

          toast.error("Ocorreu um erro, tente novamente mais tarde");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    getAllSubjectsOptions();
  }, [setAvailableThemes, setAvailableSubjects, setIsLoading]);

  useEffect(() => {
    if (searchValue.length > 3) {
      let filteredSubjects = availableSubjects.filter(
        (option) =>
          !themes.some((opt) =>
            opt
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(
                searchValue
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, ""),
              ),
          ) &&
          option.main
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              searchValue
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, ""),
            ),
      );

      if (filteredSubjects.length > 0) {
        const filteredOpt = filteredSubjects[0].subs.filter((sub) => !themes.includes(sub));

        setFilteredOptions(filteredOpt);

        return;
      }

      const filteredOpt = availableThemes.filter(
        (option) =>
          !themes.includes(option) &&
          option
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              searchValue
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, ""),
            ),
      );

      setFilteredOptions(filteredOpt);
    }
  }, [searchValue, availableThemes, themes, availableSubjects]);

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

  function handleOptionSelect(option: string) {
    let allOptions = [...themes];

    if (allOptions.includes(option)) {
      allOptions = allOptions.filter((opt) => opt !== option);

      setThemes(allOptions);
      setSearchValue("");
      return;
    }

    allOptions.push(option);

    setThemes(allOptions);
    setSearchValue("");
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setSearchValue(value);
  }

  function onSubmit(data: professorUpdateFormSchemaType) {
    if (themes.length === 0) {
      toast.error(MyAccountInfo.themeErrorMessage);

      return;
    }

    setIsSubmitting(true);

    axios
      .patch("/api/user/update-account/professor", {
        ...data,
        themes,
        email: session.data?.user?.email,
      })
      .then((res) => {
        toast.success("Cadastro atualizado com sucesso");

        setValue("firstName", res.data.firstName);
        setValue("lastName", res.data.lastName);
        setValue("birth", res.data.birth);
        setValue("city", res.data.city ?? MyAccountInfo.personalDataPlaceholders.city);
        setValue("state", res.data.state ?? MyAccountInfo.personalDataPlaceholders.state);
        setValue("address", res.data.address);
        setValue("addressNumber", res.data.addressNumber);
        setValue("ddd", res.data.tel.substring(1, 3));
        setValue("cel", res.data.tel.substring(5));
        setValue("district", res.data.district);
        setValue("complement", res.data.complement);
        setValue("aboutMe", res.data.resume);
        setThemes(res.data.themes);
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
            disabled={isSubmitting || isLoading}
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
            disabled={isSubmitting || isLoading}
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
            disabled={isSubmitting || isLoading}
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

        <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
          <div className={cn("flex flex-col gap-y-1 w-1/2", "sm:grow lg:grow-0 xl:grow")}>
            <div
              className={cn(
                "relative flex items-center after:w-6 after:h-6 after:bg-lightGrayArrowDown after:bg-no-repeat after:bg-contain after:absolute after:right-3 after:top-1/2 after:-translate-y-1/2 focus-within:after:rotate-180 after:transform-gpu",
              )}
            >
              <select
                {...register("state")}
                disabled={isSubmitting || isLoading}
                defaultValue={MyAccountInfo.personalDataPlaceholders.state}
                className={cn(
                  "w-full h-12 bg-[#EBEFF1] rounded-lg px-4 py-2 text-gray-primary appearance-none focus:outline-[#9DA5AA] lg:cursor-pointer disabled:brightness-90 disabled:cursor-not-allowed",
                )}
              >
                <option value={MyAccountInfo.personalDataPlaceholders.state} disabled hidden>
                  {MyAccountInfo.personalDataPlaceholders.state}
                </option>
                {stateOptions.map((state) => (
                  <option key={state.id} value={state.nome}>
                    {state.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={cn("flex flex-col gap-y-1 w-1/2", "sm:grow lg:grow-0 xl:grow")}>
            <div
              className={cn(
                "relative flex items-center after:w-6 after:h-6 after:bg-lightGrayArrowDown after:bg-no-repeat after:bg-contain after:absolute after:right-3 after:top-1/2 after:-translate-y-1/2 focus-within:after:rotate-180 after:transform-gpu",
              )}
            >
              <select
                {...register("city")}
                disabled={isSubmitting || isLoading}
                defaultValue={MyAccountInfo.personalDataPlaceholders.city}
                className={cn(
                  "w-full h-12 bg-[#EBEFF1] rounded-lg px-4 py-2 text-gray-primary appearance-none focus:outline-[#9DA5AA] lg:cursor-pointer disabled:brightness-90 disabled:cursor-not-allowed",
                )}
              >
                <option value={MyAccountInfo.personalDataPlaceholders.city} disabled hidden>
                  {MyAccountInfo.personalDataPlaceholders.city}
                </option>
                {cityOptions.map((city) => (
                  <option key={city.id} value={city.nome}>
                    {city.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
          <div className={cn("flex flex-col gap-y-1", "sm:grow lg:grow-0 xl:grow")}>
            <input
              {...register("address")}
              type="text"
              disabled={isSubmitting || isLoading}
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
              disabled={isSubmitting || isLoading}
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
              disabled={isSubmitting || isLoading}
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
              disabled={isSubmitting || isLoading}
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
            {...register("district")}
            type="text"
            disabled={isSubmitting || isLoading}
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
            disabled={isSubmitting || isLoading}
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

      <h2 className="text-2xl text-gray-primary font-semibold mb-6">{MyAccountInfo.themeTitle}</h2>

      <input
        type="text"
        disabled={isLoading}
        onChange={handleSearch}
        value={searchValue}
        className={cn(inputStyle, "mb-9")}
        placeholder={MyAccountInfo.inputPlaceholder}
      />

      <div className="w-full flex flex-col gap-y-1 mb-9">
        <h3 className="text-lg font-medium text-gray-primary">
          {MyAccountInfo.themeSelectedTitle}
        </h3>

        <ul className="w-full flex flex-col gap-y-4">
          {themes?.map((option, index) => (
            <li
              key={`${option}-${index}`}
              onClick={() => handleOptionSelect(option)}
              className="w-full h-12 px-4 py-3 rounded-lg bg-green-primary text-base font-medium text-white flex items-center justify-between group lg:cursor-pointer"
            >
              {option}
              <X className="h-7 w-7 block lg:opacity-0 lg:group-hover:opacity-100 transition-opacity" />
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full flex flex-col gap-y-1 mb-9">
        <h3 className="text-lg font-medium text-gray-primary">
          {MyAccountInfo.themesAvailableTitle}
        </h3>

        {isLoading ? (
          <div className="w-full flex items-center justify-center">
            <Loader2 className="h-10 w-10 text-green-primary animate-spin" />
          </div>
        ) : (
          <ul className="w-full flex flex-col gap-y-4 overflow-y-auto max-h-80 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-[#C8D6DF] scrollbar-track-transparent scrollbar-gutter-stable">
            {searchValue.length > 3 && filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={`${option}-${index}`}
                  onClick={() => handleOptionSelect(option)}
                  className="w-full h-12 px-4 py-3 rounded-lg bg-[#EBEFF1] text-base font-medium text-gray-primary flex items-center justify-between group lg:cursor-pointer"
                >
                  {option}
                  <Plus className="h-7 w-7 block text-green-primary lg:opacity-0 lg:group-hover:opacity-100 transition-opacity" />
                </li>
              ))
            ) : searchValue.length > 3 && filteredOptions.length == 0 ? (
              <div className="w-full h-12 px-4 py-3 rounded-lg bg-[#E5ECF0] flex items-center justify-center">
                <span className="text-base text-center text-[#96A3AB]">
                  Resultado não encontrado
                </span>
              </div>
            ) : (
              availableThemes
                .filter((option) => !themes?.includes(option))
                .map((option, index) => (
                  <li
                    key={`${option}-${index}`}
                    onClick={() => handleOptionSelect(option)}
                    className="w-full h-12 px-4 py-3 rounded-lg bg-[#EBEFF1] text-base font-medium text-gray-primary flex items-center justify-between group lg:cursor-pointer"
                  >
                    {option}
                    <Plus className="h-7 w-7 block text-green-primary lg:opacity-0 lg:group-hover:opacity-100 transition-opacity" />
                  </li>
                ))
            )}
          </ul>
        )}
      </div>

      <h2 className="text-2xl text-gray-primary font-semibold mb-6">{MyAccountInfo.aboutTitle}</h2>

      <textarea
        {...register("aboutMe")}
        disabled={isSubmitting || isLoading}
        className={cn(
          "w-full h-64 bg-[#EBEFF1] px-4 py-2 rounded-lg resize-none text-base text-gray-primary focus:outline-[#9DA5AA] mb-9",
          errors.aboutMe && "border-[#FF7373] border-2 border-solid focus:outline-[#FF7373] mb-0",
        )}
        placeholder={MyAccountInfo.aboutPlaceholder}
      />
      {errors.aboutMe && (
        <span className="block text-sm text-[#ff7373] font-medium text-left mb-9">
          {errors.aboutMe?.message}
        </span>
      )}

      <Button
        primary
        fullWidth
        type="submit"
        disabled={isSubmitting || isLoading}
        label={MyAccountInfo.submitButton}
      />
    </form>
  );
};

export default ProfessorFormBox;

"use client";

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Subject } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { ThemeStepInfos } from "@/constants/register/theme-step-br";
import { Input } from "@/components/ui/input";

interface ThemeStepProps {
  selectedOptions: string[];
  setSelectedOptions: Dispatch<SetStateAction<string[]>>;
  setSteps: Dispatch<SetStateAction<number>>;
}

const ThemeStep = ({ selectedOptions, setSelectedOptions, setSteps }: ThemeStepProps) => {
  const [themes, setThemes] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNextAvailable, setIsNextAvailable] = useState<boolean>(false);

  const router = useRouter();

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

          setThemes(allThemes);
          setSubjects(data);
        })
        .catch((error) => {
          console.error(error.response);

          toast.error("Ocorreu um erro, tente novamente mais tarde");

          router.push("/");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    getAllSubjectsOptions();
  }, [setThemes, router]);

  useEffect(() => {
    if (searchValue.length > 3) {
      let filteredSubjects = subjects.filter(
        (option) =>
          !selectedOptions.some((opt) =>
            opt
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(
                searchValue
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
              )
          ) &&
          option.main
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              searchValue
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            )
      );

      if (filteredSubjects.length > 0) {
        const filteredOpt = filteredSubjects[0].subs.filter((sub) => !selectedOptions.includes(sub));

        setFilteredOptions(filteredOpt);

        return;
      }

      const filteredOpt = themes.filter(
        (option) =>
          !selectedOptions.includes(option) &&
          option
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(
              searchValue
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            )
      );

      setFilteredOptions(filteredOpt);
    }
  }, [searchValue, themes, selectedOptions, subjects]);

  useEffect(() => {
    if (selectedOptions.length > 0) {
      setIsNextAvailable(true);
    } else {
      setIsNextAvailable(false);
    }
  }, [selectedOptions, setIsNextAvailable]);

  function handleOptionSelect(option: string) {
    let allOptions = [...selectedOptions];

    if (allOptions.includes(option)) {
      allOptions = allOptions.filter((opt) => opt !== option);

      setSelectedOptions(allOptions);
      setSearchValue("");
      return;
    }

    allOptions.push(option);

    setSelectedOptions(allOptions);
    setSearchValue("");
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setSearchValue(value);
  }

  function handleNextBtn() {
    if (isNextAvailable && selectedOptions.length > 0) {
      setSteps(2);
    }
  }

  return (
    <div className="w-full h-full py-12 lg:py-24">
      <div className="w-full mx-auto px-6 flex flex-col justify-center items-center gap-9 md:px-16 lg:flex-row lg:justify-between lg:items-start lg:gap-24 lg:container">
        <div className="w-full px-6 py-9 rounded-2xl bg-green-primary h-fit lg:w-2/5">
          <p className="w-full text-white text-lg">{ThemeStepInfos.boxMessage}</p>
        </div>

        <div className="w-full md:max-w-[550px] lg:w-3/5">
          <h2 className="text-2xl text-gray-primary font-semibold mb-6 md:text-3xl text-center">
            <span className="text-green-primary">{ThemeStepInfos.firstTitleColored}</span> {ThemeStepInfos.title}{" "}
            <span className="text-green-primary">{ThemeStepInfos.secondTitleColored}</span>
          </h2>

          <Input
            type="text"
            disabled={isLoading}
            onChange={handleSearch}
            value={searchValue}
            className="input-light mb-9"
            placeholder={ThemeStepInfos.inputPlaceholder}
          />

          <div className="w-full flex flex-col gap-y-1 mb-9">
            <h3 className="text-lg font-medium text-gray-primary">{ThemeStepInfos.selectedText}</h3>

            <ul className="w-full flex flex-col gap-y-4">
              {selectedOptions.map((option, index) => (
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
            <h3 className="text-lg font-medium text-gray-primary">{ThemeStepInfos.themesText}</h3>

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
                      className="w-full h-12 px-4 py-3 rounded-lg bg-white text-base font-medium text-gray-primary flex items-center justify-between group lg:cursor-pointer"
                    >
                      {option}
                      <Plus className="h-7 w-7 block text-green-primary lg:opacity-0 lg:group-hover:opacity-100 transition-opacity" />
                    </li>
                  ))
                ) : searchValue.length > 3 && filteredOptions.length == 0 ? (
                  <div className="w-full h-12 px-4 py-3 rounded-lg bg-[#E5ECF0] flex items-center justify-center">
                    <span className="text-base text-center text-[#96A3AB]">Resultado não encontrado</span>
                  </div>
                ) : (
                  themes
                    .filter((option) => !selectedOptions.includes(option))
                    .map((option, index) => (
                      <li
                        key={`${option}-${index}`}
                        onClick={() => handleOptionSelect(option)}
                        className="w-full h-12 px-4 py-3 rounded-lg bg-white text-base font-medium text-gray-primary flex items-center justify-between group lg:cursor-pointer"
                      >
                        {option}
                        <Plus className="h-7 w-7 block text-green-primary lg:opacity-0 lg:group-hover:opacity-100 transition-opacity" />
                      </li>
                    ))
                )}
              </ul>
            )}
          </div>

          <div className="w-full flex flex-col gap-6 md:flex-row">
            <Button variant="outline" className="w-full" onClick={() => {}} disabled={true}>
              {ThemeStepInfos.backButton}
            </Button>

            <Button className="w-full" onClick={handleNextBtn} disabled={!isNextAvailable || isLoading}>
              {ThemeStepInfos.nextButton}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeStep;

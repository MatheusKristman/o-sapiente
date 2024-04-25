// TODO: NÃO PRIORIDADE - ajustar o layout do form no desktop para melhorar visualmente

import { CalendarIcon, Loader2, Plus, X } from "lucide-react";
import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRouter } from "next/navigation";

import { cn } from "@/libs/utils";
import { MyAccountInfo } from "@/constants/dashboard/my-account-br";
import { professorUpdateFormSchema } from "@/constants/schemas/professorUpdateFormSchema";
import { cityOptionsType, stateOptionsType } from "@/types";
import { Subject } from "@prisma/client";
import {
    Form,
    FormField,
    FormItem,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

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
    const router = useRouter();

    const inputStyle =
        "w-full h-12 bg-[#EBEFF1] px-4 py-2 rounded-lg focus:outline-[#9DA5AA] text-base text-gray-primary";
    const currentYear = getYear(new Date());

    const form = useForm<z.infer<typeof professorUpdateFormSchema>>({
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
            aboutMe: "",
        },
        // @ts-ignore
        resolver: zodResolver(professorUpdateFormSchema),
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
                    form.setValue(
                        "birth",
                        new Date(res.data.birth) ?? undefined,
                    );
                    form.setValue("state", res.data.state ?? "");
                    form.setValue("address", res.data.address ?? "");
                    form.setValue(
                        "addressNumber",
                        res.data.addressNumber ?? "",
                    );
                    form.setValue("ddd", res.data.tel.substring(1, 3) ?? "");
                    form.setValue("cel", res.data.tel.substring(5) ?? "");
                    form.setValue("district", res.data.district ?? "");
                    form.setValue("complement", res.data.complement ?? "");
                    form.setValue("aboutMe", res.data.aboutMe ?? "");

                    setThemes(res.data.themes);
                    setSelectedCity(res.data.city);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            router.replace("/");
        }
    }, [session, form, router]);

    useEffect(() => {
        setIsLoading(true);

        axios
            .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
            .then((res) => {
                setStateOptions(res.data);
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setIsLoading(false);
            });
    }, [setIsLoading, setStateOptions]);

    useEffect(() => {
        if (stateOptions.length > 0) {
            setIsLoading(true);

            form.setValue("city", "");

            const ufSelected = stateOptions.filter(
                (option) => option.nome === state,
            );

            if (ufSelected.length > 0) {
                axios
                    .get(
                        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelected[0].id}/municipios`,
                    )
                    .then((res) => setCityOptions(res.data))
                    .catch((error) => console.error(error))
                    .finally(() => {
                        setIsLoading(false);
                    });
            } else {
                setCityOptions([]);

                setIsLoading(false);
            }
        }
    }, [state, stateOptions, setIsLoading, form]);

    useEffect(() => {
        if (cityOptions.length > 0 && selectedCity) {
            form.setValue("city", selectedCity);
            setSelectedCity("");
        }
    }, [cityOptions, selectedCity, form]);

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
                const filteredOpt = filteredSubjects[0].subs.filter(
                    (sub) => !themes.includes(sub),
                );

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

    // function handleBirth(event: ChangeEvent<HTMLInputElement>) {
    //     const value = event.target.value.replace(/[^0-9]/g, "").substring(0, 8);
    //     const formattedDate = value.replace(
    //         /(\d{2})(\d{2})(\d{4})/,
    //         "$1/$2/$3",
    //     );
    //
    //     form.setValue("birth", formattedDate);
    // }

    function handleDDD(event: ChangeEvent<HTMLInputElement>) {
        const DDDFormatted = event.target.value
            .replace(/[^0-9]/g, "")
            .substring(0, 2);

        form.setValue("ddd", DDDFormatted);
    }

    function handleCel(event: ChangeEvent<HTMLInputElement>) {
        let celValue = event.target.value
            .replace(/[^0-9]/g, "")
            .substring(0, 9);

        if (celValue.length > 5) {
            celValue = celValue.replace(/(\d{5})(\d{0,4})/, "$1-$2");
        }

        form.setValue("cel", celValue);
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

    function onSubmit(data: z.infer<typeof professorUpdateFormSchema>) {
        console.log(data);

        if (themes.length === 0) {
            toast.error(MyAccountInfo.themeErrorMessage);

            return;
        }

        setIsSubmitting(true);

        axios
            .patch("/api/user/update-account/professor", {
                ...data,
                themes,
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
                form.setValue("aboutMe", res.data.aboutMe ?? "");
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
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-white w-full max-w-3xl p-9 rounded-2xl shadow-md shadow-[rgba(0,0,0,0.25)]"
            >
                <h2 className="text-2xl text-gray-primary font-semibold mb-6">
                    {MyAccountInfo.personalDataTitle}
                </h2>

                <div className="w-full flex flex-col gap-y-4 mb-9">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        disabled={isSubmitting || isLoading}
                                        className={cn(
                                            "input",
                                            form.formState.errors.firstName &&
                                                "input-error",
                                        )}
                                        placeholder={
                                            MyAccountInfo
                                                .personalDataPlaceholders
                                                .firstName
                                        }
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
                                        className={cn(
                                            "input",
                                            form.formState.errors.lastName &&
                                                "input-error",
                                        )}
                                        placeholder={
                                            MyAccountInfo
                                                .personalDataPlaceholders
                                                .lastName
                                        }
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
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground",
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP", {
                                                        locale: ptBR,
                                                    })
                                                ) : (
                                                    <span className="text-gray-primary/50">
                                                        Data de nascimento
                                                    </span>
                                                )}

                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>

                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            locale={ptBR}
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date("1900-01-01")
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

                                <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
                        <div
                            className={cn(
                                "flex flex-col gap-y-1 sm:w-1/2",
                                "sm:grow lg:grow-0 xl:grow",
                            )}
                        >
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Select
                                                disabled={
                                                    isSubmitting || isLoading
                                                }
                                                defaultValue={field.value}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                name={field.name}
                                            >
                                                <SelectTrigger className="input placeholder:text-white">
                                                    <SelectValue
                                                        placeholder={
                                                            MyAccountInfo
                                                                .personalDataPlaceholders
                                                                .state
                                                        }
                                                    />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {stateOptions.map(
                                                        (state) => (
                                                            <SelectItem
                                                                key={state.id}
                                                                value={
                                                                    state.nome
                                                                }
                                                            >
                                                                {state.nome}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>

                                        <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div
                            className={cn(
                                "flex flex-col gap-y-1 sm:w-1/2",
                                "sm:grow lg:grow-0 xl:grow",
                            )}
                        >
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Select
                                                disabled={
                                                    isSubmitting || isLoading
                                                }
                                                defaultValue={field.value}
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                name={field.name}
                                            >
                                                <SelectTrigger className="input">
                                                    <SelectValue
                                                        placeholder={
                                                            MyAccountInfo
                                                                .personalDataPlaceholders
                                                                .city
                                                        }
                                                    />
                                                </SelectTrigger>

                                                <SelectContent>
                                                    {cityOptions.map((city) => (
                                                        <SelectItem
                                                            key={city.id}
                                                            value={city.nome}
                                                        >
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
                                <FormItem
                                    className={cn(
                                        "flex flex-col gap-y-1",
                                        "sm:grow lg:grow-0 xl:grow",
                                    )}
                                >
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={isSubmitting || isLoading}
                                            className={cn(
                                                "input",
                                                form.formState.errors.address &&
                                                    "input-error",
                                            )}
                                            placeholder={
                                                MyAccountInfo
                                                    .personalDataPlaceholders
                                                    .address
                                            }
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
                                <FormItem
                                    className={cn(
                                        "flex flex-col gap-y-1",
                                        "sm:w-2/5 lg:w-full xl:w-2/5",
                                    )}
                                >
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={isSubmitting || isLoading}
                                            className={cn(
                                                "input",
                                                form.formState.errors
                                                    .addressNumber &&
                                                    "input-error",
                                            )}
                                            placeholder={
                                                MyAccountInfo
                                                    .personalDataPlaceholders
                                                    .addressNumber
                                            }
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
                                <FormItem
                                    className={cn(
                                        "flex flex-col gap-y-1",
                                        "sm:w-2/5 lg:w-full xl:w-2/5",
                                    )}
                                >
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting || isLoading}
                                            onChange={handleDDD}
                                            name={field.name}
                                            ref={field.ref}
                                            value={field.value}
                                            onBlur={field.onBlur}
                                            className={cn(
                                                "input",
                                                form.formState.errors.ddd &&
                                                    "input-error",
                                            )}
                                            placeholder={
                                                MyAccountInfo
                                                    .personalDataPlaceholders
                                                    .ddd
                                            }
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
                                <FormItem
                                    className={cn(
                                        "flex flex-col gap-y-1",
                                        "sm:grow lg:grow-0 xl:grow",
                                    )}
                                >
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting || isLoading}
                                            onChange={handleCel}
                                            name={field.name}
                                            value={field.value}
                                            ref={field.ref}
                                            onBlur={field.onBlur}
                                            className={cn(
                                                "input",
                                                form.formState.errors.cel &&
                                                    "input-error",
                                            )}
                                            placeholder={
                                                MyAccountInfo
                                                    .personalDataPlaceholders
                                                    .cel
                                            }
                                        />
                                    </FormControl>

                                    <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-full flex flex-col gap-y-1">
                        <FormField
                            control={form.control}
                            name="district"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting || isLoading}
                                            className={cn(
                                                "input",
                                                form.formState.errors
                                                    .district && "input-error",
                                            )}
                                            placeholder={
                                                MyAccountInfo
                                                    .personalDataPlaceholders
                                                    .district
                                            }
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="w-full flex flex-col gap-y-1">
                        <FormField
                            control={form.control}
                            name="complement"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting || isLoading}
                                            className={cn(
                                                "input",
                                                form.formState.errors
                                                    .complement &&
                                                    "input-error",
                                            )}
                                            placeholder={
                                                MyAccountInfo
                                                    .personalDataPlaceholders
                                                    .complement
                                            }
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <h2 className="text-2xl text-gray-primary font-semibold mb-6">
                    {MyAccountInfo.themeTitle}
                </h2>

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
                            {searchValue.length > 3 &&
                            filteredOptions.length > 0 ? (
                                filteredOptions.map((option, index) => (
                                    <li
                                        key={`${option}-${index}`}
                                        onClick={() =>
                                            handleOptionSelect(option)
                                        }
                                        className="w-full h-12 px-4 py-3 rounded-lg bg-[#EBEFF1] text-base font-medium text-gray-primary flex items-center justify-between group lg:cursor-pointer"
                                    >
                                        {option}
                                        <Plus className="h-7 w-7 block text-green-primary lg:opacity-0 lg:group-hover:opacity-100 transition-opacity" />
                                    </li>
                                ))
                            ) : searchValue.length > 3 &&
                              filteredOptions.length == 0 ? (
                                <div className="w-full h-12 px-4 py-3 rounded-lg bg-[#E5ECF0] flex items-center justify-center">
                                    <span className="text-base text-center text-[#96A3AB]">
                                        Resultado não encontrado
                                    </span>
                                </div>
                            ) : (
                                availableThemes
                                    .filter(
                                        (option) => !themes?.includes(option),
                                    )
                                    .map((option, index) => (
                                        <li
                                            key={`${option}-${index}`}
                                            onClick={() =>
                                                handleOptionSelect(option)
                                            }
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

                <h2 className="text-2xl text-gray-primary font-semibold mb-6">
                    {MyAccountInfo.aboutTitle}
                </h2>

                <FormField
                    control={form.control}
                    name="aboutMe"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    disabled={isSubmitting || isLoading}
                                    className={cn(
                                        "textarea !h-[150px] mb-9",
                                        form.formState.errors.aboutMe &&
                                            "input-error",
                                    )}
                                    placeholder={MyAccountInfo.aboutPlaceholder}
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage className="text-sm text-[#FF7373] font-medium text-left" />
                        </FormItem>
                    )}
                />

                <Button
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting || isLoading}
                >
                    {MyAccountInfo.submitButton}
                </Button>
            </form>
        </Form>
    );
};

export default ProfessorFormBox;

"use client";

import { Plus, XIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import toast from "react-hot-toast";
import { useUploadThing } from "@/libs/uploadthing";

const formSchema = z.object({
  courseName: z.string().min(1, { message: "Nome do curso é obrigatório" }),
  themes: z
    .array(z.string().min(1, { message: "O conteúdo não pode ser vazio" }))
    .min(1, { message: "É preciso informar ao menos um conteúdo" }),
  benefits: z.array(
    z.string().min(1, { message: "O conteúdo não pode ser vazio" }),
  ),
  price: z.number().min(1, { message: "Valor é obrigatório" }),
});

export function CoursesModalForm() {
  const [themeValue, setThemeValue] = useState<string>("");
  const [benefitValue, setBenefitValue] = useState<string>("");
  const [courseImage, setCourseImage] = useState<File[] | null>(null);
  const [courseImageUrl, setCourseImageUrl] = useState<string>("");

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    "saveCourseImage",
    {
      onClientUploadComplete: () => {
        toast.success("Curso adicionado com sucesso");
      },
      onUploadError: (error) => {
        console.error(error);
        console.error(error.data);

        if (error.data?.message === "Unable to get presigned urls") {
          toast.error(
            "Tipo ou tamanho da imagem inválido, verifique e tente novamente. (PNG|JPG|JPEG - 1MB)",
          );

          return;
        }

        toast.error(
          "Ocorreu um erro ao enviar a imagem do curso, tente novamente mais tarde",
        );
      },
    },
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: "",
      themes: [],
      benefits: [],
      price: 0,
    },
  });

  const fileInput = useRef<HTMLInputElement | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setCourseImage(acceptedFiles);
      setCourseImageUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [setCourseImageUrl],
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const themes = form.watch("themes");
  const benefits = form.watch("benefits");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function AddTheme() {
    const themesArr = [...themes];

    themesArr.push(themeValue);

    form.setValue("themes", themesArr);

    setThemeValue("");
  }

  function RemoveTheme(themeIdx: number) {
    const themesArr = themes.filter((_, index) => index !== themeIdx);

    form.setValue("themes", themesArr);
  }

  function AddBenefit() {
    const benefitsArr = [...benefits];

    benefitsArr.push(benefitValue);

    form.setValue("benefits", benefitsArr);

    setBenefitValue("");
  }

  function RemoveBenefit(benefitIdx: number) {
    const benefitsArr = benefits.filter((_, index) => index !== benefitIdx);

    form.setValue("benefits", benefitsArr);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Plus size="30" strokeWidth={1.5} color="#03C988" />
        </Button>
      </DialogTrigger>

      <DialogContent className="h-full sm:h-fit sm:max-h-[650px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray-primary/40 scrollbar-track-gray-primary/20">
        <DialogHeader>
          <DialogTitle className="w-1/2 text-left text-xl font-semibold text-gray-primary !leading-tight mb-12">
            Adicione seu novo curso
          </DialogTitle>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-12"
            >
              <div className="w-full flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="courseName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-gray-primary text-sm font-semibold text-left">
                        Nome do curso
                      </FormLabel>

                      <FormControl>
                        <Input className="input" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="themes"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-gray-primary text-sm font-semibold text-left">
                        Conteúdos do curso
                      </FormLabel>

                      <FormControl>
                        <div className="w-full flex flex-col gap-2">
                          <div className="w-full flex flex-row items-center justify-between gap-3">
                            <Input
                              name={field.name}
                              onBlur={field.onBlur}
                              ref={field.ref}
                              value={themeValue}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setThemeValue(e.target.value)
                              }
                              className="input w-full"
                            />

                            <Button
                              type="button"
                              onClick={AddTheme}
                              className="shrink-0"
                            >
                              <Plus size={24} />
                            </Button>
                          </div>

                          {themes.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                              {themes.map((theme, index) => (
                                <div
                                  key={`theme-${index}`}
                                  className="bg-[#C8D6DF] px-3 py-1 flex items-center gap-2 rounded-full group"
                                >
                                  <span className="text-sm text-gray-primary font-medium">
                                    {theme}
                                  </span>

                                  <Button
                                    type="button"
                                    variant="link"
                                    size="icon"
                                    className="p-0 w-4 h-4 hidden group-hover:flex"
                                    onClick={() => RemoveTheme(index)}
                                  >
                                    <XIcon size={16} />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="benefits"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-gray-primary text-sm font-semibold text-left">
                        Beneficios
                      </FormLabel>

                      <FormControl>
                        <div className="w-full flex flex-col gap-2">
                          <div className="w-full flex flex-row items-center justify-between gap-3">
                            <Input
                              name={field.name}
                              onBlur={field.onBlur}
                              ref={field.ref}
                              value={benefitValue}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setBenefitValue(e.target.value)
                              }
                              className="input w-full"
                            />

                            <Button
                              type="button"
                              onClick={AddBenefit}
                              className="shrink-0"
                            >
                              <Plus size={24} />
                            </Button>
                          </div>

                          {benefits.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                              {benefits.map((benefit, index) => (
                                <div
                                  key={`benefit-${index}`}
                                  className="bg-[#C8D6DF] px-3 py-1 flex items-center gap-2 rounded-full group"
                                >
                                  <span className="text-sm text-gray-primary font-medium">
                                    {benefit}
                                  </span>

                                  <Button
                                    type="button"
                                    variant="link"
                                    size="icon"
                                    className="p-0 w-4 h-4 hidden group-hover:flex"
                                    onClick={() => RemoveBenefit(index)}
                                  >
                                    <XIcon size={16} />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-start">
                      <FormLabel className="text-gray-primary text-sm font-semibold text-left">
                        Valor do curso
                      </FormLabel>

                      <FormControl>
                        <div className="w-full relative">
                          <CurrencyInput
                            name={field.name}
                            placeholder="Insira o valor do curso"
                            defaultValue={0}
                            decimalsLimit={2}
                            onValueChange={(value, name) =>
                              form.setValue(name as "price", Number(value))
                            }
                            className="input !pl-10"
                          />

                          <span className="text-gray-primary text-base font-semibold absolute top-1/2 -translate-y-1/2 left-4">
                            R$
                          </span>
                        </div>
                      </FormControl>

                      <FormDescription>
                        Use o ponto para representar os centavos
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button className="w-full text-base font-semibold uppercase">
                Adicionar
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

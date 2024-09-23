"use client";

import { Edit, Loader2, Plus, XIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/libs/uploadthing";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { cn } from "@/libs/utils";
import Image from "next/image";
import axios from "axios";
import { Course } from "@prisma/client";
import useAdminStore from "@/stores/useAdminStore";

const formSchema = z.object({
  courseName: z.string().min(1, { message: "Nome do curso é obrigatório" }),
  themes: z
    .array(z.string().min(1, { message: "O conteúdo não pode ser vazio" }))
    .min(1, { message: "É preciso informar ao menos um conteúdo" }),
  benefits: z.array(z.string().min(1, { message: "O conteúdo não pode ser vazio" })),
  lessonsCount: z.string().refine((val) => Number(val) > 0, {
    message: "A quantidade de aulas não pode ser zero",
  }),
  hoursCount: z.string().refine((val) => Number(val) > 0, {
    message: "A quantidade de horas não pode ser zero",
  }),
  price: z.number().min(1, { message: "Valor é obrigatório" }),
});

interface CourseEditModalFormProps {
  courseSelected: Course;
}

export function CourseEditModalForm({ courseSelected }: CourseEditModalFormProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [themeValue, setThemeValue] = useState<string>("");
  const [benefitValue, setBenefitValue] = useState<string>("");
  const [courseImage, setCourseImage] = useState<File[] | null>(null);
  const [courseImageUrl, setCourseImageUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { setCourses } = useAdminStore();

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing("saveCourseImage", {
    onClientUploadComplete: () => {
      setIsSubmitting(true);

      axios
        .get("/api/courses/get")
        .then((res) => {
          toast.success("Curso adicionado com sucesso");
          setCourses(res.data);
          setIsModalOpen(false);
          ResetForm();
        })
        .catch((error) => {
          console.error(error);

          toast.error(error.response.data);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    },
    onUploadError: (error) => {
      console.error(error);
      console.error(error.data);

      if (error.data?.message === "Unable to get presigned urls") {
        toast.error("Tipo ou tamanho da imagem inválido, verifique e tente novamente. (PNG|JPG|JPEG - 1MB)");

        return;
      }

      toast.error("Ocorreu um erro ao enviar a imagem do curso, tente novamente mais tarde");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: courseSelected.courseName,
      themes: courseSelected.themes,
      benefits: courseSelected.benefits,
      lessonsCount: String(courseSelected.lessonsCount),
      hoursCount: String(courseSelected.hoursCount),
      price: courseSelected.price / 100,
    },
  });

  const fileInput = useRef<HTMLInputElement | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setCourseImage(acceptedFiles);
      setCourseImageUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [setCourseImageUrl]
  );

  const fileTypes = permittedFileInfo?.config ? Object.keys(permittedFileInfo?.config) : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const themes = form.watch("themes");
  const benefits = form.watch("benefits");

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    axios
      .post("/api/courses/edit", { ...values, courseId: courseSelected.id })
      .then((res) => {
        if (courseImage && courseImageUrl) {
          startUpload(courseImage, { courseId: res.data.id });
        } else {
          axios
            .get("/api/courses/get")
            .then((res) => {
              toast.success("Curso editado com sucesso");
              setCourses(res.data);
              setIsModalOpen(false);
              ResetForm();
            })
            .catch((error) => {
              console.error(error);

              toast.error(error.response.data);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
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

  function ResetForm() {
    form.reset();
    setCourseImage(null);
    setCourseImageUrl("");
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Edit size={20} />
          Editar
        </Button>
      </DialogTrigger>

      <DialogContent className="h-full min-[510px]:h-fit min-[510px]:rounded-lg min-[510px]:max-h-[650px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-gray-primary/40 scrollbar-track-gray-primary/20">
        <DialogHeader>
          <DialogTitle className="w-1/2 text-left text-xl font-semibold text-gray-primary !leading-tight mb-12">
            Edite seu curso
          </DialogTitle>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-12 flex-1 justify-between">
              <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col items-start">
                  <span className="text-gray-primary text-sm font-semibold text-left">Capa do curso</span>

                  <div
                    {...getRootProps()}
                    className={cn(
                      "relative w-full min-[510px]:w-2/4 aspect-video cursor-pointer rounded-xl overflow-hidden group",
                      {
                        "opacity-20 select-none pointer-events-none": isSubmitting || isUploading,
                      }
                    )}
                  >
                    <div
                      className={cn(
                        "w-full h-full flex items-center justify-center bg-gray-primary/50 p-6 transition group-hover:bg-gray-primary/70",
                        {
                          hidden: !!courseImage,
                        }
                      )}
                    >
                      <span className="text-sm text-white font-medium text-center">
                        Clique ou arraste a foto para atualizar a capa
                      </span>
                    </div>

                    {courseImageUrl && (
                      <Image src={courseImageUrl} alt="Capa do curso" fill className="object-cover w-full h-full" />
                    )}
                  </div>

                  <input {...getInputProps()} disabled={isUploading || isSubmitting} />
                </div>

                <FormField
                  control={form.control}
                  name="courseName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-gray-primary text-sm font-semibold text-left">Nome do curso</FormLabel>

                      <FormControl>
                        <Input disabled={isSubmitting || isUploading} className="input" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lessonsCount"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-gray-primary text-sm font-semibold text-left">
                        Quantidade de aulas
                      </FormLabel>

                      <FormControl>
                        <Input
                          disabled={isSubmitting || isUploading}
                          className="input"
                          onBlur={field.onBlur}
                          ref={field.ref}
                          name={field.name}
                          value={field.value}
                          onChange={(e) => form.setValue("lessonsCount", e.target.value.replace(/[^0-9]/g, ""))}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hoursCount"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-gray-primary text-sm font-semibold text-left">
                        Quantidade de horas
                      </FormLabel>

                      <FormControl>
                        <Input
                          disabled={isSubmitting || isUploading}
                          className="input"
                          onBlur={field.onBlur}
                          ref={field.ref}
                          name={field.name}
                          value={field.value}
                          onChange={(e) => form.setValue("hoursCount", e.target.value.replace(/[^0-9]/g, ""))}
                        />
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
                              onChange={(e: ChangeEvent<HTMLInputElement>) => setThemeValue(e.target.value)}
                              disabled={isSubmitting || isUploading}
                              className="input w-full"
                            />

                            <Button
                              disabled={isSubmitting || isUploading}
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
                                  <span className="text-sm text-gray-primary font-medium">{theme}</span>

                                  <Button
                                    type="button"
                                    variant="link"
                                    size="icon"
                                    className="p-0 w-4 h-4 hidden group-hover:flex"
                                    disabled={isSubmitting || isUploading}
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
                      <FormLabel className="text-gray-primary text-sm font-semibold text-left">Beneficios</FormLabel>

                      <FormControl>
                        <div className="w-full flex flex-col gap-2">
                          <div className="w-full flex flex-row items-center justify-between gap-3">
                            <Input
                              name={field.name}
                              onBlur={field.onBlur}
                              ref={field.ref}
                              value={benefitValue}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => setBenefitValue(e.target.value)}
                              disabled={isSubmitting || isUploading}
                              className="input w-full"
                            />

                            <Button
                              disabled={isSubmitting || isUploading}
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
                                  <span className="text-sm text-gray-primary font-medium">{benefit}</span>

                                  <Button
                                    type="button"
                                    variant="link"
                                    size="icon"
                                    className="p-0 w-4 h-4 hidden group-hover:flex"
                                    disabled={isSubmitting || isUploading}
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
                            defaultValue={courseSelected.price / 100}
                            decimalsLimit={2}
                            onValueChange={(value, name) => form.setValue(name as "price", Number(value))}
                            disabled={isSubmitting || isUploading}
                            className="input !pl-10"
                          />

                          <span className="text-gray-primary text-base font-semibold absolute top-1/2 -translate-y-1/2 left-4">
                            R$
                          </span>
                        </div>
                      </FormControl>

                      <FormDescription>Use o ponto para representar os centavos</FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                disabled={isSubmitting || isUploading}
                className="w-full text-base font-semibold uppercase flex items-center gap-2"
              >
                {isSubmitting || isUploading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Salvando
                  </>
                ) : (
                  <>Salvar</>
                )}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

import { Trash } from "lucide-react";
import { Course } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAdminStore from "@/stores/useAdminStore";

interface CourseRemoveModalProps {
  courseSelected: Course;
  setItemModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function CourseRemoveModal({ courseSelected, setItemModalOpen }: CourseRemoveModalProps) {
  const [isOpen, setOpen] = useState<boolean>(false);

  const { setCourses } = useAdminStore();

  function handleConfirm() {
    axios
      .put("/api/courses/delete", { courseId: courseSelected.id })
      .then((res) => {
        toast.success("Curso deletado com sucesso");
        setCourses(res.data.courses);
        setOpen(false);
        setItemModalOpen(false);
      })
      .catch((error) => {
        console.log(error);

        toast.error("Ocorreu um erro ao deletar o curso, tente novamente mais tarde");
      });
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full min-[510px]:w-fit">
          <Trash />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja remover o curso?</AlertDialogTitle>
          <AlertDialogDescription>O curso será deletado permanentemente do servidor.</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction onClick={handleConfirm}>Remover</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

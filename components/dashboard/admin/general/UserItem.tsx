import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";

export function UserItem() {
  return (
    <div className="w-full bg-green-primary p-4 rounded-lg flex flex-col items-center gap-6">
      <div className="w-full flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-full relative overflow-hidden">
          <Image
            src="/assets/images/default-user-photo.svg"
            alt="Usuário"
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="flex flex-col items-center">
          <span className="text-white text-lg font-semibold text-center">John Doe</span>
          <span className="text-white text-base font-semibold text-center">Professor</span>
        </div>
      </div>

      <Button variant="secondary" className="w-full flex items-center gap-2">
        <Plus className="text-green-primary" />
        <span className="text-green-primary font-semibold text-base uppercase">Ver detalhes</span>
      </Button>
    </div>
  );
}

"use client";

import { Plus, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { AdminGeneralText } from "@/constants/dashboard/admin-general-br";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function SubjectsBox() {
  return (
    <div className="w-full rounded-lg bg-white p-9 shadow-md shadow-[rgba(0,0,0,0.25)]">
      <div className="w-full flex flex-col sm:flex-row sm:justify-between lg:flex-col lg:justify-start xl:flex-row xl:justify-between gap-2 mb-4">
        <h2 className="text-gray-primary text-xl font-semibold lg:whitespace-nowrap whitespace-normal">
          {AdminGeneralText.subjectsBoxTitle}
        </h2>

        <div className="w-full sm:max-w-md lg:max-w-none xl:max-w-md flex items-center gap-4 pb-1">
          <div className="basis-full flex items-center justify-between input-admin-users-search focus-within:ring-2 focus-within:ring-[#00FFAB] peer">
            <Input
              type="text"
              name="filter"
              placeholder={AdminGeneralText.requestsPlaceholder}
              className="bg-transparent outline-none w-full"
            />

            <Search
              className="h-6 w-6 min-h-[24px] min-w-[24px]"
              style={{
                color: "#9DA5AA",
              }}
            />
          </div>

          <Button>
            <Plus />
          </Button>
        </div>
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="test">
          <AccordionTrigger className="text-gray-primary text-lg text-left">
            Matemática
          </AccordionTrigger>

          <AccordionContent>
            <div className="w-full flex flex-col gap-6">
              <div className="w-full flex flex-col gap-2">
                <span className="text-base text-gray-primary font-medium text-left">
                  Temas
                </span>

                <div className="w-full flex flex-wrap gap-x-2 gap-y-3">
                  <span className="bg-green-primary rounded-md text-white px-4 py-2 text-sm font-medium">
                    Teste
                  </span>

                  <span className="bg-green-primary rounded-md text-white px-4 py-2 text-sm font-medium">
                    Teste 2
                  </span>

                  <span className="bg-green-primary rounded-md text-white px-4 py-2 text-sm font-medium">
                    Teste 3
                  </span>

                  <span className="bg-green-primary rounded-md text-white px-4 py-2 text-sm font-medium">
                    Teste 4
                  </span>
                </div>
              </div>

              <div className="w-full flex flex-col sm:flex-row gap-2">
                <Button className="w-full">EDITAR</Button>

                <Button variant="destructive" className="w-full">
                  DELETAR
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

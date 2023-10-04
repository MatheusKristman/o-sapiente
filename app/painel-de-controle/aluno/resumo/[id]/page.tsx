"use client";

import Image from "next/image";
import { Dot } from "lucide-react";

import Button from "@/components/Button";

const DashboardPage = () => {
  return (
    <div className="flex-1 w-full px-6 pt-9 mx-auto flex flex-col gap-9 md:px-16 lg:container">
      <div className="w-full flex flex-col-reverse gap-9">
        <div className="w-full flex flex-col gap-5 bg-white rounded-2xl p-9 shadow-md shadow-[rgba(0,0,0,0.25)]">
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image
              src="/assets/images/profile-test.png"
              alt="Perfil"
              fill
              className="object-cover"
            />
          </div>

          <span className="w-full text-center text-xl text-gray-primary font-semibold">
            John Doe
          </span>
        </div>

        <div className="shadow-md shadow-[rgba(0,0,0,0.25)] rounded-lg">
          <Button
            label="NOVA SOLICITAÇÃO"
            primary
            fullWidth
            onClick={() => {}}
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-8">
        <div className="w-full rounded-lg bg-green-primary p-9 mb-5 shadow-md shadow-[rgba(0,0,0,0.25)]">
          <h2 className="text-white text-2xl font-semibold mb-5 md:text-3xl">
            Solicitações <br />
            Pendentes
          </h2>

          <div className="w-full h-56 scrollbar scrollbar-thumb-slate-100">
            <div className="w-full rounded-lg bg-white p-5">
              <div className="flex flex-col">
                <div className="flex justify-center">
                  <Image
                    src="/assets/images/profile-test.png"
                    alt="Perfil"
                    width={50}
                    height={40}
                    className="object-cover rounded-3xl"
                  />
                </div>

                <div className="flex items-center justify-center p-2.5 text-green-primary text-lg font-semibold">
                  <span>John Doe</span>

                  <Dot />

                  <span>Matemática</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Button
                  primary
                  fullWidth
                  label="VER PROPOSTA"
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full rounded-lg bg-white p-9 mb-9 shadow-md shadow-[rgba(0,0,0,0.25)]">
          <h2 className=" text-2xl text-green-primary font-semibold mb-5 md:text-3xl">
            Aulas em <br />
            Andamento
          </h2>

          <div className="w-full h-56 scrollbar scrollbar-thumb-slate-100">
            <div className="w-full rounded-lg bg-green-primary p-5">
              <div className="flex flex-col">
                <div className="flex justify-center">
                  <Image
                    src="/assets/images/profile-test.png"
                    alt="Perfil"
                    width={50}
                    height={40}
                    className="object-cover rounded-3xl"
                  />
                </div>

                <div className="flex items-center justify-center p-2.5 text-white text-lg font-semibold">
                  <span>John Doe</span>

                  <Dot />

                  <span>Matemática</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Button
                  primaryMobile
                  fullWidth
                  label="VER PROPOSTA"
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>

        {/* TODO continuar estilização */}
        {/* 
            <div>
              <div>
                <div>
                  <Image
                    src="/assets/images/profile-test.png"
                    alt="Perfil"
                    width={20}
                    height={20}
                    className="object-cover"
                    />
                </div>

                <div>
                  <span>John Doe</span>

                  <Dot />

                  <span>Matemática</span>
                </div>
              </div>

              <Button label="VER MENSAGEM" onClick={() => {}} />
            </div>

            <div>
              <div>
                <div>
                  <Image
                    src="/assets/images/profile-test.png"
                    alt="Perfil"
                    width={20}
                    height={20}
                    className="object-cover"
                  />
                </div>

                <div>
                  <span>John Doe</span>

                  <Dot />

                  <span>Matemática</span>
                </div>
              </div>

              <Button label="VER MENSAGEM" onClick={() => {}} />
            </div>
          </div>
        

        <div>
          <h2>Aulas em Andamento</h2>

          <div>
            <div>
              <div>
                <div>
                  <Image
                    src="/assets/images/profile-test.png"
                    alt="Perfil"
                    width={20}
                    height={20}
                    className="object-cover"
                  />
                </div>

                <div>
                  <span>John Doe</span>

                  <Dot />

                  <span>Matemática</span>
                </div>
              </div>

              <Button label="VER MENSAGEM" onClick={() => {}} />
            </div>
          </div>
            */}
      </div>
    </div>
  );
};

export default DashboardPage;

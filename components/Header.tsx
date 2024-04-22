"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosMenu } from "react-icons/io";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

import {
    navLinks,
    professorHeaderButton,
    studentHeaderButton,
} from "@/constants/header-br";
import { Button } from "@/components/ui/button";
import useHeaderStore from "@/stores/useHeaderStore";
import useStudentModalStore from "@/stores/useStudentModalStore";
import useProfessorModalStore from "@/stores/useProfessorModalStore";
import { menuItems } from "@/constants/dashboard/dashboard-nav-br";
import { cn } from "@/libs/utils";
import useUserStore from "@/stores/useUserStore";

const Header = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { isMobileMenuOpen, openMobileMenu } = useHeaderStore();
    const { accountType, setAccountType, userId, setUserId } = useUserStore();
    const { openModal: openStudentModal, setToRegister } =
        useStudentModalStore();
    const { openModal: openProfessorModal } = useProfessorModalStore();

    const session = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (session) {
            setIsLoading(true);

            axios
                .get("/api/user/get-user")
                .then((res) => {
                    setAccountType(res.data.type);
                    setUserId(res.data.id);
                })
                .catch((error) => console.error(error))
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [session, setAccountType, setUserId, setIsLoading]);

    function scrollTo(id: string) {
        if (pathname !== "/") {
            router.push("/");
        }

        setTimeout(() => {
            const element = document.getElementById(id);

            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }, 100);
    }

    function openStudentRegisterModal() {
        openStudentModal();
        setToRegister();
    }

    function openProfessorLoginModal() {
        openProfessorModal();
    }

    function handleDashboardStudentBtn() {
        if (session.status === "authenticated" && userId) {
            router.push(
                `${menuItems[0].studentHref}${userId}${menuItems[0].pageHref}`,
            );
        }
    }

    function handleDashboardProfessorBtn() {
        if (session.status === "authenticated" && userId) {
            router.push(
                `${menuItems[0].professorHref}${userId}${menuItems[0].pageHref}`,
            );
        }
    }

    async function handleLogOut() {
        const data = await signOut({ redirect: false, callbackUrl: "/" });

        router.replace(data.url);
    }

    return (
        <header className="lg:container mx-auto py-5 px-6 md:px-16 flex justify-between items-center w-full lg:w-auto">
            <Link href="/">
                <Image
                    src="/assets/images/logo-colored.svg"
                    alt="O Sapiente"
                    width={160}
                    height={30}
                    priority
                    className="object-contain"
                />
            </Link>

            <Button
                variant="link"
                size="icon"
                type="button"
                disabled={isLoading}
                onClick={openMobileMenu}
                className={cn(
                    "flex lg:hidden items-center justify-center cursor-pointer",
                    {
                        "opacity-0 pointer-events-none": isMobileMenuOpen,
                    },
                )}
            >
                <IoIosMenu size={35} className="text-green-primary" />
            </Button>

            <ul className="hidden lg:flex items-center justify-between gap-x-12">
                {navLinks.map((link) => (
                    <li
                        key={link.href}
                        onClick={() => scrollTo(link.href)}
                        className="text-gray-primary cursor-pointer text-base xl:text-lg hover:opacity-70 transition duration-200 whitespace-nowrap"
                    >
                        {link.label}
                    </li>
                ))}
            </ul>

            <div className="hidden lg:flex items-center justify-center gap-x-6">
                {session.status === "authenticated" ? (
                    accountType === "STUDENT" ? (
                        <>
                            <Button
                                variant="link"
                                size="sm"
                                type="button"
                                disabled={isLoading}
                                onClick={handleLogOut}
                                className="flex gap-2 items-center justify-center text-green-primary text-lg"
                            >
                                <LogOut className="h-6 w-6" />
                                Sair
                            </Button>

                            <Button
                                type="button"
                                disabled={isLoading}
                                onClick={handleDashboardStudentBtn}
                                className="bg-green-primary flex gap-2 items-center justify-center text-white text-lg px-7 py-2 rounded-lg cursor-pointer transition hover:brightness-90"
                            >
                                <Image
                                    src="/assets/icons/user.svg"
                                    alt="Usuário"
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />
                                Área do Aluno
                            </Button>
                        </>
                    ) : accountType === "PROFESSOR" ? (
                        <>
                            <Button
                                variant="link"
                                disabled={isLoading}
                                size="sm"
                                type="button"
                                onClick={handleLogOut}
                                className="flex gap-2 items-center justify-center text-green-primary text-lg"
                            >
                                <LogOut className="h-6 w-6" />
                                Sair
                            </Button>

                            <Button
                                type="button"
                                disabled={isLoading}
                                onClick={handleDashboardProfessorBtn}
                                className="bg-green-primary flex gap-2 items-center justify-center text-white text-lg px-7 py-2 rounded-lg cursor-pointer transition hover:brightness-90"
                            >
                                <Image
                                    src="/assets/icons/user.svg"
                                    alt="Usuário"
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />
                                Área do Professor
                            </Button>
                        </>
                    ) : null
                ) : (
                    <>
                        <Button
                            variant="outline"
                            disabled={isLoading}
                            onClick={openProfessorLoginModal}
                        >
                            {professorHeaderButton.label}
                        </Button>

                        <Button
                            disabled={isLoading}
                            onClick={openStudentRegisterModal}
                        >
                            {studentHeaderButton.label}
                        </Button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;

import Image from "next/image";

const ResumeProfilePhoto = () => {
  return (
    <div className="w-full flex flex-col gap-5 bg-white rounded-2xl p-9 shadow-md shadow-[rgba(0,0,0,0.25)]">
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        <Image src="/assets/images/profile-test.jpg" alt="Perfil" fill className="object-cover" />
      </div>

      <span className="w-full text-center text-xl text-gray-primary font-semibold">John Doe</span>
    </div>
  );
};

export default ResumeProfilePhoto;

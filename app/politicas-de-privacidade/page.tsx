import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="w-full px-6 pt-12 mx-auto md:px-16 lg:container lg:pt-10 lg:pb-12">
      <main className="flex flex-col gap-3.5">
        <h1 className="text-2xl md:text-3xl	 font-bold text-start text-gray-800">
          Política de Privacidade
        </h1>
        <p className="text-base md:text-lg mt-2.5 text-start text-gray-800">
          A sua privacidade é importante para nós. É política do O Sapiente respeitar a sua
          privacidade em relação a qualquer informação sua que possamos coletar no site{" "}
          <Link href="/" className="text-[#03C988] underline">
            O Sapiente
          </Link>
          , e outros sites que possuímos e operamos.
        </p>
        <p className=" text-base md:text-lg text-gray-800">
          Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe
          fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e
          consentimento. Também informamos por que estamos coletando e como será usado.
        </p>
        <p className=" text-base md:text-lg text-gray-800">
          Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço
          solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis
          ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não
          autorizados.
        </p>
        <p className=" text-base md:text-lg text-gray-800">
          Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que
          talvez não possamos fornecer alguns dos serviços desejados.
        </p>
        <p className=" text-base md:text-lg text-gray-800">
          O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno
          de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com
          dados do usuário e informações pessoais, entre em contacto conosco.
        </p>
        <ul className="text-base md:text-lg px-6 text-gray-800 list-disc ">
          <li className="mb-3.5">
            O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick
            para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um
            determinado anúncio é exibido para você.
          </li>
          <li>
            Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre
            privacidade do Google AdSense.
          </li>
        </ul>
        <h2 className="text-2xl mt-5 font-bold text-start text-gray-800">Compromisso do Usuário</h2>
        <p className=" text-base md:text-lg text-gray-800">
          O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o O
          Sapiente oferece no site e com caráter enunciativo, mas não limitativo:
        </p>
        <ul className="text-base md:text-lg px-6 text-gray-800 list-disc ">
          <li className="mb-3.5">
            A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem
            pública;
          </li>
          <li className="mb-3.5">
            B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte
            ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os
            direitos humanos;
          </li>
          <li className="mb-3.5">
            C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do O
            Sapiente, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus
            informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de
            causar danos anteriormente mencionados.
          </li>
        </ul>
        <h2 className="text-2xl mt-5 font-bold text-start text-gray-800">Mais informações</h2>
        <p className=" text-base md:text-lg text-gray-800">
          Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você
          não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados,
          caso interaja com um dos recursos que você usa em nosso site.
        </p>
        <p className=" text-base md:text-lg mb-[50px] text-gray-800">
          Esta política é efetiva a partir de 22 de Agosto 2023 17:30
        </p>
      </main>
    </div>
  );
};

export default PrivacyPolicy;

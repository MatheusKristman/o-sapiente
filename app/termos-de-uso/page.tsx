import Link from "next/link";

const UseTerms = () => {
  return (
    <div className="w-full px-6 pt-12 mx-auto md:px-16 lg:container lg:pt-10 lg:pb-12">
      <main className="flex flex-col gap-3.5">
        <h1 className="text-2xl md:text-3xl	 font-bold text-start text-gray-800">
          1. Termos
        </h1>
        <p className="text-base md:text-lg mt-2.5 text-start text-gray-800">
          Ao acessar ao site{" "}
          <Link href="/" className="text-[#03C988] underline">
            O Sapiente
          </Link>
          , concorda em cumprir estes termos de serviço, todas as leis e
          regulamentos aplicáveis ​​e concorda que é responsável pelo
          cumprimento de todas as leis locais aplicáveis. Se você não concordar
          com algum desses termos, está proibido de usar ou acessar este site.
          Os materiais contidos neste site são protegidos pelas leis de direitos
          autorais e marcas comerciais aplicáveis.
        </p>
        <h2 className="text-2xl md:text-3xl mt-5 font-bold text-start text-gray-800">
          2. Uso de Licença
        </h2>

        <p className=" text-base md:text-lg text-gray-800">
          É concedida permissão para baixar temporariamente uma cópia dos
          materiais (informações ou software) no site O Sapiente , apenas para
          visualização transitória pessoal e não comercial. Esta é a concessão
          de uma licença, não uma transferência de título e, sob esta licença,
          você não pode:
        </p>

        <ul className="text-base md:text-lg px-6 text-gray-800 list-decimal ">
          <li className="mb-3.5">modificar ou copiar os materiais;</li>
          <li className="mb-3.5">
            usar os materiais para qualquer finalidade comercial ou para
            exibição pública (comercial ou não comercial);
          </li>
          <li className="mb-3.5">
            tentar descompilar ou fazer engenharia reversa de qualquer software
            contido no site O Sapiente;
          </li>
          <li className="mb-3.5">
            remover quaisquer direitos autorais ou outras notações de
            propriedade dos materiais; ou
          </li>
          <li className="">
            transferir os materiais para outra pessoa ou &apos;espelhe&apos; os
            materiais em qualquer outro servidor.
          </li>
        </ul>
        <p className=" text-base md:text-lg text-gray-800">
          Esta licença será automaticamente rescindida se você violar alguma
          dessas restrições e poderá ser rescindida por O Sapiente a qualquer
          momento. Ao encerrar a visualização desses materiais ou após o término
          desta licença, você deve apagar todos os materiais baixados em sua
          posse, seja em formato eletrónico ou impresso.
        </p>

        <h2 className="text-2xl  md:text-3xl mt-5 font-bold text-start text-gray-800">
          3. Isenção de responsabilidade
        </h2>

        <ul className="text-base md:text-lg px-6 text-gray-800 list-decimal ">
          <li className="mb-3.5">
            Os materiais no site da O Sapiente são fornecidos &apos;como
            estão&apos;. O Sapiente não oferece garantias, expressas ou
            implícitas, e, por este meio, isenta e nega todas as outras
            garantias, incluindo, sem limitação, garantias implícitas ou
            condições de comercialização, adequação a um fim específico ou não
            violação de propriedade intelectual ou outra violação de direitos.
          </li>
          <li className="">
            Além disso, o O Sapiente não garante ou faz qualquer representação
            relativa à precisão, aos resultados prováveis ​​ou à confiabilidade
            do uso dos materiais em seu site ou de outra forma relacionado a
            esses materiais ou em sites vinculados a este site.
          </li>
        </ul>
        <h2 className="text-2xl md:text-3xl mt-5 font-bold text-start text-gray-800">
          4. Limitações
        </h2>
        <p className=" text-base md:text-lg text-gray-800">
          Em nenhum caso o O Sapiente ou seus fornecedores serão responsáveis
          ​​por quaisquer danos (incluindo, sem limitação, danos por perda de
          dados ou lucro ou devido a interrupção dos negócios) decorrentes do
          uso ou da incapacidade de usar os materiais em O Sapiente, mesmo que O
          Sapiente ou um representante autorizado da O Sapiente tenha sido
          notificado oralmente ou por escrito da possibilidade de tais danos.
          Como algumas jurisdições não permitem limitações em garantias
          implícitas, ou limitações de responsabilidade por danos conseqüentes
          ou incidentais, essas limitações podem não se aplicar a você.
        </p>
        <h2 className="text-2xl md:text-3xl mt-5 font-bold text-start text-gray-800">
          5. Precisão dos materiais
        </h2>
        <p className=" text-base md:text-lg text-gray-800">
          Os materiais exibidos no site da O Sapiente podem incluir erros
          técnicos, tipográficos ou fotográficos. O Sapiente não garante que
          qualquer material em seu site seja preciso, completo ou atual. O
          Sapiente pode fazer alterações nos materiais contidos em seu site a
          qualquer momento, sem aviso prévio. No entanto, O Sapiente não se
          compromete a atualizar os materiais.
        </p>
        <h2 className="text-2xl md:text-3xl mt-5 font-bold text-start text-gray-800">
          6. Links
        </h2>
        <p className=" text-base md:text-lg text-gray-800">
          O O Sapiente não analisou todos os sites vinculados ao seu site e não
          é responsável pelo conteúdo de nenhum site vinculado. A inclusão de
          qualquer link não implica endosso por O Sapiente do site. O uso de
          qualquer site vinculado é por conta e risco do usuário.
        </p>
        <h2 className="text-xl  mt-5 font-bold text-start text-gray-800">
          Modificações
        </h2>
        <p className=" text-base md:text-lg text-gray-800">
          O O Sapiente pode revisar estes termos de serviço do site a qualquer
          momento, sem aviso prévio. Ao usar este site, você concorda em ficar
          vinculado à versão atual desses termos de serviço.
        </p>
        <h2 className="text-xl  mt-5 font-bold text-start text-gray-800">
          Lei aplicável
        </h2>
        <p className=" text-base md:text-lg mb-[50px] text-gray-800">
          Estes termos e condições são regidos e interpretados de acordo com as
          leis do O Sapiente e você se submete irrevogavelmente à jurisdição
          exclusiva dos tribunais naquele estado ou localidade.
        </p>
      </main>
    </div>
  );
};

export default UseTerms;

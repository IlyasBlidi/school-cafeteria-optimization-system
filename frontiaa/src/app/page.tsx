import { FC } from "react";

const Home: FC = () => {
  return (
    <>
      <main className="font-general-sans min-h-screen h-[500px] min-w-[800px] flex flex-col items-center justify-between">
        <header className="flex items-center justify-around px-[50px] w-full gap-y-6 md:px-[280px] md:flex-nowrap">
          <p>Estidio</p>
          <p>Artistas</p>
          <div className="bg-black text-white flex flex-col rounded-b-md px-8 py-2">
            <p>MomdayClub</p>
            <p className="text-[10px] self-end">TATTOO</p>
          </div>
          <p>What?</p>
          <p>Contacta</p>
        </header>
        <section className="font-semibold text-4xl flex flex-col items-center w-full">
          <div>
            <p>Momday</p>
            <p>Club</p>
            <p className="font-normal text-sm">TATTOO</p>
          </div>
        </section>
        <section className="flex items-center justify-between w-full text-[13px] p-5">
          <div>
            <p>Estamos en Las Palmas de Gran Canaria Espana</p>
            <p>Cal Leon Castillo numero CP: 35003</p>
            <p>Pasate y nos cuentas tu siguiente tattoo </p>
          </div>
          <div>Hazte tu propio tattoo clickando</div>
        </section>
      </main>
      <footer className="bg-black text-white font-general-sans flex flex-col gap-y-16 min-w-[800px] px-14 py-5 text-[12px]">
        <p className="text-[20px] font-semibold">
          We would like to hear from you!
        </p>
        <div className="flex items-center justify-between h-full font-mono pr-[200px]">
          <address className="flex flex-col gap-y-5 not-italic">
            <p>Oslo;</p>
            <div>
              <p>oslo(at)bleed.com</p>
              <p>47 993 06 000</p>
            </div>
            <div>
              <p>Thorvald Meyers gate 9.</p>
              <p>0555 Oslo, Norway</p>
            </div>
            <p>bleed</p>
          </address>
          <address className="flex flex-col gap-y-5 not-italic">
            <p>Vienna;</p>
            <div>
              <p>vienna(at)bleed.com</p>
              <p>43 993 06 000</p>
            </div>
            <div>
              <p>Thorvald Meyers gate 9.</p>
              <p>0555 Oslo, Norway</p>
            </div>
            <p>OSL/VIE</p>
          </address>
          <address className="flex flex-col justify-between self-stretch not-italic">
            <p>Follow us;</p>
            <div>
              <p></p>
              <p></p>
            </div>
            <div>
              <p></p>
              <p>(at)bleed.studio</p>
            </div>
            <p>CET 15:33:07</p>
          </address>
        </div>
      </footer>
    </>
  );
};

export default Home;

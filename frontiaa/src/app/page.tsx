'use client'
import Link from "next/link";
import { FC, useEffect, useState } from "react";


const Home: FC = () => {


  return (
    <>
      <main className="font-general-sans min-h-screen h-[500px] min-w-[800px] flex flex-col items-center justify-between">
        <header className="flex items-center justify-around px-[50px] w-full gap-y-6 md:px-[280px] md:flex-nowrap">
          <p>Menu</p>
          <p>Orders</p>
          <Link href="/auth/login">
            <div className="bg-black text-white flex flex-col rounded-b-md px-8 py-2">
              <p>WufuCafeteria</p>
              <p className="text-[10px] self-end">Eat & Chill</p>
            </div>
          </Link>
          <p>About</p>
          <p>Contact</p>
        </header>
        <section className="font-semibold text-4xl flex flex-col items-center w-full">
          <div>
            <p>Wufu</p>
            <p>Cafeteria</p>
            <p className="font-normal text-sm">Eat & Chill!</p>
          </div>
        </section>
        <section className="flex items-center justify-between w-full text-[13px] p-5">
          <div>
            <p>Located in National School of Applied Sciences (ENSA)</p>
            <p>Khouribga, Morocco</p>
            <p>Come visit us for delicious meals and great atmosphere!</p>
          </div>
          <div>Order your favorite meal now!</div>
        </section>
      </main>
      <footer className="bg-black text-white font-general-sans flex flex-col gap-y-16 min-w-[800px] px-14 py-5 text-[12px]">
        <p className="text-[20px] font-semibold">
          We would like to hear from you!
        </p>
        <div className="flex items-center justify-between h-full font-mono pr-[200px]">
          <address className="flex flex-col gap-y-5 not-italic">
            <p>Main Location;</p>
            <div>
              <p>info@wufucafeteria.com</p>
              <p>+212 123 456 789</p>
            </div>
            <div>
              <p>ENSA Khouribga</p>
              <p>Khouribga, Morocco</p>
            </div>
            <p>Wufu</p>
          </address>
          <address className="flex flex-col gap-y-5 not-italic">
            <p>Opening Hours;</p>
            <div>
              <p>Monday - Friday</p>
              <p>7:30 AM - 6:00 PM</p>
            </div>
            <div>
              <p>Saturday</p>
              <p>8:00 AM - 4:00 PM</p>
            </div>
            <p>ENSA</p>
          </address>
          <address className="flex flex-col justify-between self-stretch not-italic">
            <p>Follow us;</p>
            <div>
              <p>Instagram</p>
              <p>Facebook</p>
            </div>
            <div>
              <p>LinkedIn</p>
              <p>@wufucafeteria</p>
            </div>
            <p>GMT+1</p>
          </address>
        </div>
      </footer>
    </>
  );
};

export default Home;
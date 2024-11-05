"use client";
import styles from "./page.module.scss";
import Image from "next/image";
import { MouseEvent, useRef } from "react";
import gsap from "gsap";
import {
  floating1,
  floating2,
  floating3,
  floating4,
  // floating5,
  // floating6,
  // floating7,
  // floating8,
} from "../data/data";

export default function Home() {
  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  let requestAnimationFrameId: number | null = null;
  let xForce = 0;
  let yForce = 0;
  const easing = 0.08;
  const speed = 0.01;

  const manageMouseMove = (e: MouseEvent<HTMLElement, MouseEvent>) => {
    const { movementX, movementY } = e;
    xForce += movementX * speed;
    yForce += movementY * speed;

    if (requestAnimationFrameId == null) {
      requestAnimationFrameId = requestAnimationFrame(animate);
    }
  };

  const lerp = (start: number, target: number, amount: number) =>
    start * (1 - amount) + target * amount;

  const animate = () => {
    xForce = lerp(xForce, 0, easing);
    yForce = lerp(yForce, 0, easing);
    gsap.set(plane1.current, { x: `+=${xForce}`, y: `+=${yForce}` });
    gsap.set(plane2.current, {
      x: `+=${xForce * 0.5}`,
      y: `+=${yForce * 0.5}`,
    });
    gsap.set(plane3.current, {
      x: `+=${xForce * 0.25}`,
      y: `+=${yForce * 0.25}`,
    });

    if (Math.abs(xForce) < 0.01) xForce = 0;
    if (Math.abs(yForce) < 0.01) yForce = 0;

    if (xForce != 0 || yForce != 0) {
      requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestAnimationFrameId);
      requestAnimationFrameId = null;
    }
  };

  return (
    <main
      onMouseMove={(e) => {
        manageMouseMove(e);
      }}
      className={`!bg-faragh ${styles.main}`}
    >
      <div ref={plane1} className={styles.plane}>
        <Image src={floating1} alt="image" width={300} />
        <Image src={floating2} alt="image" width={300} />
        <Image src={floating4} alt="image" width={225} />
      </div>
      <div ref={plane2} className={styles.plane}>
        <Image src={floating4} alt="image" width={250} />
        <Image src={floating1} alt="image" width={200} />
        <Image src={floating2} alt="image" width={225} />
      </div>
      <div ref={plane3} className={styles.plane}>
        <Image src={floating3} alt="image" width={150} />
        {/* <Image src={floating5} alt="image" width={200} /> */}
      </div>
      <div
        className={`flex flex-col items-center gap-y-10 w-full ${styles.title}`}
      >
        <h1 className="text-byed font-tido text-[160px]">السارعة</h1>
        <p className="text-byed">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat
          voluptates, maxime incidunt reprehenderit praesentium iure nam, autem
          asperiores laudantium aliquid rerum ea ratione, laboriosam suscipit!
          Optio accusamus iusto modi cupiditate.
        </p>
        <div className="w-full flex items-center justify-center gap-10 text-byed font-bixie text-[35px]">
          <button className="bg-zrek w-1/4 rounded-lg">دخول</button>
          <button className="bg-zrek w-1/4 rounded-lg">انضمام</button>
        </div>
      </div>
    </main>
  );
}

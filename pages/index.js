import HeadComponent from "../component/HeadComponent";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Navbar from "../component/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <HeadComponent />
      <Navbar />
    </>
  );
}

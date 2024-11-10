import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className={styles.page}
      style={{
        background: "linear-gradient(0deg, #217EA0, #bc916e7a), url(bg.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <main className={styles.main}>
        {/* <Image
          className={styles.logo}
          src="./logo.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        /> */}
        <div className="" style={{ textAlign: "center", fontWeight: "bold" }}>
          <Image
            className={styles.logo}
            src="/logo.png"
            alt="Next.js logo"
            width={250}
            height={200}
            priority
          />
          <ul>
            <li style={{ display: "block" }}>Trading App</li>
          </ul>
        </div>

        <div className={styles.ctas}>
          <Link href="/pages/login" className={styles.primary}>
            <Image
              className={styles.logo}
              src="/vercelsvg.svg"
              alt=""
              width={20}
              height={20}
            />
            Login Now
          </Link>

          <a className={styles.secondary}>
            {/* <Image
              className={styles.logo}
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            /> */}
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>Copyrights Devkumar Parekh</footer>
    </div>
  );
}

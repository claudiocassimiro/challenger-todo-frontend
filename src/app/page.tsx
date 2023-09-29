import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Visite o repositório do projeto em&nbsp;
          <a
            className={styles.code}
            href="https://github.com/claudiocassimiro/challenger-todo-frontend"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/claudiocassimiro
          </a>
        </p>
        <div className={styles.containerButtons}>
          <Link href="/login" className={styles.button}>
            Login
          </Link>
          <Link href="/register" className={styles.button}>
            Registre-se agora
          </Link>
        </div>
      </div>

      <div className={styles.center}>
        <h1 className={inter.className}>Todo List</h1>
        <p className={inter.className}>Seu assistente em Organização.</p>
      </div>

      <div className={styles.grid}>
        <a
          href="https://www.linkedin.com/in/claudiocassimiro"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Desenvolvido por <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Cláudio Cassimiro</p>
        </a>
      </div>
    </main>
  );
}

# LF - Personal Trainer App

Este é o aplicativo oficial do Personal Trainer Lucas França, desenvolvido com React, Vite e Tailwind CSS. O projeto suporta tanto versão Web (PWA) quanto aplicativo nativo Android (via Capacitor).

## 🚀 Como subir na Vercel (Versão Web)

Para colocar o site no ar gratuitamente:

1.  Certifique-se de que este código está no seu **GitHub** (clique em Sync/Commit no editor).
2.  Crie uma conta na [Vercel](https://vercel.com).
3.  Clique em **"Add New..."** -> **"Project"**.
4.  Importe o repositório `lf-personal-trainer` do seu GitHub.
5.  **Configurações de Build:**
    *   **Framework Preset:** Vite
    *   **Root Directory:** ./ (padrão)
    *   **Build Command:** `npm run build` (ou padrão)
    *   **Output Directory:** `dist` (padrão)
6.  Clique em **Deploy**.

> **Nota:** O arquivo `vercel.json` já está configurado para evitar erros de rota (404) ao recarregar a página.

---

## 📱 Como gerar o App Android (APK)

O projeto possui automação (GitHub Actions) para gerar o aplicativo.

1.  Vá até a aba **Actions** no repositório do GitHub.
2.  Selecione o workflow **"Build Android APK"** na barra lateral esquerda.
3.  Clique em **"Run workflow"** (botão verde no canto direito).
4.  Aguarde o processo terminar (cerca de 5 a 10 minutos).
5.  Quando ficar verde (✅), clique no nome da execução.
6.  Role até a seção **Artifacts** e baixe o arquivo `lf-personal-app-debug`.
7.  Extraia o ZIP e instale o APK no seu celular.

## 📸 Foto de Perfil

Para que sua foto apareça no app:
1.  Adicione uma foto chamada `lucas-foto.jpg` na pasta `public/` do repositório.

## 🛠 Tecnologias

*   React 18
*   Vite
*   Tailwind CSS
*   Capacitor (para Android)
*   Recharts (Gráficos)
*   Lucide React (Ícones)

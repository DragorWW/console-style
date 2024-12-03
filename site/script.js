import { console$, style, _ } from "../src/console$.ts";

// Определяем стили для консоли
const purple = style({ color: "#8B5CF6" });
const orange = style({ color: "#F97316" });
const gray = style({ color: "#94A3B8" });
const green = style({ color: "#22C55E" });
const bold = style({ fontWeight: "bold" });

// Логотип в виде ASCII
const logoAscii = `
╭─< CSS-in-JS for Console >─╮
│ █▀▀ █▀█ █▄░█ █▀ █▀█ █     │
│ █▄▄ █▄█ █░▀█ ▄█ █▄█ █▄▄   │
│ ▔▔▔ $ T Y L E ▔▔▔ v1.0    │
╰───────────────────────────╯`.trim();

// Отображаем логотип на странице
document.getElementById("logo").textContent = logoAscii;

// Функции для консоли
const showLogo = () => {
  console$`
        ${purple`  ╭─< CSS-in-JS for Console >─╮`}
        ${orange`  │ █▀▀ █▀█ █▄░█ █▀ █▀█ █     │`}
        ${orange`  │ █▄▄ █▄█ █░▀█ ▄█ █▄█ █▄▄   │`}
        ${gray`  │ ▔▔▔ $ T Y L E ▔▔▔ v1.0    │`}
        ${purple`  ╰───────────────────────────╯`}
    `;
};

const showStyled = () => {
  console$([
    _(purple, bold)`Hello from `,
    _(orange, bold)`Console$`,
    gray` - Styled console output for browser`,
  ]);

  console$(_(green, bold)`✓ Loaded successfully!`);
};

// Добавляем обработчики событий
document.getElementById("showLogoBtn").addEventListener("click", showLogo);
document.getElementById("showStyledBtn").addEventListener("click", showStyled);

// Показываем лого при загрузке
showLogo();

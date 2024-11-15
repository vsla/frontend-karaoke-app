import React from "react";
import { FaRegCopy } from "react-icons/fa6";

export const CopyToClipboardButton = ({ code }) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        alert("Código copiado para a área de transferência!");
      })
      .catch((error) => {
        console.error("Erro ao copiar código:", error);
      });
  };
  const copyToShare = () => {
    navigator
      .share({
        title: "Código da festa",
        text: `Junte-se à festa com o código: ${code}`,
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Compartilhamento cancelado pelo usuário.");
        } else {
          console.error("Erro ao compartilhar:", error);
        }
      });
  };

  const handleCopy = () => {
    const userAgent = navigator.userAgent;
    const isPc = userAgent.match(/Windows|Macintosh|Linux/i) !== null;

    if (navigator.share && !isPc) {
      copyToShare();
    } else {
      copyToClipboard();
    }
  };

  return (
    <button
      type="button"
      className="btn btn-outline-primary btn-sm border-gray-500 text-gray-500 text-xs hover:bg-transparent hover:text-gray-500"
      onClick={handleCopy}
    >
      <FaRegCopy className="mr-2" />
      Copiar Código
    </button>
  );
};

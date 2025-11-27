import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs/promises";
import path from "path";

// 1. Configuración del servidor
const server = new McpServer({
  name: "react-builder",
  version: "1.0.0",
});

// --- 2. Definición de la herramienta TOOL 1: CREAR COMPONENTE REACT (AI puede "TOCAR" nuestros archivos)
server.tool(
  "crear_componente",
  {
    ruta: z
      .string()
      .describe(
        "Ruta relativa donde guardar el archivo (ej: 'src/components/Button.tsx' o 'app/page.tsx')"
      ),
    codigo: z
      .string()
      .describe(
        "El código completo del componente React, incluyendo imports y exports."
      ),
  },
  async ({ ruta, codigo }) => {
    try {
      // Calcula la ruta absoluta basada en donde abres VS Code
      const fullPath = path.resolve(process.cwd(), ruta);

      // Asegura que la carpeta exista (ej: si 'src/components' no existe, la crea)
      await fs.mkdir(path.dirname(fullPath), { recursive: true });

      // Escribe el archivo
      await fs.writeFile(fullPath, codigo, "utf-8");

      return {
        content: [
          {
            type: "text",
            text: `✅ ¡Listo! Componente creado en: ${ruta}\nUbicación real: ${fullPath}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `❌ Error al crear el componente: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// --- TOOL 2: LISTAR ARCHIVOS (AI puede "VER" nuestros archivos)
server.tool(
  "listar_archivos",
  {
    carpeta: z
      .string()
      .describe(
        "Carpeta a inspeccionar (ej: 'src/components' o '.' para raíz)"
      ),
  },
  async ({ carpeta }) => {
    try {
      const fullPath = path.resolve(process.cwd(), carpeta);
      const archivos = await fs.readdir(fullPath);

      return {
        content: [
          {
            type: "text",
            text: `📂 Archivos en '${carpeta}':\n- ${archivos.join("\n- ")}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          { type: "text", text: `❌ Error al leer carpeta: ${error.message}` },
        ],
        isError: true,
      };
    }
  }
);

// 3. Conexión y arranque
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Servidor React Builder iniciado...");
}

main().catch((error) => {
  console.error("Error fatal:", error);
  process.exit(1);
});

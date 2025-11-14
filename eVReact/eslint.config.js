import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"], //Áp dụng cho các file ts, tsx
    extends: [
      js.configs.recommended, //rule cho js
      tseslint.configs.recommended, // rule cho ts
      reactHooks.configs["recommended-latest"], // rule cho hook
      reactRefresh.configs.vite, //  cấu hình cho phép eslint tương thích với react refresh khi dùng vite
    ],
    languageOptions: {
      ecmaVersion: 2020, //ESLint hiểu cú pháp ES2020
      globals: globals.browser, //định nghĩa sẵn các biến toàn cục của môi trường trình duyệt (window, ..)
    },
    // Tắt check eslint đối với file vite.config.ts
    ignores: ["vite.config.ts"],
    // Đăng ký plugin Prettier cho ESLint để dùng rule `prettier/prettier` kiểm tra format
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      // Khai báo rule cho prettier/prettier để eslint dùng để check
      "prettier/prettier": [
        "warn",
        {
          arrowParens: "always", // Luôn thêm ngoặc đơn cho tham số arrow function
          semi: false, // Không dùng dấu chấm phẩy ở cuối dòng
          trailingComma: "none", // Không thêm dấu phẩy cuối cùng trong object/array
          tabWidth: 2, // Mỗi tab = 2 khoảng trắng
          endOfLine: "auto", // Xuống dòng tự động theo hệ điều hành
          useTabs: false, // Dùng space thay vì tab
          singleQuote: true, // Dùng nháy đơn thay cho nháy kép
          printWidth: 120, // Giới hạn 120 ký tự mỗi dòng
          jsxSingleQuote: true, // Trong JSX cũng dùng nháy đơn
        },
      ],
    },
  },
]);

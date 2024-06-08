"use client";

import { useData } from "../store/store";
import { useRouter } from "next/navigation";

export default function Toolbar() {
  const router = useRouter();
  return (
    <header className="fixed inset-0 top-0 flex h-16 w-full items-center justify-end bg-transparent p-4">
      <button
        className="btn btn-sm"
        onClick={() => {
          useData.persist.clearStorage();
          window.location.reload();
        }}
      >
        처음부터
      </button>
    </header>
  );
}

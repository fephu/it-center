import { Input } from "@/components/ui/input";
import ClientOnly from "./components/ClientOnly";

export default async function Home() {

  return (
    <ClientOnly>
      <div
        className="
          w-full
          h-screen
          border-b-[2px]
          shadow-md
        "
      >
        <div
          className="
            px-24
            relative
          "
        >
          <img
            src="https://res.cloudinary.com/dzfhbsqf1/image/upload/v1684427927/fa076447-2355-44bc-bcec-592bbd61d4f3_v2lca2.jpg"
            className="
         
            "
          />

        </div>
      </div>
    </ClientOnly>
  )
}

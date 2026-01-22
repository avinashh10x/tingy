import Image from "next/image";
import TextAnimation1 from "./ui/textAnimation1";
import HoverSwapText from "./ui/textAnimation1";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full backdrop-blur-sm ">
      <div className="mx-auto max-w-7xl px-4 sm:px-4  py-4  ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={"/"} className="flex">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center ">
                <Image
                  src="/og-image.png"
                  alt="Tingy Logo"
                  width={62}
                  height={62}
                  className="object-contain hover:rotate-90 hover:scale-150 transition-transform duration-500 cursor-pointer hover:drop-shadow-[0px_0px_10px_rgba(0,0,225,.2)]"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text  ">
                  <HoverSwapText text="Tingy" className=" font-bold" />
                </h1>
                <p className="text-xs text-muted-foreground -mt-2">
                  Smart Image Compressor
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="relative inline-flex items-center px-3 py-1 text-sm font-medium rounded-full">
              <span className="relative z-10 text-primary font-bold">
                100% Free
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DetailedPiece, GetPiece } from "../../../utils/piece-helper";
import ActionCard from "../../../components/pieces/ActionCard";
import Image from "next/image";
import TriggerCard from "../../../components/pieces/TriggerCard";
import PieceLogo from "../../../components/pieces/PieceLogo";

export default function PiecePage() {
  const router = useRouter();

  const [piece, setPiece] = useState<DetailedPiece>();

  useEffect(() => {
    if (router.query.id === undefined) {
      return;
    }
    GetPiece(`@activepieces/piece-${router.query.id}`).then((piece) => {
      setPiece(piece);
    });
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <style jsx global>{`
        body {
          background: url("../dark-background.svg");
          background-repeat: no-repeat;
          background-size: 100% auto;
          background-position: center top;
        }
      `}</style>
      {piece && (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="mt-[80px]"></div>
          <PieceLogo size={80} pieceLogoUrl={piece.logoUrl} />
          <h1 className="text-5xl font-bold text-center mt-8 text-white">
            {piece.displayName}
          </h1>
          <section className="text-center text-lg mt-8 max-w-[700px] p-4 text-white">
            <p>
              Activepieces lets you connect {piece.displayName} with the most
              popular apps, so you can automate your work and have more time for
              what matters most - no code required.
            </p>
          </section>
          <section className="text-white text-2xl mt-12 font-bold p-4 text-center max-w-[500px]">
            Revolutionize Your Processes with Triggers and Actions
          </section>
          <div className="text-yellow text-3xl font-bold mt-4 p-4 text-center">
            <Image
              src="../trigger.svg"
              alt="Triggers"
              width={25}
              height={45}
              className="mr-2 inline"
            />
            Triggers
          </div>
          {Object.keys(piece.triggers).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 p-8 w-full max-w-[1000px]">
              {Object.entries(piece.triggers).map(([key, trigger]) => (
                <TriggerCard
                  key={key}
                  trigger={trigger}
                  logoUrl={piece.logoUrl}
                ></TriggerCard>
              ))}
            </div>
          ) : (
            <div className="text-white text-lg  p-4 text-center">
              There is no triggers available for {piece.displayName}
            </div>
          )}
          <div className="text-green text-3xl font-bold mt-8 p-4 text-center">
            <Image
              src="../action.svg"
              alt="Actions"
              width={45}
              height={45}
              className="mr-2 inline"
            />
            Actions
          </div>
          {Object.keys(piece.actions).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 p-8 w-full max-w-[1000px]">
              {Object.entries(piece.actions).map(([key, trigger]) => (
                <ActionCard
                  key={key}
                  action={trigger}
                  logoUrl={piece.logoUrl}
                ></ActionCard>
              ))}
            </div>
          ) : (
            <div className="text-white text-lg  p-4 text-center">
              There is no actions available for {piece.displayName}
            </div>
          )}
        </div>
      )}
    </main>
  );
}

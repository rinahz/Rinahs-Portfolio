import PortfolioGrid from "./components/PortfolioGrid";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="gradient-backdrop" />
      <main className="flex flex-1 items-center justify-center p-4 md:p-10">
        <PortfolioGrid />
      </main>
    </div>
  );
}

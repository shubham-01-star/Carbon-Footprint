import FootprintApp from '../components/FootprintApp';

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-12 font-sans selection:bg-emerald-200">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <header className="text-center mt-8 mb-4 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-emerald-950 mb-4">
            Carbon Footprint
          </h1>
          <p className="text-lg text-slate-600">
            Calculate your environmental impact and receive highly personalized AI-driven insights to help build a sustainable future.
          </p>
        </header>

        <FootprintApp />
      </div>
    </main>
  );
}

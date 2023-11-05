import storasjöfallet from "./assets/Stora_Sjöfallet.jpg";
import landscape from "./assets/landscape.jpg";
import landscapeTwo from "./assets/landscape2.webp";
import landscapeThree from "./assets/landscape3.jpg";
import Hero from "./modules/Hero";
import NewParksMap from "./modules/NewParksMap";

const featuredParks = [
  {
    id: 1,
    name: "Abiskojåkka",
    image: landscape,
    color: "rgba(5, 46, 22, 0.7)",
  },
  {
    id: 2,
    name: "Storasjöfallet",
    image: landscapeTwo,
    color: "rgba(115, 89, 49, 0.6)",
  },
  {
    id: 3,
    name: "Padjelantaleden",
    image: landscapeThree,
    color: "rgba(131, 52, 9, 0.6)",
  },
  {
    id: 4,
    name: "Storasjöfallet",
    image: storasjöfallet,
    color: "rgba(69, 70, 40, 0.6)",
  },
];

function App() {
  return (
    <main className="bg-slate-950">
      <Hero parks={featuredParks} />
      <div className="-mt-20 h-40 bg-gradient-to-t from-slate-900"></div>
      <div className="h-screen">
        <NewParksMap />
      </div>
    </main>
  );
}

export default App;

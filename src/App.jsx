import { QueryClient, QueryClientProvider } from "react-query";
import storasjöfallet from "./assets/Stora_Sjöfallet.jpg";
import landscape from "./assets/landscape.jpg";
import landscapeTwo from "./assets/landscape2.webp";
import landscapeThree from "./assets/landscape3.jpg";
import Hero from "./modules/Hero";
import NewParksMap from "./modules/NewParksMap";
import ParkInformation from "./modules/ParkInformation";
import "@mantine/core/styles.css";
import { ReactQueryDevtools } from "react-query/devtools";
import { MantineProvider } from "@mantine/core";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

const featuredParks = [
  {
    id: 1,
    name: "Abiskojåkka",
    image: landscape,
    color: "rgba(5, 46, 22, 0.7)",
  },
  {
    id: 2,
    name: "Stora sjöfallet",
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
    name: "Stora sjöfallet",
    image: storasjöfallet,
    color: "rgba(69, 70, 40, 0.6)",
  },
];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <main className="bg-slate-950 py-px">
          <Hero parks={featuredParks} />
          <div className="-mt-20 h-40 bg-gradient-to-t from-slate-900"></div>
          <section className="h-screen">
            <NewParksMap />
          </section>

          {featuredParks.map((park) => (
            <ParkInformation key={park.id} park={park} />
          ))}
        </main>
        <ReactQueryDevtools initialIsOpen={false} />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;

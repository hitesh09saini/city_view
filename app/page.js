import Gallery from "./Gallery";
import Header from "./Header";
import { StateProvider } from './contextapi/stateContext'

export default function Home() {
  return (
    <div className="">
      <StateProvider>
        <Header />
        <Gallery />
      </StateProvider>
    </div>
  );
}

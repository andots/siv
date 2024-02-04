import type { Component } from "solid-js";

import TitleBar from "~/components/TitleBar";
import Viewer from "~/components/Viewer";

const App: Component = () => {
  return (
    <div class="overflow-hidden flex flex-col">
      <TitleBar />
      <Viewer />
    </div>
  );
};

export default App;

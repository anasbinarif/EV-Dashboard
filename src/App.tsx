import RootLayout from "./layouts/RootLayout.tsx";
import { MainDashboard } from "@features/index.ts";

function App() {

  return (
    <RootLayout>
      <MainDashboard />
    </RootLayout>
  )
}

export default App

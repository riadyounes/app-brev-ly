import { Button } from "./components/button";

export function App() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center p-10 bg-gray-200">
      <h1>Hello Word</h1>
      <Button variant="primary" className="w-full" >Label</Button>
    </div>
  )
}


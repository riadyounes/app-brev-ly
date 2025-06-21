import { DownloadSimpleIcon, Link } from "@phosphor-icons/react/dist/ssr";
import { Button } from "./ui/button";

export function LinkList() {

  const isEmptyList = true; // This should be replaced with actual logic to check if there are links
  return (
    <div className="w-full rounded-lg bg-gray-100 p-8 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl text-gray-600">Meus links</h2>
        <Button variant="secondary" className="flex items-center" >
          <DownloadSimpleIcon className="size-4 mr-1.5" />
            Baixar CSV
        </Button>
      </div>
      <div className="w-full border-b border-gray-200" />
      {isEmptyList && (
        <div className="flex flex-col items-center justify-center gap-3 py-4">
          <Link className="text-gray-400 size-8" />
          <p className="text-xs text-gray-500 uppercase">ainda não existem links cadastrados</p>
        </div>
      )}
    </div>
  )
}
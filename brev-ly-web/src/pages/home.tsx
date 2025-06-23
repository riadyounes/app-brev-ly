import { LinkList } from '../components/link-list'
import Logo from '../assets/Logo.svg'
import { Button } from '../components/ui/button'

export function Home() {
  return (
    <div className="min-h-screen bg-gray-300">
      <div className="max-w-7xl mx-auto flex flex-col p-8 justify-center items-center md:items-start">
        <img src={Logo} alt="" className="h-6 w-[96px] mb-6 md:mb-8" />
        <div className="flex flex-col md:flex-row gap-5 w-full">
          <div className="bg-gray-100 p-6 rounded-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Novo link</h2>
            <Button className="w-full">Salvar link</Button>
          </div>
          <LinkList />
        </div>
      </div>
    </div>
  )
}

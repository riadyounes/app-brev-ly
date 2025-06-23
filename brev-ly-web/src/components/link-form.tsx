import { Button } from './ui/button'
import Input from './ui/input'

export function LinkForm() {
  return (
    <div className="md:max-w-[380px] bg-gray-100 p-6 rounded-lg w-full flex flex-col gap-6">
      <h2 className="text-xl font-semibold mb-4">Novo link</h2>
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Input label="Link original" placeholder="www.exemplo.com.br" />
          <Input label="Link encurtado" placeholder="brev.ly/" />
        </div>
        <Button className="w-full">Salvar link</Button>
      </form>
    </div>
  )
}

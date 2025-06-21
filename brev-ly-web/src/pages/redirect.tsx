import logoIcon from '../assets/Logo_Icon.svg'

export function Redirect() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="max-w-[580px] w-full bg-gray-100 rounded-lg py-12 px-5 flex flex-col items-center justify-center gap-6 md:py-16 md:px-12 mx-3">
        <img src={logoIcon} alt="ícone da logo" className='w-12 h-12' />
        <h1 className="text-gray-600 text-2xl font-bold">Redirecionando...</h1>
        <div className='flex flex-col items-center justify-center gap-1'>
          <p className="text-sm text-gray-500 text-center">O link será aberto automaticamente em alguns instantes.</p>
          <span className='text-sm text-gray-500'>Não foi redirecionado? <a href="/" className='text-blue-500 underline'>Acesse aqui</a></span>
        </div>
      </div>
    </div>
  )
}
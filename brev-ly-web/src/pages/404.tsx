import notFountImage from '../assets/404.svg';

export function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="max-w-[484px] bg-gray-100 rounded-lg py-12 px-5 flex flex-col items-center justify-center gap-6 md:py-16 md:px-12 mx-3">
        <img src={notFountImage} alt="404 Not Found" className="w-[164px] h-[72px] md:w-[192px] md:h-[85px]" />
        <h1 className="text-gray-600 text-2xl font-bold">Link não encontrado</h1>
        <p className="text-sm">O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em <a href='/' className='text-blue-500 underline'>brev.ly</a>.</p>
      </div>
    </div>
  )
}
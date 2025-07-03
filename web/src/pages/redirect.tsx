import { useParams } from 'react-router-dom'
import logoIcon from '../assets/Logo_Icon.svg'
import { useQuery } from '@tanstack/react-query'
import { redirectLink } from '@/api/redirect-link'
import { useEffect } from 'react'
import { queryClient } from '@/lib/react-query'

export function Redirect() {
  const { shortUrl } = useParams()

  const { data: result, isLoading: isLoadingLink } = useQuery({
    queryKey: ['link', shortUrl],
    queryFn: () => redirectLink({ shortUrl: shortUrl! }),
    enabled: !!shortUrl,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (!isLoadingLink && result === undefined) {
      window.location.replace('/404')
    }
  }, [isLoadingLink, result])

  useEffect(() => {
    if (result?.originalUrl) {
      window.location.href = result.originalUrl
      queryClient.invalidateQueries({ queryKey: ['links'] })
    }
  }, [result?.originalUrl])

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="max-w-[580px] w-full bg-gray-100 rounded-lg py-12 px-5 flex flex-col items-center justify-center gap-6 md:py-16 md:px-12 mx-3">
        <img src={logoIcon} alt="ícone da logo" className="w-12 h-12" />
        <h1 className="text-gray-600 text-2xl font-bold">Redirecionando...</h1>
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-sm text-gray-500 text-center">
            O link será aberto automaticamente em alguns instantes.
          </p>
          <span className="text-sm text-gray-500">
            Não foi redirecionado?{' '}
            <a href={result?.originalUrl} className="text-blue-500 underline">
              Acesse aqui
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}

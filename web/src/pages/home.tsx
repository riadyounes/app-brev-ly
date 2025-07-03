import { useQuery } from '@tanstack/react-query'
import Logo from '../assets/Logo.svg'
import { LinkForm } from '../components/link-form'
import { LinkList } from '../components/link-list'
import { getLinks } from '@/api/get-links'

export function Home() {
  const { data: result } = useQuery({
    queryKey: ['links'],
    queryFn: () => getLinks(),
  })

  if (!result) return null

  return (
    <div className="min-h-screen bg-gray-300">
      <div className="max-w-[980px] mx-auto flex flex-col pt-8 px-3 md:pt-20 justify-center items-center md:items-start">
        <img src={Logo} alt="" className="h-6 w-[96px] mb-6 md:mb-8" />
        <div className="flex flex-col items-start md:flex-row gap-3 md:gap-5 w-full">
          <LinkForm />
          <LinkList links={result.links} />
        </div>
      </div>
    </div>
  )
}

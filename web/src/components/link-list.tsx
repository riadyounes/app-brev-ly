import { deleteLink } from '@/api/delete-link'
import { queryClient } from '@/lib/react-query'
import {
  CopyIcon,
  DownloadSimpleIcon,
  Link,
  TrashIcon,
} from '@phosphor-icons/react/dist/ssr'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { exportLinks } from '@/api/export-links'

interface LinkListProps {
  links: {
    id: string
    shortUrl: string
    originalUrl: string
    accessCount: number
    createdAt: Date | null
  }[]
}

export function LinkList({ links }: LinkListProps) {
  const isEmptyList = links.length === 0

  function handleCopy(shortUrl: string) {
    navigator.clipboard.writeText(`http://localhost:5173/redirect/${shortUrl}`)
    toast.success('Link copiado para a área de transferência!')
  }

  const { mutateAsync: deleteLinkFn } = useMutation({
    mutationFn: deleteLink,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
      toast.success('Link deletado com sucesso!')
    },
  })

  async function handleDelete(link: { shortUrl: string }) {
    if (window.confirm('Tem certeza que deseja deletar este link?')) {
      await deleteLinkFn({ shortUrl: link.shortUrl })
    }
  }

  const { mutateAsync: exportLinksFn, isPending: isPendingExportLinks } =
    useMutation({
      mutationFn: exportLinks,
      onSuccess: async () => {
        toast.success('Links exportados com sucesso!')
      },
    })

  async function handleDownloadCSV() {
    const { reportUrl } = await exportLinksFn()

    const anchor = document.createElement('a')
    anchor.href = reportUrl
    anchor.download = ''
    anchor.target = '_blank'
    anchor.click()

    anchor.remove()
  }

  return (
    <div className="md:max-w-[580px] w-full rounded-lg bg-gray-100 p-8 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg text-gray-600">Meus links</h2>
        <Button
          variant="secondary"
          className="flex items-center"
          onClick={() => handleDownloadCSV()}
          disabled={isPendingExportLinks}
        >
          <DownloadSimpleIcon className="size-4 mr-1.5 text-gray-600" />
          Baixar CSV
        </Button>
      </div>

      {isEmptyList && (
        <div className="flex flex-col gap-4">
          <div className="w-full border-b border-gray-200" />
          <div className="flex flex-col items-center justify-center gap-3 py-4">
            <Link className="text-gray-400 size-8" />
            <p className="text-xs text-gray-500 uppercase">
              ainda não existem links cadastrados
            </p>
          </div>
        </div>
      )}
      {!isEmptyList && (
        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <>
              <div className="w-full border-b border-gray-200" />
              <div key={link.id} className="flex items-center gap-5">
                <div className="flex flex-col gap-1 flex-1">
                  <a
                    href={`http://localhost:5173/redirect/${link.shortUrl}`}
                    className="text-blue-500 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.shortUrl}
                  </a>
                  <span className="text-gray-500 text-xs">
                    {link.originalUrl}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {link.accessCount} acessos
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="icon"
                    onClick={() => handleCopy(link.shortUrl)}
                  >
                    <CopyIcon />
                  </Button>
                  <Button
                    variant="icon"
                    onClick={() => handleDelete({ shortUrl: link.shortUrl })}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  )
}

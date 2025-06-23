import {
  CopyIcon,
  DownloadSimpleIcon,
  Link,
  TrashIcon,
} from '@phosphor-icons/react/dist/ssr'
import { Button } from './ui/button'

export function LinkList() {
  const isEmptyList = true

  const links = [
    {
      original: 'https://example.com',
      short: 'https://brev.ly/abc123',
      accessCount: 42,
    },
    {
      original: 'https://another-site.com/page',
      short: 'https://brev.ly/xyz789',
      accessCount: 17,
    },
    {
      original: 'https://meusite.com/blog/post',
      short: 'https://brev.ly/def456',
      accessCount: 8,
    },
    {
      original: 'https://empresa.com/contato',
      short: 'https://brev.ly/ghi321',
      accessCount: 25,
    },
    {
      original: 'https://produto.com/oferta',
      short: 'https://brev.ly/jkl654',
      accessCount: 63,
    },
  ]

  return (
    <div className="md:max-w-[580px] w-full rounded-lg bg-gray-100 p-8 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg text-gray-600">Meus links</h2>
        <Button variant="secondary" className="flex items-center">
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
          {links.map((link, idx) => (
            <>
              <div className="w-full border-b border-gray-200" />
              <div key={link.short + idx} className="flex items-center gap-5">
                <div className="flex flex-col gap-1 flex-1">
                  <a
                    href={link.short}
                    className="text-blue-500 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.short}
                  </a>
                  <span className="text-gray-500 text-xs">{link.original}</span>
                </div>
                <span className="text-xs text-gray-500">
                  {link.accessCount} acessos
                </span>
                <div className="flex items-center gap-1">
                  <Button variant="icon">
                    <CopyIcon />
                  </Button>
                  <Button variant="icon">
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

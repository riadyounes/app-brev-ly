import { z } from 'zod'
import { Button } from './ui/button'
import Input from './ui/input'
import InputWithPrefix from './ui/input-with-prefix'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { createLink } from '@/api/create-link'
import { queryClient } from '@/lib/react-query'
import { toast } from 'sonner'

const createLinkFormSchema = z.object({
  originalUrl: z.string().url('Insira um link válido'),
  shortUrl: z
    .string({
      required_error: 'Insira um link encurtado',
    })
    .min(1, 'Insira um link encurtado')
    .regex(/^[a-zA-Z0-9-]+$/, 'Só é permitido letras, números ou hífen'),
})

type CreateLinkFormData = z.infer<typeof createLinkFormSchema>

export function LinkForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateLinkFormData>({
    resolver: zodResolver(createLinkFormSchema),
  })

  const { mutateAsync: createLinkFn } = useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
      toast.success('Link criado com sucesso!')
      reset()
    },
  })

  async function handleCreateLink({
    originalUrl,
    shortUrl,
  }: CreateLinkFormData) {
    try {
      await createLinkFn({ originalUrl, shortUrl })
    } catch {
      toast.error('Erro ao criar link')
    }
  }

  return (
    <div className="md:max-w-[380px] bg-gray-100 p-6 rounded-lg w-full flex flex-col gap-6">
      <h2 className="text-xl font-semibold mb-4">Novo link</h2>
      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(handleCreateLink)}
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Link original"
            placeholder="www.exemplo.com.br"
            {...register('originalUrl')}
            error={!!errors.originalUrl}
            errorMessage={errors.originalUrl?.message}
          />
          <InputWithPrefix
            label="Link encurtado"
            prefix="brev.ly/"
            {...register('shortUrl')}
            error={!!errors.shortUrl}
            errorMessage={errors.shortUrl?.message}
          />
        </div>
        <Button className="w-full" type="submit">
          Salvar link
        </Button>
      </form>
    </div>
  )
}

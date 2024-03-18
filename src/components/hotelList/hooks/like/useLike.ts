import { useAlertContext } from '@/contexts/AlertContext'
import useUser from '@/hooks/auth/useUser'
import { Hotel } from '@/models/hotel'
import getLikes, { toggleLike } from '@/remote/like'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'

export default function useLike() {
  const user = useUser()
  const { open } = useAlertContext()
  const navigate = useNavigate()
  const client = useQueryClient()
  const { data } = useQuery(
    ['likes'],
    () => getLikes({ userId: user?.uid as string }),
    {
      enabled: user != null,
    },
  )
  const { mutate } = useMutation(
    ({ hotel }: { hotel: Pick<Hotel, 'name' | 'id' | 'mainImageUrl'> }) => {
      if (user == null) {
        throw new Error('로그인이 필요합니다.')
      }
      return toggleLike({ hotel, userId: user.uid })
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['likes'])
      },
      onError: (error: Error) => {
        if (error.message === '로그인이 필요합니다.') {
          open({
            title: '로그인이 필요합니다.',
            onButtonClick: () => {
              navigate('/signin')
            },
          })
          return
        }
        open({
          title: '알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
          onButtonClick: () => {},
        })
      },
    },
  )

  return { data, mutate }
}

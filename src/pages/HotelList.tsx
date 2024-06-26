import useLike from '@/components/hotelList/hooks/like/useLike'
import useHotels from '@/components/hotelList/hooks/useHotels'
import HotelItem from '@/components/hotelList/HotelItem'
import withSuspense from '@/components/shared/hocs/withSuspense'
import Spacing from '@/components/shared/Spacing'
import Top from '@/components/shared/Top'
import { Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

function HotelList() {
  const { data: hotels, hasNextPage, loadMore } = useHotels()
  const { data: likes, mutate: like } = useLike()

  return (
    <div>
      <Top title="인기 호텔" subTitle="호텔부터 펜션까지 최저가" />
      <InfiniteScroll
        dataLength={hotels?.length ?? 0}
        hasMore={hasNextPage}
        loader={<></>}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {hotels.map((hotel, idx) => (
            <Fragment key={hotel.id}>
              <HotelItem
                hotel={hotel}
                isLike={Boolean(
                  likes?.find((like) => like.hotelId === hotel.id),
                )}
                onLike={like}
              />
              {hotels.length - 1 === idx ? null : (
                <Spacing
                  size={8}
                  backgroundColor="gray100"
                  style={{
                    margin: '20px 0',
                  }}
                />
              )}
            </Fragment>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export default withSuspense(HotelList, {
  fallback: <div>호텔 리스트 불러오는 중...</div>,
})

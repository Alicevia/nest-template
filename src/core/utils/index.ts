import * as dayjs from 'dayjs'
export const nowDate = (time?:Date)=>{
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

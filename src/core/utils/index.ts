import  dayjs from 'dayjs'

export const nowDate = (time?:Date)=>{
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

export const filterKey = (target:any,source:any)=>{
  for (const key in target) {
    target[key]=source[key]
  }
  return target
}

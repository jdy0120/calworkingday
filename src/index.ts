import {ApiInfo, HolidayData} from './types/type'
import fetch, { Response } from 'node-fetch';
import * as mysql from 'mysql2'
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

const connection = mysql.createConnection({
  host: '35.223.127.108',
  user: 'root',
  password: '1111',
  database: 'test',
});

const connectDB = (element:HolidayData) : void => {
  const sql:string = `INSERT INTO holiday (dateName,locdate) SELECT '${element.dateName}','${element.locdate}' from dual WHERE NOT EXISTS ( SELECT * FROM holiday WHERE dateName = '${element.dateName}' AND locdate='${element.locdate}' )`;
  console.log(sql)
  connection.execute(sql)
}

const apiInfo:ApiInfo = {
  url:'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo',
  servicekey:'Do%2BqAYkzRDsfuWpJN8MRsmQIXjK06hUAMvVReJqqT1MvyKvc%2Ft9eFJU19fHpZZ9j88%2BVYi9AgtBVgibkdVwhXA%3D%3D'
}

const getItems = async (year:number,month:number) : Promise<void> => {
  const nowMonth:number = month-1
  while(nowMonth !== month) {
    const postResponse:Response = await fetch(`${apiInfo.url}?serviceKey=${apiInfo.servicekey}&solYear=${year}&solMonth=${month< 10 ? '0'+month : month}&_type=json`)
    const post:any = await postResponse.json()
    const data:HolidayData = await post.response.body.items.item
    if (data && Array.isArray(data)) data.forEach((element:HolidayData) => connectDB(element))
    else if (data !== undefined) connectDB(data)

    month++
    if (month > 12) {
      year += 1
      month %= 12
    }
  }
}

getItems(2017,3)
import {port_table} from 'common/port_uri'
import ajax from 'common/ajax'

export function get(params){
  let o = {
    method:'get',
    responsetype:'text'
  }
  return ajax(Object.assign(o,params))
}

export function post(params){
  return ajax({
    baseurl: port_table.base,
    method: 'post',
    data:params
  })
}

/**
 * Created by zhaowei on 2017/10/23.
 */
export default function (error: any): Promise<any> {
  debugger
  console.error('发生错误', error);
  return Promise.reject(error.message || error);
}

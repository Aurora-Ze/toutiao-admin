/**
 * 素材管理
 */
import request from '@/utils/request'

/**
 * 上传图片
 */
export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // Headers 参数使用 headers 设置
    data
  })
}
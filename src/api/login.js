import request from '@/router/axios'
const scope = 'server'


export function validRegisterUserName (name) {
  return request({
    url: `/admin/user/repeatUsername/${name}`,
    method: 'get',
  })
}
export function validRegisterUserPhone (phone) {
  return request({
    url: `/admin/user/repeatPhone/${phone}`,
    method: 'get',
  })
}

export const registerUser = (userObject) => {
  return request({
    url: '/admin/user/register',
    method: 'post',
    data: {
      ...userObject,
    },
  })
}

export const loginByUsername = (username, password, code, randomStr) => {
  const grant_type = 'password'

  return request({
    url: '/auth/oauth/token',
    headers: {
      isToken: false,
      TENANT_ID: '1',
      Authorization: 'Basic Z2RzOmdkcw==',
    },
    method: 'post',
    params: { username, password, randomStr, code, grant_type, scope },
  })
}

export const refreshToken = refresh_token => {
  const grant_type = 'refresh_token'
  return request({
    url: '/auth/oauth/token',
    headers: {
      isToken: false,
      TENANT_ID: '1',
      Authorization: 'Basic Z2RzOmdkcw==',
    },
    method: 'post',
    params: { refresh_token, grant_type, scope },
  })
}

export const loginByMobile = (mobile, code) => {
  const grant_type = 'mobile'
  return request({
    url: '/auth/mobile/token/sms',
    headers: {
      TENANT_ID: '1',
      Authorization: 'Basic Z2RzOmdkcw==',
    },
    method: 'post',
    params: { mobile: 'SMS@' + mobile, code: code, grant_type },
  })
}

export const loginBySocial = (state, code) => {
  const grant_type = 'mobile'
  return request({
    url: '/auth/mobile/token/social',
    headers: {
      TENANT_ID: '1',
      Authorization: 'Basic Z2RzOmdkcw==',
    },
    method: 'post',
    params: { mobile: state + '@' + code, grant_type },
  })
}

export const getUserInfo = () => {
  return request({
    url: '/admin/user/info',
    method: 'get',
  })
}

export const logout = () => {
  return request({
    url: '/auth/token/logout',
    method: 'delete',
  })
}

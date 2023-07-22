import { objectToQueryUrl } from './general';
import { getCookie, removeCookie } from 'typescript-cookie';
const API_URL = process.env.NEXT_PUBLIC_BFF_URL;





// for 422 default response BFF adonisJS
export const onInvalidRequestAdonis = (errors: any) => {
  const invalids: Record<string, any> = {}

  for (const error of errors) {
    const { field, message } = error
    invalids[field] = [...(invalids?.[field] ?? []), message]
  }

  return invalids
}




export const onLogout = ({ redirectTo } = { redirectTo: '/' }) => {
  removeCookie("userToken");
  removeCookie("userAuthed");
  window.location.href = (redirectTo);
};



interface typeApiFetch {
  url: string,
  objParams?: Record<string, string>,
  body?: FormData | Record<string, any> | string,
  method?: string,
  headers?: Record<string, string>
}

export const api = async ({ url, objParams, body, method, headers = {} }: typeApiFetch) => {
  // get user token
  try {
    const userToken = getCookie("userToken")
    headers['Authorization'] = `Bearer ${userToken}`
  } catch (error) { }

  // set content type
  if (body && !(body instanceof FormData)) {
    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';
    if (typeof (body) == "object") {
      body = JSON.stringify(body);
    }
  }

  // exec
  const newUrl = url + (url.includes('?') ? '&' : '?') + (objParams ? objectToQueryUrl(objParams) : '')
  const response = fetch((API_URL + newUrl), {
    method: (method ?? 'get'),
    body,
    headers
  });

  // check unauthed
  response.then((res) => {
    if (res.status == 401) {
      onLogout()
    }
  })

  // return
  return response;
}
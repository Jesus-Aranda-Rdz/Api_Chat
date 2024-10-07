import { ResponseContract } from "@ioc:Adonis/Core/Response";

export function badRequest(
  response: ResponseContract,
  msg?: string,
  data?: any
) {
  return response.badRequest({
    status: false,
    msg: msg ?? "Error del servidor",
    data: data ?? null,
  });
}

export function ok(response: ResponseContract, msg?: string, data?: any) {
  return response.ok({
    status: true,
    msg: msg ?? "Operación exitosa",
    data: data ?? null,
  });
}

export function notFound(response: ResponseContract, msg?: string, data?: any) {
  return response.notFound({
    status: false,
    msg: msg ?? "Recurso no encontrado",
    data: data ?? null,
  });
}

export function unauthorized(
  response: ResponseContract,
  msg?: string,
  data?: any
) {
  return response.unauthorized({
    status: false,
    msg: msg ?? "No autorizado",
    data: data ?? null,
  });
}

export function forbidden(
  response: ResponseContract,
  msg?: string,
  data?: any
) {
  return response.forbidden({
    status: false,
    msg: msg ?? "Prohibido",
    data: data ?? null,
  });
}

export function internalServerError(
  response: ResponseContract,
  msg?: string,
  data?: any
) {
  return response.internalServerError({
    status: false,
    msg: msg ?? "Error del servidor",
    data: data ?? null,
  });
}

export function created(response: ResponseContract, msg?: string, data?: any) {
  return response.created({
    status: true,
    msg: msg ?? "Recurso creado",
    data: data ?? null,
  });
}

export function conflict(response: ResponseContract, msg?: string, data?: any) {
  return response.conflict({
    status: false,
    msg: msg ?? "Conflicto",
    data: data ?? null,
  });
}

export function accepted(response: ResponseContract, msg?: string, data?: any) {
  return response.accepted({
    status: true,
    msg: msg ?? "Aceptado",
    data: data ?? null,
  });
}
export function notAcceptable(
  response: ResponseContract,
  msg?: string,
  data?: any
) {
  return response.notAcceptable({
    status: false,
    msg: msg ?? "No aceptable",
    data: data ?? null,
  });
}

export function UnprocessableEntity(
  response: ResponseContract,
  msg?: string,
  data?: any
) {
  return response.unprocessableEntity({
    status: false,
    msg: msg ?? "Entidad no procesable",
    data: data ?? null,
  });
}

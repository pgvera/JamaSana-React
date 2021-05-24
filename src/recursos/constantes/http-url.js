// servidor
export const url_server = "http://127.0.0.1:8000/";

// static - para cargar las imagenes que estan en el servidor
export const url_static = url_server + "static";

// usuarios
export const url_usuarios = "usuarios/";

// productos
export const url_productos = "productos/";

//login
export const url_login = url_server + url_usuarios + "login_admin";

// categorias
export const url_categorias = url_server + url_productos + "allcategorias";
export const url_categoria = url_server + url_productos + "categoria/";

//vendedores
export const url_vendedores = url_server + url_usuarios + "allvendedor";
export const url_vendedor = url_server + url_usuarios + "vendedor/";
export const url_registrar_vendedor =
  url_server + url_usuarios + "registrar_vendedor";
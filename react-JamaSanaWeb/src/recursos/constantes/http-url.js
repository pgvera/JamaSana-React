// servidor
global.url_server = "http://127.0.0.1:8000/";

// static - para cargar las imagenes que estan en el servidor
global.url_static = global.url_server + "static";

// usuarios
global.url_usuarios = "usuarios/";

// productos
global.url_productos = "productos/";

//login
global.url_login = global.url_server + global.url_usuarios + "login_admin";

// categorias
global.url_categorias =
  global.url_server + global.url_productos + "allcategorias";
global.url_categoria = global.url_server + global.url_productos + "categoria/";

//vendedores
global.url_vendedores = global.url_server + global.url_usuarios + "allvendedor";
global.url_vendedor = global.url_server + global.url_usuarios + "vendedor/";
global.url_registrar_vendedor =
  global.url_server + global.url_usuarios + "registrar_vendedor";

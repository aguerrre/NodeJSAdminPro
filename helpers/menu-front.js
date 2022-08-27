const getMenuFront = (urole = 'USER_ROLE') => {
  const menu = [
    {
      title: "Dashboard",
      icon: "mdi mdi-gauge",
      submenu: [
        { title: "Main", url: "/" },
        { title: "Gráficas", url: "charts" },
        { title: "Progress", url: "progress" },
        { title: "Promises", url: "promises" },
        { title: "RxJs", url: "rxjs" },
      ],
    },
    {
      title: "Mantenimiento",
      icon: "mdi mdi-folder-lock-open",
      submenu: [
        //{ title: "Usuarios", url: "usuarios" },
        { title: "Hospitales", url: "hospitales" },
        { title: "Médicos", url: "medicos" },
      ],
    },
    ];
    
    if (urole === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ title: "Usuarios", url: "usuarios" });
    }

    return menu;
};

module.exports = {
    getMenuFront,
}

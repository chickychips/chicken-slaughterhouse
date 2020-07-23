export default async function getMenuData() {
  return [
    {
      category: true,
      title: 'Dashboards',
    },
    {
      title: 'Dashboards',
      icon: 'fe fe-home',
      key: 'dashboard',
      url: '/dashboard/alpha',
      // roles: ['admin'], // set user roles with access to this route
    },
    {
      category: true,
      title: 'Admin',
    },
    {
      title: 'Data Master',
      key: 'masterData',
      icon: 'fe fe-database',
      children: [
        {
          title: 'Pemasok',
          key: 'masterDataSupplier',
          url: '/master-data/supplier',
        },
        {
          title: 'Pelanggan',
          key: 'masterDataCustomer',
          url: '/master-data/customer',
        },
        {
          title: 'Satuan Ukur',
          key: 'masterDataMeasureUnit',
          url: '/master-data/measurement-unit',
        },
        {
          title: 'Produk',
          key: 'masterDataItem',
          url: '/master-data/item',
        },
        {
          title: 'Daftar Biaya',
          key: 'masterDataProductionCostList',
          url: '/master-data/expense',
        },
        {
          title: 'Cabang',
          key: 'masterDataBranch',
          url: '/auth/503',
        },
      ],
    },
    {
      title: 'Administrasi',
      key: 'admin',
      icon: 'fe fe-lock',
      children: [
        {
          title: 'Hak Akses',
          key: 'adminRole',
          url: '/auth/503',
        },
        {
          title: 'Pengguna',
          key: 'adminUser',
          url: '/auth/503',
        },
      ],
    },
    {
      category: true,
      title: 'Menu',
    },
    {
      title: 'Produksi',
      key: 'production',
      icon: 'icmn-clipboard',
      children: [
        {
          title: 'Pengajuan',
          key: 'productionPurchase',
          url: '/production/purchase',
        },
        {
          title: 'Produksi Potong',
          key: 'productionCutting',
          url: '/production/cutting',
        },
        {
          title: 'Produksi Frozen',
          key: 'productionFrozen',
          url: '/production/freeze',
        },
        {
          title: 'Produksi Thawing',
          key: 'productionThawing',
          url: '/production/thawing',
        },
        {
          title: 'Input Biaya',
          key: 'productionCostInput',
          url: '/production/expense/input',
        },
        {
          title: 'Rekap Biaya',
          key: 'productionCostRecap',
          url: '/production/expense',
        },
      ],
    },
    {
      title: 'Penjualan',
      key: 'sales',
      icon: 'fe fe-shopping-cart',
      url: '/transaction',
    },
    {
      title: 'Gudang',
      key: 'warehouse',
      icon: 'fe fe-truck',
      children: [
        {
          title: 'Gudang Fresh',
          key: 'storageFreshChicken',
          url: '/storage/fresh',
        },
        {
          title: 'Gudang Frozen',
          key: 'storageFrozenChicken',
          url: '/storage/frozen',
        },
      ],
    },
    {
      title: 'Laporan',
      key: 'reporting',
      icon: 'lnr lnr-chart-bars',
      children: [
        {
          title: 'Laporan Produksi Karkas',
          key: 'carcassProductionReport',
          url: '/reporting/production',
        },
      ],
    },
  ]
}

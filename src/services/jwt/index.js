import apiClient from 'services/axios'
import store from 'store'

export async function login(username, password) {
  return apiClient
    .post('/auth/signin', {
      username,
      password,
    })
    .then(response => {
      if (response) {
        const { accessToken } = response.data
        if (accessToken) {
          store.set('accessToken', accessToken)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function register(email, password, name) {
  return apiClient
    .post('/auth/register', {
      email,
      password,
      name,
    })
    .then(response => {
      if (response) {
        const { accessToken } = response.data
        if (accessToken) {
          store.set('accessToken', accessToken)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function currentAccount() {
  return apiClient
    .get('/auth/account')
    .then(response => {
      if (response) {
        const { accessToken } = response.data
        if (accessToken) {
          store.set('accessToken', accessToken)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function logout() {
  store.remove('accessToken')
  return true
}

export async function getSupply() {
  return apiClient
    .get('/purchase-order/history')
    .then(response => {
      console.log(response.data)
      if (response) {
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function submitPurchaseOrder(
  productionId,
  supplierName,
  itemName,
  quantityWeight,
  quantityVolume,
  unitPrice,
  totalPrice,
  username,
) {
  return apiClient
    .post('/purchase-order/create', {
      productionId,
      supplierName,
      itemName,
      quantityWeight,
      quantityVolume,
      unitPrice,
      totalPrice,
      createdBy: username,
    })
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function generatePurchaseOrderId() {
  return apiClient
    .get('/purchase-order/generate-id')
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function getItemList() {
  return apiClient.get('/params/items').then(response => {
    if (response) {
      console.log(response.data)
      return response.data
    }
    return false
  })
}

export async function getSupplierList() {
  console.log('getsupplierlist')
  return apiClient.get('/params/suppliers').then(response => {
    if (response) {
      console.log(response.data)
      return response.data
    }
    return false
  })
}

export async function generateCuttingId() {
  return apiClient
    .get('/production/cutting/generate-id')
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function getCuttingData() {
  return apiClient.get('/production/cutting/get-data').then(response => {
    if (response) {
      console.log(response.data)
      return response.data
    }
    return false
  })
}

export async function processCutting(
  cuttingId,
  itemInput,
  itemOutput,
  inputQuantityWeight,
  inputQuantityVolume,
  referenceId,
  username,
) {
  return apiClient
    .post('/production/cutting/process', {
      cuttingId,
      itemInput,
      inputQuantityWeight,
      inputQuantityVolume,
      itemOutput,
      referenceId,
      createdBy: username,
    })
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
}

export async function getSuppliers() {
  return apiClient.get('/master-data/get-suppliers').then(response => {
    if (response) {
      console.log(response.data)
      return response.data
    }
    return false
  })
}

export async function getCustomers() {
  return apiClient.get('/master-data/get-customers').then(response => {
    if (response) {
      console.log(response.data)
      return response.data
    }
    return false
  })
}

export async function getMeasurementUnits() {
  return apiClient.get('/master-data/get-measurement-units').then(response => {
    if (response) {
      console.log(response.data)
      return response.data
    }
    return false
  })
}

export async function getItems() {
  return apiClient.get('/master-data/get-items').then(response => {
    if (response) {
      console.log(response.data)
      return response.data
    }
    return false
  })
}

export async function getExpenses() {
  return apiClient.get('/master-data/get-expenses').then(response => {
    if (response) {
      console.log(response.data)
      return response.data
    }
    return false
  })
}

export async function addSupplier(name, address, description, username) {
  return apiClient
    .post('/master-data/add-supplier', {
      name,
      address,
      description,
      createdBy: username,
    })
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
}

export async function addCustomer(name, address, description, username) {
  return apiClient
    .post('/master-data/add-customer', {
      name,
      address,
      description,
      createdBy: username,
    })
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
}

export async function addMeasurementUnit(name, description, username) {
  return apiClient
    .post('/master-data/add-measurement-unit', {
      name,
      description,
      createdBy: username,
    })
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
}

export async function addItem(name, description, itemType, itemOutputType, username) {
  return apiClient
    .post('/master-data/add-Item', {
      name,
      description,
      itemType,
      itemOutputType,
      createdBy: username,
    })
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
}

export async function addExpense(name, measurementUnitId, description, username) {
  return apiClient
    .post('/master-data/add-expense', {
      name,
      measurementUnitId,
      description,
      createdBy: username,
    })
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
}

// Storage
export async function getFreshItemStock() {
  return apiClient.get('/storage/get-fresh-items').then(response => {
    if (response) {
      console.log(response.data)
      return response.data
    }
    return false
  })
}

export async function getFrozenItemStock() {
  return apiClient.get('/storage/get-frozen-items').then(response => {
    if (response) {
      console.log(response.data)
      return response.data
    }
    return false
  })
}

export async function generateDeliveryId(storageSource) {
  return apiClient
    .post('/storage/generate-id', {
      storageSource,
    })
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function getPendingTransaction(storageSource) {
  return apiClient
    .post('/storage/get-pending-transaction', {
      storageSource,
    })
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function deliverItem(id, transactionId, storageSource, items, createdBy) {
  return apiClient
    .post('/storage/deliver-item', {
      id,
      transactionId,
      storageSource,
      items,
      createdBy,
    })
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function generateConversionId() {
  return apiClient
    .get('/storage/conversion/generate-id')
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function processItemConversion(conversionId, storageSource, items, createdBy) {
  return apiClient
    .post('/storage/conversion/process', {
      conversionId,
      storageSource,
      items,
      createdBy,
    })
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

// Transaction
export async function generateSalesOrderId() {
  return apiClient.get('/transaction/generate-id').then(response => {
    if (response) {
      console.log(response.data)
      return response.data
    }
    return false
  })
}

export async function getTransactionData() {
  return apiClient.get('/transaction/get-transaction-data').then(response => {
    if (response) {
      console.log(response.data)
      return response.data
    }
    return false
  })
}

export async function getTransactionHistory(createdBy) {
  return apiClient
    .post('/transaction/get-transaction-history', {
      createdBy,
    })
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
}

export async function getTransactionDetail(id) {
  return apiClient
    .post('/transaction/get-transaction-detail', {
      id,
    })
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
}

export async function addTransaction(
  id,
  customer,
  totalQuantityWeight,
  totalQuantityVolume,
  totalDiscount,
  totalPrice,
  items,
  username,
) {
  return apiClient
    .post('/transaction/add-transaction', {
      id,
      customer,
      totalQuantityWeight,
      totalQuantityVolume,
      totalDiscount,
      totalPrice,
      items,
      createdBy: username,
    })
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
}

// Production/Thawing
export async function generateThawingId() {
  return apiClient
    .get('/production/thawing/generate-id')
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function getThawingData() {
  return apiClient.get('/production/thawing/get-data').then(response => {
    if (response) {
      console.log(response.data)
      return response.data
    }
    return false
  })
}

export async function processThawing(thawingId, referenceId, items, username) {
  return apiClient
    .post('/production/thawing/process', {
      thawingId,
      referenceId,
      items,
      createdBy: username,
    })
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
}

// Production/Freeze
export async function generateFreezeId() {
  return apiClient
    .get('/production/freeze/generate-id')
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function getFreezeData() {
  return apiClient.get('/production/freeze/get-data').then(response => {
    if (response) {
      console.log(response.data)
      return response.data
    }
    return false
  })
}

export async function processFreeze(freezeId, items, username) {
  return apiClient
    .post('/production/freeze/process', {
      freezeId,
      items,
      createdBy: username,
    })
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
}

// Production/Expense
export async function generateExpenseId() {
  return apiClient
    .get('/production/expense/generate-id')
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function getExpenseData() {
  return apiClient.get('/production/expense/get-data').then(response => {
    if (response) {
      console.log(response.data)
      return response.data
    }
    return false
  })
}

export async function addExpenseData(
  expenseId,
  expenseCutting,
  expenseFreeze,
  expenseThawing,
  username,
) {
  return apiClient
    .post('/production/expense/add', {
      expenseId,
      expenseCutting,
      expenseFreeze,
      expenseThawing,
      createdBy: username,
    })
    .then(response => {
      if (response) {
        console.log(response.data)
        return response.data
      }
      return false
    })
}

// Dashboard
export async function getDashboardData() {
  return apiClient.get('/dashboard/get-data').then(response => {
    if (response) {
      console.log(response.data)
      return response.data
    }
    return false
  })
}

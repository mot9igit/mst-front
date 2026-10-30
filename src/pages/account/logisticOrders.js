export const MS_LOGISTIC_DELIVERY_TYPE = 3

function isEnabledAction(action) {
  return action?.enabled === 1 || action?.enabled === true || action?.enabled === '1'
}

export function isMsLogisticAction(action) {
  return isEnabledAction(action) && Number(action?.delivery_type_opt) === MS_LOGISTIC_DELIVERY_TYPE
}

function warehouseName(warehouse) {
  const data = warehouse?.warehouse_data || {}
  return data.selfname || data.name_short || data.name || ''
}

function warehouseAddress(warehouse) {
  const data = warehouse?.warehouse_data || {}
  return data.address_short || data.address || ''
}

export function collectMsLogisticOrders(basketStore) {
  const orders = []
  const orgs = basketStore?.data || {}

  Object.entries(orgs).forEach(([orgId, org]) => {
    const warehouses = org?.data || {}
    Object.entries(warehouses).forEach(([warehouseId, warehouse]) => {
      const products = (warehouse?.data || []).filter((product) =>
        (product?.action || []).some(isMsLogisticAction),
      )
      if (!products.length) return

      orders.push({
        org_id: orgId,
        org_name: org?.org_data?.name || '',
        warehouse_id: warehouseId,
        warehouse_name: warehouseName(warehouse),
        warehouse_address: warehouseAddress(warehouse),
        products,
      })
    })
  })

  return orders
}

export function logisticOrderMatches(order, orgId, warehouseId) {
  const isAll = orgId === 'all' || orgId === undefined || orgId === null || orgId === ''
  if (isAll) return true

  if (String(order.org_id) !== String(orgId)) return false

  const isAnyWarehouse =
    warehouseId === 0 || warehouseId === undefined || warehouseId === null || warehouseId === ''
  if (isAnyWarehouse) return true

  return String(order.warehouse_id) === String(warehouseId)
}

export function filterLogisticOrders(orders, orgId, warehouseId) {
  return (orders || []).filter((order) => logisticOrderMatches(order, orgId, warehouseId))
}

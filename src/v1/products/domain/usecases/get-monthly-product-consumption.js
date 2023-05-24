import { DistributorGateway } from '../protocols/gateways/distributor.gateway'
import { ProductRepository } from '../protocols/repositores/product.repository'

export class GetMonthlyProductConsumption {
  constructor({
    productRepository = new ProductRepository(),
    distributorGateway = new DistributorGateway(),
  }) {
    this.productRepository = productRepository
    this.distributorGateway = distributorGateway
  }

  async execute({ date, productId, distributorId }) {
    const price = await this.distributorGateway.getDistributorPrice(
      distributorId,
      date
    )

    const daysOfMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate()
    const monthlyConsumption =
      await this.productRepository.getMonthConsumptions(date, productId)

    return Array.from({ length: daysOfMonth }, (_, i) => {
      const day = i + 1
      const consumption = monthlyConsumption.find(
        ({ dayOfMonth }) => dayOfMonth === day
      )

      const consumptionInKw = consumption?.kw || 0
      const consumptionInMoney = consumptionInKw * price

      return {
        consumptionInKw,
        consumptionInMoney,
      }
    })
  }
}

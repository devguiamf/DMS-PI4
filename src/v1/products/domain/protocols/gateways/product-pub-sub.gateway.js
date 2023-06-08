import { NotImplementedError } from '../../../../shared/errors/not-implemented-error'
import { Consumption } from '../../entities/consumption.entity'

export class ProductPubSubGateway {
  /**
   *
   * @param {string | number } productId
   * @param {Consumption} consumption
   */
  async publishConsumption(productId, consumption) {
    throw new NotImplementedError(
      this.constructor.name,
      this.publishConsumption.name
    )
  }
}

import { HttpClient } from "./core/http-client.js";
import { ChargeService } from "./services/charges.js";
import { LabelService } from "./services/labels.js";
import { PickupService } from "./services/pickups.js";
import { ServiceabilityService } from "./services/serviceability.js";
import { ShipmentService } from "./services/shipments.js";
import { TrackingService } from "./services/tracking.js";
import { WaybillService } from "./services/waybills.js";
import type { DelhiveryClientOptions, DelhiveryRequestOptions } from "./types.js";

/**
 * Public SDK client. API-specific service modules can be composed here as
 * their endpoints and schemas are verified against the account's portal docs.
 */
export class DelhiveryClient {
  private readonly http: HttpClient;
  readonly serviceability: ServiceabilityService;
  readonly waybills: WaybillService;
  readonly shipments: ShipmentService;
  readonly tracking: TrackingService;
  readonly pickups: PickupService;
  readonly labels: LabelService;
  readonly charges: ChargeService;

  constructor(options: DelhiveryClientOptions) {
    this.http = new HttpClient(options);
    const request = <T>(path: string, requestOptions?: DelhiveryRequestOptions) =>
      this.request<T>(path, requestOptions);
    this.serviceability = new ServiceabilityService(request);
    this.waybills = new WaybillService(request);
    this.shipments = new ShipmentService(request);
    this.tracking = new TrackingService(request, options.token);
    this.pickups = new PickupService(request);
    this.labels = new LabelService(request);
    this.charges = new ChargeService(request);
  }

  request<T>(path: string, options: DelhiveryRequestOptions = {}): Promise<T> {
    return this.http.request<T>(path, options);
  }
}

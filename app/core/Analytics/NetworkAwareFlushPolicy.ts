import NetInfo, { NetInfoState, NetInfoStateType } from '@react-native-community/netinfo';
import type { SegmentEvent, FlushPolicy } from '@segment/analytics-react-native';
import { Observable } from '@segment/analytics-react-native';
import Logger from '../../util/Logger';

interface NetworkAwareFlushConfig {
  wifi: { interval: number; count: number };
  cellular: { interval: number; count: number };
  default: { interval: number; count: number };
}

export class NetworkAwareFlushPolicy implements FlushPolicy {
  shouldFlush = new Observable<boolean>(false);
  private count = 0;
  private flushTimer: ReturnType<typeof setTimeout> | null = null;
  private config: NetworkAwareFlushConfig;
  private currentInterval: number;
  private currentCount: number;
  private networkUnsubscribe?: () => void;

  constructor(config?: Partial<NetworkAwareFlushConfig>) {
    this.config = {
      wifi: { interval: 15000, count: 10 },
      cellular: { interval: 60000, count: 30 },
      default: { interval: 30000, count: 20 },
      ...config,
    };

    this.currentInterval = this.config.default.interval;
    this.currentCount = this.config.default.count;
  }

  start(): void {
    this.count = 0;
    this.startTimer();
    this.setupNetworkListener();
  }

  private setupNetworkListener(): void {
    this.networkUnsubscribe = NetInfo.addEventListener(this.handleNetworkChange);

    NetInfo.fetch().then(this.handleNetworkChange).catch((error) => {
      Logger.error(error, 'NetworkAwareFlushPolicy: Error fetching initial network state');
    });
  }

  private handleNetworkChange = (state: NetInfoState): void => {
    const previousInterval = this.currentInterval;
    const previousCount = this.currentCount;

    switch (state.type) {
      case NetInfoStateType.wifi:
        this.currentInterval = this.config.wifi.interval;
        this.currentCount = this.config.wifi.count;
        break;
      case NetInfoStateType.cellular:
        this.currentInterval = this.config.cellular.interval;
        this.currentCount = this.config.cellular.count;
        break;
      default:
        this.currentInterval = this.config.default.interval;
        this.currentCount = this.config.default.count;
        break;
    }

    if (previousInterval !== this.currentInterval || previousCount !== this.currentCount) {
      if (__DEV__) {
        Logger.log(
          `NetworkAwareFlushPolicy: Network changed to ${state.type}, ` +
          `adjusting flush policy to ${this.currentInterval}ms / ${this.currentCount} events`
        );
      }
      this.startTimer();
    }
  };

  private startTimer(): void {
    if (this.flushTimer) {
      clearTimeout(this.flushTimer);
    }
    this.flushTimer = setTimeout(() => {
      this.shouldFlush.value = true;
    }, this.currentInterval);
  }

  onEvent(_event: SegmentEvent): void {
    this.count += 1;
    if (this.count >= this.currentCount) {
      this.shouldFlush.value = true;
    }
    this.startTimer();
  }

  reset(): void {
    this.shouldFlush.value = false;
    this.count = 0;
    this.startTimer();
  }

  end(): void {
    if (this.flushTimer) {
      clearTimeout(this.flushTimer);
      this.flushTimer = null;
    }
    if (this.networkUnsubscribe) {
      this.networkUnsubscribe();
      this.networkUnsubscribe = undefined;
    }
  }
}

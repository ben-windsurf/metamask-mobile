import {
  INotification,
  TRIGGER_TYPES,
} from '@metamask/notification-services-controller/notification-services';

/**
 * TODO - remove this once we upgrade TS.
 * There is a typescript compiler bug where Extract does not fully compute unions, which is fixed in a later version
 * GH Issue: https://github.com/MetaMask/metamask-mobile/issues/10364
 *
 * Custom extract utility type that works around TypeScript compiler limitations.
 * @template T - The source union type to extract from
 * @template U - The condition type to match against
 */
type CustomExtract<T, U> = T extends T
  ? U extends Partial<T>
    ? T
    : never
  : never;

/**
 * Extracts notification types based on the provided node type.
 * This utility type ensures type safety when working with specific notification types.
 * @template NodeType - The specific trigger type to extract notifications for
 */
export type ExtractedNotification<NodeType extends TRIGGER_TYPES> =
  NodeType extends NodeType
    ? CustomExtract<INotification, { type: NodeType }>
    : never;

/**
 * Creates a type guard function for filtering notifications by specific types.
 * This higher-order function returns a type guard that can safely narrow notification types.
 *
 * @template NodeType - The notification type to guard against
 * @param types - Array of notification types to check against
 * @returns A type guard function that checks if a notification matches the specified types
 *
 * @example
 * const isFeatureAnnouncementGuard = isOfTypeNodeGuard(['feature_announcement']);
 * const notifications = getAllNotifications();
 * const featureAnnouncements = notifications.filter(isFeatureAnnouncementGuard);
 */
export const isOfTypeNodeGuard =
  <NodeType extends INotification['type']>(types: NodeType[]) =>
  (n: INotification): n is ExtractedNotification<NodeType> =>
    n?.type && types.includes(n.type as NodeType);
